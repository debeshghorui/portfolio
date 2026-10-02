import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/animated-icons/arrow-up";
import { useIconAnimation } from "@/hooks/use-icon-animation";
import { footerLinks, site, socials } from "@/data";

const FOCUS =
    "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const LINK = `text-muted-foreground transition-colors hover:text-foreground ${FOCUS}`;

function useLocalTime(timeZone: string) {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const format = new Intl.DateTimeFormat("en-IN", {
            timeZone,
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        const update = () => setTime(format.format(new Date()).toLowerCase());
        update();

        // Re-align to the start of each minute so the clock never lags.
        let interval = 0;
        const timeout = window.setTimeout(
            () => {
                update();
                interval = window.setInterval(update, 60_000);
            },
            60_000 - (Date.now() % 60_000),
        );
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [timeZone]);

    return time;
}

function LinkColumn({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xs text-foreground">{title}</h2>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {children}
            </ul>
        </div>
    );
}

export function SiteFooter() {
    const time = useLocalTime(site.timeZone);
    const arrowIcon = useIconAnimation();

    const scrollToTop = () => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <footer className="mx-auto mt-24 max-w-3xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border/60 pt-10 font-mono-tight text-xs sm:grid-cols-3">
                <LinkColumn title="site">
                    {footerLinks.site.map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} className={LINK}>
                                {label}
                            </a>
                        </li>
                    ))}
                </LinkColumn>
                <LinkColumn title="elsewhere">
                    {socials.map(({ href, label }) => {
                        const external = href.startsWith("http");
                        return (
                            <li key={label}>
                                <a
                                    href={href}
                                    {...(external && {
                                        target: "_blank",
                                        rel: "noreferrer",
                                    })}
                                    className={LINK}
                                >
                                    {label.toLowerCase()}
                                    {external && (
                                        <span className="sr-only">
                                            {" "}
                                            (opens in new tab)
                                        </span>
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </LinkColumn>
                <LinkColumn title="for machines">
                    {footerLinks.machines.map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} className={LINK}>
                                {label}
                            </a>
                        </li>
                    ))}
                </LinkColumn>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-3 font-mono-tight text-xs text-muted-foreground">
                <p className="m-0 inline-flex items-center gap-2">
                    <span
                        aria-hidden="true"
                        className="relative inline-flex h-1.5 w-1.5"
                    >
                        <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span>
                        <time className="tabular-nums text-foreground">
                            {time ?? "--:--"}
                        </time>{" "}
                        in {site.locationLabel}
                    </span>
                </p>
                <button
                    type="button"
                    onClick={scrollToTop}
                    {...arrowIcon.triggers}
                    className={`group inline-flex items-center gap-1.5 px-1 py-1 ${LINK}`}
                >
                    back to top
                    <ArrowUpIcon
                        ref={arrowIcon.ref}
                        size={14}
                        aria-hidden="true"
                        className="pointer-events-none flex items-center justify-center"
                    />
                </button>
            </div>

            <div
                aria-hidden="true"
                className="@container mt-6 select-none overflow-hidden"
            >
                <p className="m-0 whitespace-nowrap text-center text-[15.7cqw] font-semibold leading-[0.8] tracking-tighter text-foreground/90 [mask-image:linear-gradient(to_bottom,black_15%,transparent_95%)]">
                    {site.nameShort}
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 py-6 font-mono-tight text-xs text-muted-foreground">
                <span>
                    © {new Date().getFullYear()} {site.nameShort}
                </span>
                <span>{site.footerTagline}</span>
            </div>
        </footer>
    );
}
