"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface XLogoIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface XLogoIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const LOGO_VARIANTS: Variants = {
    normal: { rotate: 0, scale: 1 },
    animate: {
        rotate: [0, -12, 8, 0],
        scale: [1, 0.88, 1.05, 1],
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

const XLogoIcon = forwardRef<XLogoIconHandle, XLogoIconProps>(
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
                <motion.svg
                    animate={controls}
                    fill="currentColor"
                    height={size}
                    variants={LOGO_VARIANTS}
                    viewBox="0 0 24 24"
                    width={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.86l-5.37-7.02L4.06 22H.8l8.03-9.18L.75 2h7.02l4.86 6.42L18.24 2Zm-1.2 18h1.9L7.05 4H5.04l12 16Z" />
                </motion.svg>
            </div>
        );
    },
);

XLogoIcon.displayName = "XLogoIcon";

export { XLogoIcon };
