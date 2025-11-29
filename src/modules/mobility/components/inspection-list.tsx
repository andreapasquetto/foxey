import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { numberFormatter } from "@/common/formatters";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Inspection } from "@/db/types/mobility";

export function InspectionList(props: { inspections: Inspection[] }) {
  const { inspections } = props;

  if (!inspections.length) {
    return (
      <EmptyStateMessage message="There are no inspections for this car." />
    );
  }

  return (
    <div className="space-y-3">
      {inspections
        .toReversed()
        .slice(0, 3)
        .map((inspection) => (
          <Item key={inspection.id} variant="outline" className="relative">
            <div className="absolute top-2 right-2">
              <div className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground transition-colors">
                {inspection.isSuccessful ? (
                  <>
                    <Check className="size-4 text-green-500" />
                    Passed
                  </>
                ) : (
                  <>
                    <X className="size-4 text-red-500" />
                    Passed
                  </>
                )}
              </div>
            </div>
            <ItemContent>
              <ItemDescription>
                {format(inspection.datetime, "ccc y-MM-dd HH:mm")}
              </ItemDescription>
              <ItemTitle>
                {numberFormatter.format(Number(inspection.odometer))} km
              </ItemTitle>
            </ItemContent>
          </Item>
        ))}
    </div>
  );
}
