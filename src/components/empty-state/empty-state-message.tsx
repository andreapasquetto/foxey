export function EmptyStateMessage(props: { message?: string }) {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">
        {props.message ?? "There are no records."}
      </p>
    </div>
  );
}
