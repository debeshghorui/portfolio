export function TextPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="page-enter mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16 outline-none"
    >
      <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-sm text-pretty text-muted-foreground">
          {subtitle}
        </p>
      )}
      <div className="mt-6 space-y-4 max-w-prose text-base leading-relaxed text-foreground/90">
        {children}
      </div>
    </main>
  );
}
