import React, { useState, useEffect, useCallback } from "react";
import { MorphIcon } from "@/components/spaceui/morph-icon";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { applyTheme } from "@/lib/theme";

export const THEME_TOGGLE_CONFIG = {
    circle: {
        label: "Circle",
        directions: [
            "center",
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
            "top-center",
            "bottom-center",
        ],
        defaultDirection: "center",
        supportsBlur: true,
    },
    "circle-blur": {
        label: "Circle Blur",
        directions: [
            "center",
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
            "top-center",
            "bottom-center",
        ],
        defaultDirection: "center",
        supportsBlur: false,
    },
    rectangle: {
        label: "Rectangle",
        directions: [
            "bottom-up",
            "top-down",
            "left-right",
            "right-left",
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
        ],
        defaultDirection: "bottom-up",
        supportsBlur: true,
    },
    polygon: {
        label: "Polygon",
        directions: ["top-left", "top-right"],
        defaultDirection: "top-left",
        supportsBlur: true,
    },
} as const;

export type Variant = keyof typeof THEME_TOGGLE_CONFIG;
export type CircleDirection =
    (typeof THEME_TOGGLE_CONFIG)["circle"]["directions"][number];
export type RectangleDirection =
    (typeof THEME_TOGGLE_CONFIG)["rectangle"]["directions"][number];
export type PolygonDirection =
    (typeof THEME_TOGGLE_CONFIG)["polygon"]["directions"][number];

export type StartPos = CircleDirection | RectangleDirection | PolygonDirection;

export interface UseThemeToggleProps {
    variant?: Variant;
    start?: StartPos;
    blur?: boolean;
}

const getStartCoordinates = (start: StartPos) => {
    switch (start) {
        case "top-left":
            return { cx: "0", cy: "0" };
        case "top-right":
            return { cx: "40", cy: "0" };
        case "bottom-left":
            return { cx: "0", cy: "40" };
        case "bottom-right":
            return { cx: "40", cy: "40" };
        case "top-center":
            return { cx: "20", cy: "0" };
        case "bottom-center":
            return { cx: "20", cy: "40" };
        case "bottom-up":
        case "top-down":
        case "left-right":
        case "right-left":
        case "center":
        default:
            return { cx: "20", cy: "20" };
    }
};

