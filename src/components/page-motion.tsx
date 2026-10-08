import { Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and rises the page on client navigations.
 * The first paint is left to CSS so a reload can start moving before hydration.
 */
export function PageTransition() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    });
    const first = useRef(true);

    useEffect(() => {
        first.current = false;
        // Let the reload animation finish, then stop it from replaying on
        // client-side page changes (those use the motion transition below).
        const timer = window.setTimeout(() => {
            document.documentElement.setAttribute("data-page-entered", "");
        }, 900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            key={pathname}
            initial={first.current ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
        >
            <Outlet />
        </motion.div>
    );
}

/** Thin accent bar. Waits briefly so instant navigations don't flash it. */
export function RouteProgress() {
    const active = useRouterState({
        select: (state) => state.isLoading || state.isTransitioning,
    });
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState(0);

    useEffect(() => {
        if (!active) {
            setVisible(false);
            return;
        }
        const timer = window.setTimeout(() => {
            setToken((n) => n + 1);
            setVisible(true);
        }, 140);
        return () => clearTimeout(timer);
    }, [active]);

    return (
        <motion.div
            key={token}
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
            initial={token === 0 ? false : { scaleX: 0, opacity: 1 }}
            animate={
                token === 0
                    ? { scaleX: 0, opacity: 0 }
                    : visible
                      ? { scaleX: 0.82, opacity: 1 }
                      : { scaleX: 1, opacity: 0 }
            }
            transition={{
                duration: visible ? 0.9 : 0.35,
                ease: EASE,
            }}
        />
    );
}
