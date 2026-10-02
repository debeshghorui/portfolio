import { useCallback, useRef } from "react";
import { useReducedMotion } from "motion/react";

export interface IconAnimationHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

export type AnimatedIcon = React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & {
        size?: number;
    } & React.RefAttributes<IconAnimationHandle>
>;

/**
 * Lets a parent (link, button, card) drive an animated icon, so the icon
 * plays on hover and on keyboard focus of the whole target, not just itself.
 */
export function useIconAnimation() {
    const ref = useRef<IconAnimationHandle>(null);
    const reduceMotion = useReducedMotion();

    const start = useCallback(() => {
        if (!reduceMotion) ref.current?.startAnimation();
    }, [reduceMotion]);
    const stop = useCallback(() => ref.current?.stopAnimation(), []);

    return {
        ref,
        start,
        triggers: {
            onMouseEnter: start,
            onMouseLeave: stop,
            onFocus: start,
            onBlur: stop,
        },
    };
}
