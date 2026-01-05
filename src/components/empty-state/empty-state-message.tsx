import { ScanSearch } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyStateMessage({
  message = "There are no records.",
}: {
  message?: string;
}) {
  return (
    <Empty>
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
