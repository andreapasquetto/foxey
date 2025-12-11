import { format } from "date-fns";
import { numberFormatter } from "@/common/formatters";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { Inspection } from "@/db/types/mobility";
import { cn } from "@/lib/utils";

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
          <Item
            key={inspection.id}
            variant="outline"
            className={cn(
              inspection.isSuccessful
                ? "border-green-700/50"
                : "border-red-700/50",
            )}
          >
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
