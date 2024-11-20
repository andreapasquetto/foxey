import { Skeleton } from "./ui/skeleton";

export function CheckboxSkeleton() {
  return (
    <div className="flex items-end gap-3">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-12" />
    </div>
  );
}