export const createAnimation = (
    variant: Variant = "circle",
    start?: StartPos,
    blur: boolean = false,
) => {
    const config = THEME_TOGGLE_CONFIG[variant] ?? THEME_TOGGLE_CONFIG.circle;
    const validDirections = config.directions as readonly string[];
    const effectiveStart =
        start && validDirections.includes(start)
            ? start
            : config.defaultDirection;
    const getSvgDataUrl = (v: Variant, s: StartPos) => {
        if (v === "circle-blur") {
            if (s === "center") {
                return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
            }
            const coords = getStartCoordinates(s);
            if (!coords) throw new Error(`Invalid start position: ${s}`);
            return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${coords.cx}" cy="${coords.cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
        }
        if (s === "center") return;
        if (v === "rectangle") return "";
        const coords = getStartCoordinates(s);
        if (!coords) throw new Error(`Invalid start position: ${s}`);
        return v === "circle"
            ? `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${coords.cx}" cy="${coords.cy}" r="20" fill="white"/></svg>`
            : "";
    };

    const svgDataUrl = getSvgDataUrl(variant, effectiveStart);
    const startTransformOrigin = (() => {
        switch (effectiveStart) {
            case "top-left":
                return "top left";
            case "top-right":
                return "top right";
            case "bottom-left":
                return "bottom left";
            case "bottom-right":
                return "bottom right";
            case "top-center":
                return "top center";
            case "bottom-center":
                return "bottom center";
            case "bottom-up":
            case "top-down":
            case "left-right":
            case "right-left":
            default:
                return "center";
        }
    })();

    if (variant === "rectangle") {
        const polygon = (() => {
            switch (effectiveStart) {
                case "top-down":
                    return {
                        from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
                case "left-right":
                    return {
                        from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
                case "right-left":
                    return {
                        from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
                case "top-left":
                    return {
                        from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
                case "top-right":
                    return {
                        from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 0%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
                case "bottom-left":
                    return {
                        from: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
                case "bottom-right":
                    return {
                        from: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
                case "bottom-up":
                default:
                    return {
                        from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                        to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    };
            }
        })();

        const suffix = blur ? "-blur" : "";
        return {
            name: `${variant}-${effectiveStart}${suffix}`,
            css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light-${effectiveStart}${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${effectiveStart}${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        @keyframes reveal-dark-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.from}; ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: ${polygon.to}; ${blur ? "filter: blur(0px);" : ""} }
        }
        @keyframes reveal-light-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.from}; ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: ${polygon.to}; ${blur ? "filter: blur(0px);" : ""} }
        }
      `,
        };
    }

    if (variant === "circle" && effectiveStart === "center") {
        const suffix = blur ? "-blur" : "";
        return {
            name: `${variant}-${effectiveStart}${suffix}`,
            css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        @keyframes reveal-dark${suffix} {
          from { clip-path: circle(0% at 50% 50%); ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: circle(100% at 50% 50%); ${blur ? "filter: blur(0px);" : ""} }
        }
        @keyframes reveal-light${suffix} {
          from { clip-path: circle(0% at 50% 50%); ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: circle(100% at 50% 50%); ${blur ? "filter: blur(0px);" : ""} }
        }
      `,
        };
    }

    if (variant === "circle-blur") {
        if (effectiveStart === "center") {
            return {
                name: `${variant}-${effectiveStart}`,
                css: `
          ::view-transition-group(root) { animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
          ::view-transition-new(root) { mask: url('${svgDataUrl}') center / 0 no-repeat; mask-origin: content-box; -webkit-mask: url('${svgDataUrl}') center / 0 no-repeat; -webkit-mask-origin: content-box; animation: scale 1s; transform-origin: center; z-index: 2; }
          ::view-transition-old(root) { animation: none; z-index: 1; }
          @keyframes scale { from { mask-size: 0px; -webkit-mask-size: 0px; } to { mask-size: 350vmax; -webkit-mask-size: 350vmax; } }
        `,
            };
        } else {
            return {
                name: `${variant}-${effectiveStart}`,
                css: `
          ::view-transition-group(root) { animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
          ::view-transition-new(root) { mask: url('${svgDataUrl}') ${effectiveStart.replace("-", " ")} / 0 no-repeat; mask-origin: content-box; -webkit-mask: url('${svgDataUrl}') ${effectiveStart.replace("-", " ")} / 0 no-repeat; -webkit-mask-origin: content-box; animation: scale 1s; transform-origin: ${startTransformOrigin}; z-index: 2; }
          ::view-transition-old(root) { animation: none; z-index: 1; }
          @keyframes scale { from { mask-size: 0px; -webkit-mask-size: 0px; } to { mask-size: 350vmax; -webkit-mask-size: 350vmax; } }
        `,
            };
        }
    }

    if (variant === "polygon") {
        const polygon = (() => {
            switch (effectiveStart) {
                case "top-right":
                    return {
                        darkFrom:
                            "polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)",
                        darkTo: "polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)",
                        lightFrom:
                            "polygon(-71% 50%, 50% 171%, 50% 171%, -71% 50%)",
                        lightTo:
                            "polygon(-71% 50%, 50% 171%, 250% 71%, 150% -71%)",
                    };
                case "top-left":
                default:
                    return {
                        darkFrom:
                            "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
                        darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
                        lightFrom:
                            "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
                        lightTo:
                            "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
                    };
            }
        })();
        const suffix = blur ? "-blur" : "";
        return {
            name: `${variant}-${effectiveStart}${suffix}`,
            css: `
        ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light-${effectiveStart}${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${effectiveStart}${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        @keyframes reveal-dark-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.darkFrom}; ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: ${polygon.darkTo}; ${blur ? "filter: blur(0px);" : ""} }
        }
        @keyframes reveal-light-${effectiveStart}${suffix} {
          from { clip-path: ${polygon.lightFrom}; ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: ${polygon.lightTo}; ${blur ? "filter: blur(0px);" : ""} }
        }
      `,
        };
    }

    if (variant === "circle" && effectiveStart !== "center") {
        const coords = (() => {
            switch (effectiveStart) {
                case "top-left":
                    return "0% 0%";
                case "top-right":
                    return "100% 0%";
                case "bottom-left":
                    return "0% 100%";
                case "bottom-right":
                    return "100% 100%";
                case "top-center":
                    return "50% 0%";
                case "bottom-center":
                    return "50% 100%";
                default:
                    return "50% 50%";
            }
        })();
        const suffix = blur ? "-blur" : "";
        return {
            name: `${variant}-${effectiveStart}${suffix}`,
            css: `
        ::view-transition-group(root) { animation-duration: 1s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        ::view-transition-new(root) { animation-name: reveal-light-${effectiveStart}${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        ::view-transition-old(root) { animation: none; z-index: 1; }
        .dark::view-transition-new(root) { animation-name: reveal-dark-${effectiveStart}${suffix}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
        @keyframes reveal-dark-${effectiveStart}${suffix} {
          from { clip-path: circle(0% at ${coords}); ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: circle(150% at ${coords}); ${blur ? "filter: blur(0px);" : ""} }
        }
        @keyframes reveal-light-${effectiveStart}${suffix} {
          from { clip-path: circle(0% at ${coords}); ${blur ? "filter: blur(8px);" : ""} }
          ${blur ? "50% { filter: blur(4px); }" : ""}
          to { clip-path: circle(150% at ${coords}); ${blur ? "filter: blur(0px);" : ""} }
        }
      `,
        };
    }

    const suffix = blur ? "-blur" : "";
    return {
        name: `${variant}-${effectiveStart}${suffix}`,
        css: `
      ::view-transition-group(root) { animation-timing-function: cubic-bezier(0.7, 0, 0.84, 0); }
      ::view-transition-new(root) { mask: url('${svgDataUrl}') ${effectiveStart.replace("-", " ")} / 0 no-repeat; mask-origin: content-box; -webkit-mask: url('${svgDataUrl}') ${effectiveStart.replace("-", " ")} / 0 no-repeat; -webkit-mask-origin: content-box; animation: scale-${effectiveStart}${suffix} 1s; transform-origin: ${startTransformOrigin}; z-index: 2; ${blur ? "filter: blur(2px);" : ""} }
      ::view-transition-old(root) { animation: none; z-index: 1; }
      @keyframes scale-${effectiveStart}${suffix} {
        from { mask-size: 0px; -webkit-mask-size: 0px; ${blur ? "filter: blur(8px);" : ""} }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to { mask-size: 2000vmax; -webkit-mask-size: 2000vmax; ${blur ? "filter: blur(0px);" : ""} }
      }
    `,
    };
};

export const useThemeToggle = ({
    variant = "circle",
    start,
    blur = false,
}: UseThemeToggleProps = {}) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const sync = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };
        sync();
        window.addEventListener("portfolio-theme", sync);
        return () => window.removeEventListener("portfolio-theme", sync);
    }, []);

    const styleId = "theme-transition-styles";
    const injectStyles = useCallback((css: string) => {
        let el = document.getElementById(styleId);
        if (!el) {
            el = document.createElement("style");
            el.id = styleId;
            document.head.appendChild(el);
        }
        el.textContent = css;
    }, []);

    const triggerTransition = useCallback(
        (newTheme: "light" | "dark", isDarkNew: boolean) => {
            setIsDark(isDarkNew);

            if (typeof document === "undefined") return;

            const reduceMotion =
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            // No view transitions or reduced motion: apply immediately, no animation.
            if (reduceMotion || !document.startViewTransition) {
                applyTheme(newTheme);
                return;
            }

            const { css } = createAnimation(variant, start, blur);
            injectStyles(css);

            const transition = document.startViewTransition(() => {
                applyTheme(newTheme);
            });

            transition.finished.finally(() => {
                const el = document.getElementById(styleId);
                if (el) el.remove();
            });
        },
        [variant, start, blur, injectStyles],
    );

    const toggleTheme = useCallback(() => {
        const currentIsDark =
            document.documentElement.classList.contains("dark");
        const nextIsDark = !currentIsDark;
        const nextTheme = nextIsDark ? "dark" : "light";
        triggerTransition(nextTheme, nextIsDark);
    }, [triggerTransition]);

    return { isDark, setIsDark, toggleTheme };
};

