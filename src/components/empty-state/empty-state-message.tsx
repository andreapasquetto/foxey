import { ScanSearch } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyStateMessage(props: { message?: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ScanSearch />
        </EmptyMedia>
        <EmptyTitle className="text-base text-muted-foreground">
          {props.message ?? "There are no records."}
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
