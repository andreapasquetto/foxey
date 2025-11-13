import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { numberFormatter } from "@/common/formatters";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Card key={inspection.id} className="relative">
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
            <CardHeader>
              <CardDescription>
                {format(inspection.datetime, "ccc y-MM-dd HH:mm")}
              </CardDescription>
              <CardTitle>
                {numberFormatter.format(Number(inspection.odometer))} km
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
