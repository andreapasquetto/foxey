import { ScanSearch } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ChartEmptyStateMessage(props: { message?: string }) {
  return (
    <Empty className="h-[380px] border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ScanSearch />
        </EmptyMedia>
        <EmptyTitle>{props.message ?? "Not enough data."}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
