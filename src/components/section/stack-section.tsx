import type { CSSProperties } from "react";
import { Marquee } from "@/components/ui/marquee";
import { sections, stack, stackLogoCDN } from "@/data";

const half = Math.ceil(stack.length / 2);
const rows = [stack.slice(0, half), stack.slice(half)];

function StackChip({ item }: { item: (typeof stack)[number] }) {
    const logo = `url(${stackLogoCDN}${item.slug})`;
    return (
        <li
            style={
                { "--brand": item.hex ?? "var(--foreground)" } as CSSProperties
            }
            className="group/chip flex shrink-0 items-center gap-2 rounded-xl border border-black/5 bg-white/40 px-4 py-2 text-sm font-normal lowercase text-foreground transition-all duration-300 hover:bg-white hover:shadow-sm dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
        >
            <span
                style={{
                    maskImage: logo,
                    WebkitMaskImage: logo,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                }}
                className="size-4 shrink-0 bg-current text-muted-foreground transition-colors duration-300 group-hover/chip:text-(--brand)"
            />
            {item.name}
        </li>
    );
}

export function StackSection() {
    return (
        <section
            id={sections.stack.id}
            aria-labelledby="stack-heading"
            className="mt-12 scroll-mt-24"
        >
            <h2 id="stack-heading" className="sr-only">
                {sections.stack.title}
            </h2>
            <ul className="sr-only">
                {stack.map((s) => (
                    <li key={s.name}>{s.name}</li>
                ))}
            </ul>
            <div
                aria-hidden="true"
                className="flex w-full flex-col overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]"
            >
                {rows.map((row, i) => (
                    <Marquee
                        key={i}
                        reverse={i % 2 === 1}
                        pauseOnHover
                        className="[--duration:80s]"
                    >
                        <ul className="m-0 flex list-none gap-(--gap) p-0">
                            {row.map((s) => (
                                <StackChip key={s.name} item={s} />
                            ))}
                        </ul>
                    </Marquee>
                ))}
            </div>
        </section>
    );
}
