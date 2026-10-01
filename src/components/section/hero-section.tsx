import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  GraduationCap,
} from "lucide-react";
import avatar from "@/assets/image.webp";
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

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.86l-5.37-7.02L4.06 22H.8l8.03-9.18L.75 2h7.02l4.86 6.42L18.24 2Zm-1.2 18h1.9L7.05 4H5.04l12 16Z" />
    </svg>
  );
}

const socialIcons: Record<
  SocialIcon,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  github: Github,
  x: XIcon,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
};

const badgeIcons: Record<
  HeroBadgeIcon,
  React.ComponentType<{ className?: string }>
> = {
  github: Github,
  "map-pin": MapPin,
  "graduation-cap": GraduationCap,
};

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
          className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-full border border-border bg-card object-cover shadow-md ring-1 ring-accent/30 transition-[box-shadow,transform] duration-300 ease-out-soft motion-safe:hover:scale-[1.02] motion-safe:hover:ring-accent/50"
        />
        <div className="flex min-w-0 flex-col">
          <span className="font-mono-tight text-xs text-muted-foreground">
            {profile.greeting}
          </span>
          <h1
            id="hero-name"
            className="text-balance text-2xl sm:text-4xl font-semibold tracking-tight text-foreground"
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

      <ul
        aria-label="Social profiles"
        className="flex flex-wrap items-center gap-2 sm:gap-3 list-none p-0 m-0"
      >
        {socials.map(({ href, label, icon }) => {
          const Icon = socialIcons[icon];
          const isMail = href.startsWith("mailto:");
          const externalProps = isMail
            ? {}
            : { target: "_blank", rel: "noreferrer" };
          const ariaLabel = isMail ? label : `${label} (opens in new tab)`;
          return (
            <li key={label}>
              <a
                href={href}
                aria-label={ariaLabel}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-card text-muted-foreground interactive-card interactive-lift hover:border-accent hover:text-accent active:scale-95 ${FOCUS}`}
                {...externalProps}
              >
                <Icon
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono-tight text-xs text-muted-foreground">
        {heroBadges.map(({ icon, text }) => {
          const Icon = badgeIcons[icon];
          return (
            <span key={text} className="inline-flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {text}
            </span>
          );
        })}
      </div>
    </section>
  );
}
