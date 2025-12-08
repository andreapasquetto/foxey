import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { pageSizeDefaults } from "@/common/pagination";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Pagination({
  pageSize,
  total,
  pageStartIndex,
  pageEndIndex,
  isPrevPageDisabled,
  isNextPageDisabled,
  changePageSize,
  goFirstPage,
  goPrevPage,
  goNextPage,
  goLastPage,
}: {
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
}) {
  return (
    <nav className="flex items-center justify-end bg-background px-4 py-3 text-muted-foreground sm:px-6">
      <div className="flex h-full items-center justify-end space-x-4">
        <div className="hidden text-sm font-medium sm:block">
          <span>Results per page</span>
        </div>
        <Select
          onValueChange={(value) => changePageSize(parseInt(value, 10))}
          value={pageSize.toString()}
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
              {`${Math.min(total, pageStartIndex + 1)}-${pageEndIndex} of ${total}`}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isPrevPageDisabled}
                  onClick={goFirstPage}
                  variant="outline"
                  size="icon"
                >
                  <ChevronsLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>First Page</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isPrevPageDisabled}
                  onClick={goPrevPage}
                  variant="outline"
                  size="icon"
                >
                  <ChevronLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous Page</TooltipContent>
            </Tooltip>
          </ButtonGroup>
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isNextPageDisabled}
                  onClick={goNextPage}
                  variant="outline"
                  size="icon"
                >
                  <ChevronRight />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Page</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isNextPageDisabled}
                  onClick={goLastPage}
                  variant="outline"
                  size="icon"
                >
                  <ChevronsRight />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Last Page</TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
    </nav>
  );
}
