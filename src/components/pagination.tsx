import { pageSizeDefaults } from "@/common/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  pageStartIndex: number;
  pageEndIndex: number;
  isPrevPageDisabled: boolean;
  isNextPageDisabled: boolean;
  changePageSize: (pageSize: number) => void;
  goFirstPage: () => void;
  goPrevPage: () => void;
  goNextPage: () => void;
  goLastPage: () => void;
}

export function Pagination(props: PaginationProps) {
  return (
    <nav className="flex items-center justify-end bg-background px-4 py-3 text-muted-foreground sm:px-6">
      <div className="flex h-full items-center justify-end space-x-4">
        <div className="hidden text-sm font-medium sm:block">
          <span>Results per page</span>
        </div>
        <Select
          onValueChange={(value) => props.changePageSize(parseInt(value))}
          value={props.pageSize.toString()}
        >
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageSizeDefaults.map((pageSize) => (
                <SelectItem value={pageSize.toString()} key={pageSize}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="hidden sm:block">
          <p className="text-sm">
            <span className="font-medium">
              {`${Math.min(props.total, props.pageStartIndex + 1)}-${props.pageEndIndex} of ${props.total}`}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={props.isPrevPageDisabled}
            onClick={props.goFirstPage}
            variant="outline"
            size="icon"
          >
            <ChevronsLeft />
          </Button>
          <Button
            disabled={props.isPrevPageDisabled}
            onClick={props.goPrevPage}
            variant="outline"
            size="icon"
          >
            <ChevronLeft />
          </Button>
          <Button
            disabled={props.isNextPageDisabled}
            onClick={props.goNextPage}
            variant="outline"
            size="icon"
          >
            <ChevronRight />
          </Button>
          <Button
            disabled={props.isNextPageDisabled}
            onClick={props.goLastPage}
            variant="outline"
            size="icon"
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </nav>
  );
}
