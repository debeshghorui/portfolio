import { useEffect } from "react";

import { applyTheme } from "@/lib/theme";
import {
    heroBadges,
    profile,
    projects,
    sections,
    site,
    socials,
    stack,
    timeline,
} from "@/data";
import { portfolioBio } from "@/agent/markdown";

type ToolInput = Record<string, unknown>;

type WebMcpTool = {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    execute: (input: ToolInput) => Promise<unknown> | unknown;
};

type ModelContext = {
    registerTool: (
        tool: WebMcpTool,
        options?: { signal?: AbortSignal },
    ) => Promise<unknown>;
};

declare global {
    interface Document {
        modelContext?: ModelContext;
    }
    interface Navigator {
        modelContext?: ModelContext;
    }
}

const emptyInput = {
    type: "object",
    properties: {},
    additionalProperties: false,
};

const sectionIds = Object.values(sections).flatMap((section) =>
    "id" in section ? [section.id] : [],
);

const tools: WebMcpTool[] = [
    {
        name: "get_profile",
        description:
            "Get Debesh Ghorui's name, bio, location, and short badges.",
        inputSchema: emptyInput,
        execute: () => ({
            name: site.name,
            url: site.url,
            handle: site.handle,
            tagline: profile.tagline,
            bio: portfolioBio(),
            badges: heroBadges.map((badge) => badge.text),
        }),
    },
    {
        name: "list_projects",
        description:
            "List Debesh Ghorui's public projects, with links and stack.",
        inputSchema: emptyInput,
        execute: () =>
            projects.map((project) => ({
                name: project.name,
                tag: project.tag,
                description: project.description,
                href: project.href,
                stack: [...project.stack],
            })),
    },
    {
        name: "get_tech_stack",
        description: "List the tools and technologies Debesh uses most.",
        inputSchema: emptyInput,
        execute: () => stack.map((item) => item.name),
    },
    {
        name: "get_timeline",
        description: "Get what Debesh is currently studying and building.",
        inputSchema: emptyInput,
        execute: () =>
            timeline.map((item) => ({
                when: item.when,
                title: item.title,
                place: item.place,
                detail: item.detail,
            })),
    },
    {
        name: "get_contact_info",
        description: "Get public ways to contact Debesh Ghorui.",
        inputSchema: emptyInput,
        execute: () => ({
            email: site.email,
            links: socials.map(({ label, href }) => ({ label, href })),
        }),
    },
    {
        name: "navigate_to_section",
        description: "Scroll the portfolio page to a section.",
        inputSchema: {
            type: "object",
            properties: {
                section: {
                    type: "string",
                    enum: sectionIds,
                    description: "Section to scroll to.",
                },
            },
            required: ["section"],
            additionalProperties: false,
        },
        execute: (input) => {
            const section = String(input.section ?? "");
            const element = document.getElementById(section);
            if (!element)
                return { ok: false, error: `Unknown section: ${section}` };
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", `#${section}`);
            return { ok: true, section };
        },
    },
    {
        name: "set_theme",
        description: "Switch the portfolio between light and dark theme.",
        inputSchema: {
            type: "object",
            properties: {
                theme: {
                    type: "string",
                    enum: ["light", "dark"],
                    description: "Theme to apply.",
                },
            },
            required: ["theme"],
            additionalProperties: false,
        },
        execute: (input) => {
            const theme = input.theme === "dark" ? "dark" : "light";
            applyTheme(theme);
            return { ok: true, theme };
        },
    },
];

function modelContext(): ModelContext | undefined {
    return document.modelContext ?? navigator.modelContext;
}

export function WebMcp() {
    useEffect(() => {
        const context = modelContext();
        if (!context?.registerTool) return;

        const controller = new AbortController();
        for (const tool of tools) {
            void context
                .registerTool(tool, { signal: controller.signal })
                .catch(() => {
                    // The browser reports registration failures itself.
                });
        }

        return () => controller.abort();
    }, []);

    return null;
}
