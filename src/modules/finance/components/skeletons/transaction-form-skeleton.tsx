import { InputSkeleton } from "@/components/skeleton/input-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function TransactionFormSkeleton() {
  return (
    <div className="space-y-4 py-2 pb-4">
      <InputSkeleton />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputSkeleton />
        <InputSkeleton />
      </div>
      <InputSkeleton />
      <InputSkeleton />
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-10 w-20 text-right" />
      </div>
    </div>
  );
}
