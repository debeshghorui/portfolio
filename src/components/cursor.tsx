import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const TEXT_FIELD =
    "input, textarea, select, [contenteditable=''], [contenteditable='true'], [contenteditable='plaintext-only']";

/** Custom dot + ring cursor that grows over links (desktop only). */
export function Cursor() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const rx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.4 });
    const ry = useSpring(y, { stiffness: 250, damping: 25, mass: 0.4 });
    const [enabled, setEnabled] = useState(false);
    const [hover, setHover] = useState(false);
    const [label, setLabel] = useState("");
    const [texting, setTexting] = useState(false);

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        setEnabled(true);
        document.body.classList.add("has-cursor");
        const move = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            const target = e.target instanceof Element ? e.target : null;
            const field = Boolean(target?.closest(TEXT_FIELD));
            setTexting(field);
            if (field) {
                setHover(false);
                setLabel("");
                document.body.classList.remove("has-cursor");
                return;
            }
            document.body.classList.add("has-cursor");
            const el = target?.closest(
                "a, button, [data-cursor]",
            ) as HTMLElement | null;
            setHover(!!el);
            setLabel(el?.dataset["cursor"] ?? "");
        };
        window.addEventListener("pointermove", move);
        return () => {
            window.removeEventListener("pointermove", move);
            document.body.classList.remove("has-cursor");
        };
    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            <motion.div
                style={{ x, y }}
                animate={{ opacity: texting ? 0 : 1 }}
                className="pointer-events-none fixed top-0 left-0 z-[90] -ml-1 -mt-1 size-2 rounded-full bg-accent"
            />
            <motion.div
                style={{ x: rx, y: ry }}
                className="pointer-events-none fixed top-0 left-0 z-[90]"
            >
                <motion.div
                    animate={{
                        width: label ? 88 : hover ? 56 : 32,
                        height: label ? 88 : hover ? 56 : 32,
                        opacity: texting ? 0 : 1,
                    }}
                    transition={{
                        width: { type: "spring", stiffness: 300, damping: 25 },
                        height: { type: "spring", stiffness: 300, damping: 25 },
                        opacity: { duration: 0.12 },
                    }}
                    className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/40 bg-background/10 backdrop-blur-[1px]"
                >
                    {label ? (
                        <span className="text-[10px] font-medium uppercase tracking-widest">
                            {label}
                        </span>
                    ) : null}
                </motion.div>
            </motion.div>
        </>
    );
}
