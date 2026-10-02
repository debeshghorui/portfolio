import avatar from "@/assets/image.webp";
import { GithubIcon } from "@/components/animated-icons/github";
import { GraduationCapIcon } from "@/components/animated-icons/graduation-cap";
import { InstagramIcon } from "@/components/animated-icons/instagram";
import { LinkedinIcon } from "@/components/animated-icons/linkedin";
import { MailIcon } from "@/components/animated-icons/mail";
import { MapPinIcon } from "@/components/animated-icons/map-pin";
import { XLogoIcon } from "@/components/animated-icons/x-logo";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    type AnimatedIcon,
    useIconAnimation,
} from "@/hooks/use-icon-animation";
import {
    heroBadges,
    profile,
    site,
    socials,
    type HeroBadgeIcon,
    type SocialIcon,
} from "@/data";

const FOCUS =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const socialIcons: Record<SocialIcon, AnimatedIcon> = {
    github: GithubIcon,
    x: XLogoIcon,
    linkedin: LinkedinIcon,
    instagram: InstagramIcon,
    mail: MailIcon,
};

const badgeIcons: Record<HeroBadgeIcon, AnimatedIcon> = {
    github: GithubIcon,
    "map-pin": MapPinIcon,
    "graduation-cap": GraduationCapIcon,
};

function SocialLink({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: SocialIcon;
}) {
    const Icon = socialIcons[icon];
    const { ref, triggers } = useIconAnimation();
    const external = href.startsWith("http");

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noreferrer" })}
                    aria-label={
                        external ? `${label} (opens in new tab)` : label
                    }
                    {...triggers}
                    className={`inline-flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0 active:scale-95 ${FOCUS}`}
                >
                    <Icon
                        ref={ref}
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none flex items-center justify-center"
                    />
                </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-mono-tight">
                {label.toLowerCase()}
            </TooltipContent>
        </Tooltip>
    );
}

function HeroBadge({ icon, text }: { icon: HeroBadgeIcon; text: string }) {
    const Icon = badgeIcons[icon];
    const { ref, triggers } = useIconAnimation();

    return (
        <span
            onMouseEnter={triggers.onMouseEnter}
            onMouseLeave={triggers.onMouseLeave}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
            <Icon
                ref={ref}
                size={14}
                aria-hidden="true"
                className="pointer-events-none flex items-center justify-center"
            />{" "}
            {text}
        </span>
    );
}

export function HeroSection() {
    return (
        <section aria-labelledby="hero-name" className="flex flex-col gap-6">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5">
                <img
                    src={avatar}
                    alt={site.avatarAlt}
                    width={96}
                    height={96}
                    fetchPriority="high"
                    decoding="async"
                    className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full border border-border bg-card object-cover shadow-md ring-1 ring-accent/30"
                />
                <div className="flex min-w-0 flex-col">
                    <span className="font-mono-tight text-xs text-muted-foreground">
                        {profile.greeting}
                    </span>
                    <h1
                        id="hero-name"
                        className="truncate text-2xl sm:text-4xl font-semibold tracking-tight text-foreground"
                    >
                        {site.name}
                    </h1>
                </div>
            </div>

            <p className="font-mono-tight text-sm text-foreground/90">
                {profile.tagline}
            </p>

            <p className="max-w-2xl text-balance text-base leading-relaxed text-foreground/90">
                {profile.bio.before}
                <span className="bg-[linear-gradient(transparent_62%,var(--accent-glow)_62%)] px-0.5">
                    {profile.bio.highlight}
                </span>
                {profile.bio.after}
            </p>

            <TooltipProvider delayDuration={250} skipDelayDuration={150}>
                <ul
                    aria-label="Social profiles"
                    className="flex flex-wrap items-center gap-2 sm:gap-3 list-none p-0 m-0"
                >
                    {socials.map((social) => (
                        <li key={social.label}>
                            <SocialLink {...social} />
                        </li>
                    ))}
                </ul>
            </TooltipProvider>

            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono-tight text-xs text-muted-foreground">
                {heroBadges.map(({ icon, text }) => (
                    <HeroBadge key={text} icon={icon} text={text} />
                ))}
            </div>
        </section>
    );
}
