export function ChartEmptyStateMessage(props: { message?: string }) {
  return (
    <div className="relative h-[380px] overflow-hidden rounded-md border border-dashed">
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-neutral-50/95 from-10% to-neutral-50 p-2 dark:from-neutral-950/95 dark:to-neutral-950">
        <p className="text-sm text-muted-foreground">{props.message ?? "Not enough data."}</p>
      </div>
    </div>
  );
}
