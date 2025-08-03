import { numberFormatter } from "@/common/formatters";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Inspection } from "@/db/types/mobility";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

export function InspectionList(props: { inspections: Inspection[] }) {
  const { inspections } = props;

  if (!inspections.length) {
    return <ComponentEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {inspections.toReversed().map((inspection) => (
        <Card key={inspection.id} className="relative">
          <div className="absolute right-2 top-2">
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
            <CardDescription>{format(inspection.datetime, "ccc y-MM-dd HH:mm")}</CardDescription>
            <CardTitle>{numberFormatter.format(Number(inspection.odometer))} km</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">
        There are no inspections for this car.
      </p>
    </div>
  );
}