export type ThemeToggleSize =
    | "xs"
    | "sm"
    | "md"
    | "default"
    | "lg"
    | "xl"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | "icon-xl";

const ICON_SIZE_MAP: Record<ThemeToggleSize, string> = {
    xs: "h-3.5 w-3.5",
    "icon-xs": "h-3.5 w-3.5",
    sm: "h-4 w-4",
    "icon-sm": "h-4 w-4",
    md: "h-4.5 w-4.5",
    default: "h-4.5 w-4.5",
    icon: "h-4.5 w-4.5",
    lg: "h-5 w-5",
    "icon-lg": "h-5 w-5",
    xl: "h-5.5 w-5.5",
    "icon-xl": "h-5.5 w-5.5",
};

const BUTTON_CLASS =
    "inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export interface ThemeToggleButtonProps
    extends
        UseThemeToggleProps,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    size?: ThemeToggleSize;
    iconSize?: string;
}

export const ThemeToggleButton = ({
    className,
    size = "icon",
    variant = "circle",
    start,
    blur = false,
    iconSize,
    title,
    ...props
}: ThemeToggleButtonProps) => {
    const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const calculatedIconClass =
        iconSize || ICON_SIZE_MAP[size] || "h-4.5 w-4.5";

    const label = mounted
        ? title || `Theme: ${isDark ? "dark" : "light"} (click to switch)`
        : "Toggle theme";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={label}
            title={label}
            aria-pressed={isDark}
            className={cn(
                BUTTON_CLASS,
                "relative overflow-hidden cursor-pointer",
                className,
            )}
            suppressHydrationWarning
            {...props}
        >
            <MorphIcon
                activeKey={isDark ? "dark" : "light"}
                variant="blur-scale"
            >
                {isDark ? (
                    <Sun className={calculatedIconClass} aria-hidden="true" />
                ) : (
                    <Moon className={calculatedIconClass} aria-hidden="true" />
                )}
            </MorphIcon>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
};
