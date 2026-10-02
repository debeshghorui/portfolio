import { aiCatalogDocument } from "./ard";
import { apiCatalogDocument } from "./api-catalog";
import { healthPayload, openApiDocument, portfolioPayload } from "./api";
import {
    agentJson,
    agentResponse,
    asHead,
    markdownTokens,
    optionsResponse,
    problemResponse,
} from "./http";
import { renderLlmsTxt } from "./llms";
import { renderHomeMarkdown } from "./markdown";
import { renderSkillMarkdown, skillName, skillsIndexDocument } from "./skills";

export const AGENT_LINKS = [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</openapi.json>; rel="service-desc"',
    '</llms.txt>; rel="service-doc"',
    '</.well-known/ai-catalog.json>; rel="ai-catalog"',
    '</index.md>; rel="alternate"; type="text/markdown"',
    '</.well-known/agent-skills/index.json>; rel="describedby"',
].join(", ");

const AGENT_PATHS = new Set([
    "/.well-known/api-catalog",
    "/.well-known/ai-catalog.json",
    "/.well-known/agent-skills/index.json",
    `/.well-known/agent-skills/${skillName}/SKILL.md`,
    "/llms.txt",
    "/llms-full.txt",
    "/index.md",
    "/api/portfolio.json",
    "/api/health",
    "/openapi.json",
]);

function normalizePath(pathname: string): string {
    if (pathname.length > 1 && pathname.endsWith("/")) {
        return pathname.slice(0, -1);
    }
    return pathname;
}

function wantsMarkdown(accept: string | null): boolean {
    if (!accept) return false;

    const ranges = accept.split(",").map((part) => {
        const [type = "", ...params] = part.trim().split(";");
        const qParam = params
            .map((param) => param.trim())
            .find((param) => param.startsWith("q="));
        const q = qParam ? Number(qParam.slice(2)) : 1;
        return {
            type: type.trim().toLowerCase(),
            q: Number.isFinite(q) ? q : 0,
        };
    });

    const markdown = ranges.find((range) => range.type === "text/markdown");
    if (!markdown || markdown.q <= 0) return false;

    const html = ranges.find(
        (range) => range.type === "text/html" || range.type === "*/*",
    );
    if (html && html.q > markdown.q) return false;

    return true;
}

function markdownResponse(markdown: string): Response {
    return agentResponse(markdown, "text/markdown; charset=utf-8", {
        "x-markdown-tokens": markdownTokens(markdown),
        Vary: "Accept",
    });
}

async function responseFor(path: string): Promise<Response | null> {
    switch (path) {
        case "/.well-known/api-catalog":
            return agentJson(apiCatalogDocument(), "application/linkset+json");
        case "/.well-known/ai-catalog.json":
            return agentJson(aiCatalogDocument());
        case "/.well-known/agent-skills/index.json":
            return agentJson(await skillsIndexDocument());
        case `/.well-known/agent-skills/${skillName}/SKILL.md`:
            return agentResponse(
                renderSkillMarkdown(),
                "text/markdown; charset=utf-8",
            );
        case "/llms.txt":
            return agentResponse(renderLlmsTxt(), "text/plain; charset=utf-8");
        case "/llms-full.txt":
        case "/index.md":
            return markdownResponse(renderHomeMarkdown());
        case "/api/portfolio.json":
            return agentJson(portfolioPayload());
        case "/api/health":
            return agentJson(healthPayload());
        case "/openapi.json":
            return agentJson(openApiDocument());
        default:
            return null;
    }
}

function isApiPath(path: string): boolean {
    return path === "/openapi.json" || path.startsWith("/api/");
}

function isWellKnownPath(path: string): boolean {
    return path === "/.well-known" || path.startsWith("/.well-known/");
}

function methodNotAllowed(path: string): Response {
    return problemResponse(
        405,
        "method_not_allowed",
        "Method not allowed",
        `${path} accepts GET and HEAD only.`,
        "Retry with GET. This portfolio API is read-only and has no request body.",
    );
}

function apiNotFound(path: string): Response {
    return problemResponse(
        404,
        "api_route_not_found",
        "API route not found",
        `${path} is not a portfolio API route.`,
        "Use GET /openapi.json or GET /.well-known/api-catalog to find /api/portfolio.json and /api/health.",
    );
}

function wellKnownNotFound(path: string): Response {
    return problemResponse(
        404,
        "well_known_not_found",
        "Discovery document not found",
        `${path} is not a discovery document on this site.`,
        "Use GET /.well-known/api-catalog, GET /.well-known/ai-catalog.json, or GET /.well-known/agent-skills/index.json.",
    );
}

export async function handleAgentRequest(
    request: Request,
): Promise<Response | null> {
    const url = new URL(request.url);
    const path = normalizePath(url.pathname);
    const method = request.method.toUpperCase();

    const wellKnown = isWellKnownPath(path);
    const knownAgentPath = AGENT_PATHS.has(path);

    if (
        (isApiPath(path) || (wellKnown && knownAgentPath)) &&
        method !== "GET" &&
        method !== "HEAD" &&
        method !== "OPTIONS"
    ) {
        return methodNotAllowed(path);
    }

    if (wellKnown && !knownAgentPath && method !== "GET" && method !== "HEAD") {
        return wellKnownNotFound(path);
    }

    if (method === "OPTIONS" && (knownAgentPath || path.startsWith("/api/"))) {
        if (!knownAgentPath) return apiNotFound(path);
        return optionsResponse();
    }

    if (method !== "GET" && method !== "HEAD") return null;

    if (path === "/" && wantsMarkdown(request.headers.get("accept"))) {
        return asHead(request, markdownResponse(renderHomeMarkdown()));
    }

    const response = await responseFor(path);
    if (!response) {
        if (path.startsWith("/api/")) return apiNotFound(path);
        if (wellKnown) return asHead(request, wellKnownNotFound(path));
        return null;
    }
    return asHead(request, response);
}

export function withHomepageAgentHeaders(
    request: Request,
    response: Response,
): Response {
    const url = new URL(request.url);
    if (normalizePath(url.pathname) !== "/") return response;

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) return response;

    const headers = new Headers(response.headers);
    const existingLink = headers.get("link");
    headers.set(
        "link",
        existingLink ? `${existingLink}, ${AGENT_LINKS}` : AGENT_LINKS,
    );

    const vary = headers.get("vary");
    const varyTokens =
        vary?.split(",").map((token) => token.trim().toLowerCase()) ?? [];
    if (!vary) headers.set("vary", "Accept");
    else if (!varyTokens.includes("accept"))
        headers.set("vary", `${vary}, Accept`);

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}
