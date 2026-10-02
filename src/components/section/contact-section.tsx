import { useEffect, useRef, useState } from "react";

import {
    CheckIcon,
    type CheckIconHandle,
} from "@/components/animated-icons/check";
import { CopyIcon } from "@/components/animated-icons/copy";
import { GithubIcon } from "@/components/animated-icons/github";
import { MailIcon } from "@/components/animated-icons/mail";
import { Section } from "@/components/section/section";
import { MorphIcon } from "@/components/spaceui/morph-icon";
import { useIconAnimation } from "@/hooks/use-icon-animation";
import { contact, links, sections, site } from "@/data";

const FOCUS =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";

const SECONDARY_BUTTON = `inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 font-mono-tight text-xs text-foreground transition-[color,background-color,transform] hover:bg-muted active:scale-[0.97] ${FOCUS}`;

const ICON = "pointer-events-none flex items-center justify-center";

function CopyEmailButton() {
    const [copied, setCopied] = useState(false);
    const copyIcon = useIconAnimation();
    const checkRef = useRef<CheckIconHandle>(null);

    useEffect(() => {
        if (!copied) return;
        checkRef.current?.startAnimation();
        const timeout = window.setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timeout);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
        } catch {
            window.location.href = links.email;
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            {...copyIcon.triggers}
            className={SECONDARY_BUTTON}
        >
            <MorphIcon activeKey={copied ? "check" : "copy"} variant="spring">
                {copied ? (
                    <CheckIcon
                        ref={checkRef}
                        size={14}
                        aria-hidden="true"
                        className={`${ICON} text-accent`}
                    />
                ) : (
                    <CopyIcon
                        ref={copyIcon.ref}
                        size={14}
                        aria-hidden="true"
                        className={ICON}
                    />
                )}
            </MorphIcon>
            <span aria-live="polite">{copied ? "copied" : "copy email"}</span>
        </button>
    );
}

export function ContactSection() {
    const mailIcon = useIconAnimation();
    const githubIcon = useIconAnimation();

    return (
        <Section
            id={sections.contact.id}
            title={sections.contact.title}
            subtitle={sections.contact.subtitle}
        >
            <div className="rounded-lg border border-border bg-card p-5 sm:p-6">
                <p className="text-base text-foreground">
                    {contact.introBeforeX}{" "}
                    <a
                        href={links.x}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`DM ${site.name} on X (opens in new tab)`}
                        className={`accent-link font-medium rounded-sm ${FOCUS}`}
                    >
                        {contact.xLinkText}
                    </a>{" "}
                    {contact.introBetween}{" "}
                    <a
                        href={links.email}
                        className={`accent-link font-medium rounded-sm ${FOCUS}`}
                    >
                        {contact.emailLinkText}
                    </a>
                    {contact.introAfter}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <a
                        href={links.email}
                        {...mailIcon.triggers}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-md bg-foreground px-4 py-2.5 font-mono-tight text-xs text-background transition-[opacity,transform] hover:opacity-90 active:scale-[0.97] ${FOCUS}`}
                    >
                        <MailIcon
                            ref={mailIcon.ref}
                            size={14}
                            aria-hidden="true"
                            className={ICON}
                        />{" "}
                        {site.email}
                    </a>
                    <CopyEmailButton />
                    <a
                        href={links.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub profile (opens in new tab)"
                        {...githubIcon.triggers}
                        className={SECONDARY_BUTTON}
                    >
                        <GithubIcon
                            ref={githubIcon.ref}
                            size={14}
                            aria-hidden="true"
                            className={ICON}
                        />{" "}
                        {contact.githubButtonLabel}
                    </a>
                </div>
            </div>
        </Section>
    );
}
