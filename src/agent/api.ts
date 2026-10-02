import {
    heroBadges,
    profile,
    projects,
    site,
    socials,
    stack,
    timeline,
} from "@/data";

import { portfolioBio } from "./markdown";

export function portfolioPayload() {
    return {
        name: site.name,
        url: site.url,
        handle: site.handle,
        email: site.email,
        tagline: profile.tagline,
        bio: portfolioBio(),
        badges: heroBadges.map((badge) => badge.text),
        socials: socials.map(({ label, href }) => ({ label, href })),
        projects: projects.map((project) => ({
            name: project.name,
            tag: project.tag,
            description: project.description,
            href: project.href,
            stack: [...project.stack],
        })),
        stack: stack.map((item) => item.name),
        timeline: timeline.map((item) => ({
            when: item.when,
            title: item.title,
            place: item.place,
            detail: item.detail,
        })),
    };
}

export function healthPayload() {
    return { status: "ok" as const };
}

const problemSchema = {
    type: "object",
    required: ["title", "status", "detail", "code", "resolution"],
    properties: {
        type: { type: "string", description: "RFC 9457 problem type URI." },
        title: { type: "string" },
        status: { type: "integer" },
        detail: { type: "string" },
        code: {
            type: "string",
            description: "Stable machine-readable error code.",
        },
        resolution: {
            type: "string",
            description: "What the caller should do next.",
        },
    },
} as const;

const errorResponses = {
    "404": {
        description: "The path is not a portfolio API route.",
        content: {
            "application/problem+json": { schema: problemSchema },
        },
    },
    "405": {
        description: "The method is not GET or HEAD.",
        content: {
            "application/problem+json": { schema: problemSchema },
        },
    },
} as const;

export function openApiDocument() {
    return {
        openapi: "3.1.0",
        info: {
            title: `${site.name} Portfolio API`,
            version: "1.0.0",
            description:
                "Read-only public portfolio data for Debesh Ghorui: profile, projects, stack, timeline, and contact. No API key. No request body.",
        },
        servers: [{ url: site.url }],
        paths: {
            "/api/portfolio.json": {
                get: {
                    summary: "Portfolio data",
                    description:
                        "Returns the public profile, projects, stack, timeline, and contact details shown on the homepage.",
                    operationId: "getPortfolio",
                    responses: {
                        "200": {
                            description:
                                "Profile, projects, stack, timeline, and contact details.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        required: [
                                            "name",
                                            "url",
                                            "email",
                                            "bio",
                                            "projects",
                                            "stack",
                                        ],
                                        properties: {
                                            name: { type: "string" },
                                            url: {
                                                type: "string",
                                                format: "uri",
                                            },
                                            handle: { type: "string" },
                                            email: {
                                                type: "string",
                                                format: "email",
                                            },
                                            tagline: { type: "string" },
                                            bio: { type: "string" },
                                            badges: {
                                                type: "array",
                                                items: { type: "string" },
                                            },
                                            socials: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    required: ["label", "href"],
                                                    properties: {
                                                        label: {
                                                            type: "string",
                                                        },
                                                        href: {
                                                            type: "string",
                                                        },
                                                    },
                                                },
                                            },
                                            projects: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    required: [
                                                        "name",
                                                        "description",
                                                        "href",
                                                        "stack",
                                                    ],
                                                    properties: {
                                                        name: {
                                                            type: "string",
                                                        },
                                                        tag: { type: "string" },
                                                        description: {
                                                            type: "string",
                                                        },
                                                        href: {
                                                            type: "string",
                                                        },
                                                        stack: {
                                                            type: "array",
                                                            items: {
                                                                type: "string",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            stack: {
                                                type: "array",
                                                items: { type: "string" },
                                            },
                                            timeline: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    required: [
                                                        "when",
                                                        "title",
                                                        "place",
                                                        "detail",
                                                    ],
                                                    properties: {
                                                        when: {
                                                            type: "string",
                                                        },
                                                        title: {
                                                            type: "string",
                                                        },
                                                        place: {
                                                            type: "string",
                                                        },
                                                        detail: {
                                                            type: "string",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        ...errorResponses,
                    },
                },
            },
            "/api/health": {
                get: {
                    summary: "Health check",
                    description:
                        "Returns whether the read-only portfolio API is responding.",
                    operationId: "getHealth",
                    responses: {
                        "200": {
                            description: "The API is up.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            status: {
                                                type: "string",
                                                const: "ok",
                                            },
                                        },
                                        required: ["status"],
                                    },
                                },
                            },
                        },
                        ...errorResponses,
                    },
                },
            },
        },
    };
}
