// Deterministic pseudo-random contribution-style grid (53 weeks × 7 days).
// Decorative only — not live GitHub data.
const WEEKS = 53;
const DAYS = 7;

function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const rand = seededRandom(42);
const cells: number[] = Array.from({ length: WEEKS * DAYS }, (_, i) => {
  // weekends slightly less, occasional streak peaks
  const dayOfWeek = i % DAYS;
  const base = rand();
  const dip = dayOfWeek === 0 || dayOfWeek === 6 ? 0.55 : 1;
  const v = base * dip;
  if (v < 0.45) return 0;
  if (v < 0.65) return 1;
  if (v < 0.82) return 2;
  if (v < 0.94) return 3;
  return 4;
});

const LEVEL_BG = [
  "bg-grid-0",
  "bg-grid-1",
  "bg-grid-2",
  "bg-grid-3",
  "bg-grid-4",
];
const MONTHS = [
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
];

// Index of the first week (0-based) at which each month starts, assuming
// the grid begins on the first day of "Jul". Used to position month labels
// above the correct week column instead of evenly spreading them.
const MONTH_START_WEEK = [0, 5, 9, 13, 17, 22, 26, 30, 35, 39, 43, 48];

export function ContributionGrid() {
  return (
    <div
      className="w-full"
      role="img"
      aria-label="A decorative contribution-style activity grid for the last year. It is generated from seeded pseudo-random data and does not reflect live activity."
    >
      <div className="mb-2 relative h-3 font-mono-tight text-[10px] text-muted-foreground">
        {MONTHS.map((m, i) => (
          <span
            key={m}
            className="absolute top-0"
            style={{
              left: `calc((100% - ${
                WEEKS - 1
              }px) * ${MONTH_START_WEEK[i]} / ${WEEKS - 1} + ${MONTH_START_WEEK[i]}px)`,
            }}
          >
            {m}
          </span>
        ))}
      </div>
      <div className="w-full overflow-x-auto pb-1">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${WEEKS}, 9px)`,
            minWidth: `${WEEKS * 12}px`,
          }}
        >
          {Array.from({ length: WEEKS }).map((_, w) => (
            <div key={w} className="grid grid-rows-7 gap-[3px]">
              {Array.from({ length: DAYS }).map((_, d) => {
                const lvl = cells[w * DAYS + d];
                return (
                  <div
                    key={d}
                    aria-hidden="true"
                    className={`contribution-cell h-[9px] w-[9px] rounded-[2px] ${LEVEL_BG[lvl]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono-tight text-[10px] text-muted-foreground">
        <span>less</span>
        {LEVEL_BG.map((c, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`h-2.5 w-2.5 rounded-[2px] ${c}`}
          />
        ))}
        <span>more</span>
      </div>
    </div>
  );
}
