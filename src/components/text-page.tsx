export function TextPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-16">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/90">{children}</div>
    </main>
  );
}
