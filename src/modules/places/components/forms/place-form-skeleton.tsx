import { CheckboxSkeleton } from "@/components/checkbox-skeleton";
import { InputSkeleton } from "@/components/input-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function PlaceFormSkeleton() {
  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <InputSkeleton />
        <InputSkeleton />
        <InputSkeleton />
        <div className="md:mb-3 md:self-end">
          <CheckboxSkeleton />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-10 w-20 text-right" />
      </div>
    </div>
  );
}
