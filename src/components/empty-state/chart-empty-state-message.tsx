import { ScanSearch } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ChartEmptyStateMessage({
  message = "Not enough data.",
}: {
  message?: string;
}) {
  return (
    <Empty className="h-[380px] border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ScanSearch />
        </EmptyMedia>
        <EmptyTitle className="text-base text-muted-foreground">
          {message}
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
