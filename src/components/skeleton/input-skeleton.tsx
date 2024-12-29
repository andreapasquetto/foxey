import { Skeleton } from "@/components/ui/skeleton";

export function InputSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
