"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MailIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface MailIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const ENVELOPE_VARIANTS: Variants = {
    normal: { y: 0 },
    animate: {
        y: [0, -1.5, 0],
        transition: { duration: 0.45, ease: "easeInOut" },
    },
};

const FLAP_VARIANTS: Variants = {
    normal: { pathLength: 1, opacity: 1 },
    animate: {
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

const MailIcon = forwardRef<MailIconHandle, MailIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => controls.start("animate"),
                stopAnimation: () => controls.start("normal"),
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseEnter?.(e);
                } else {
                    controls.start("animate");
                }
            },
            [controls, onMouseEnter],
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseLeave?.(e);
                } else {
                    controls.start("normal");
                }
            },
            [controls, onMouseLeave],
        );

        return (
            <div
                className={cn(className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <svg
                    fill="none"
                    height={size}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.g animate={controls} variants={ENVELOPE_VARIANTS}>
                        <rect height="16" rx="2" width="20" x="2" y="4" />
                        <motion.path
                            animate={controls}
                            d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                            variants={FLAP_VARIANTS}
                        />
                    </motion.g>
                </svg>
            </div>
        );
    },
);

MailIcon.displayName = "MailIcon";

export { MailIcon };
