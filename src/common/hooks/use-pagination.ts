import { useSearchFilters } from "@/common/hooks/use-search-filters";
import { fromUrlToPaginate, paginationDefaults } from "@/common/pagination";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export type UsePaginationResult = {
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
};

export function usePagination(total: number): UsePaginationResult {
  const searchParams = useSearchParams();
  const searchFilters = useSearchFilters();

  const initialValues = fromUrlToPaginate({
    page: searchParams.get("page") ?? undefined,
    size: searchParams.get("size") ?? undefined,
  });

  const [page, setPage] = useState(initialValues.page);
  const [pageSize, setPageSize] = useState(initialValues.pageSize);

  const pageStartIndex = page * pageSize;
  const pageEndIndex = Math.min(pageStartIndex + pageSize, total);

  const isPrevPageDisabled = pageStartIndex === 0;
  const isNextPageDisabled = pageEndIndex === total;

  function changePageSize(pageSize: number) {
    setPage(paginationDefaults.page);
    setPageSize(pageSize);
    searchFilters.handleSearch({
      page: undefined,
      size: pageSize === paginationDefaults.pageSize ? undefined : pageSize,
    });
  }

  function goFirstPage() {
    setPage(paginationDefaults.page);
    searchFilters.handleSearch({
      page: undefined,
    });
  }

  function goPrevPage() {
    if (isPrevPageDisabled) return;
    const newPage = page - 1;
    setPage(newPage);
    searchFilters.handleSearch({ page: newPage === paginationDefaults.page ? undefined : newPage });
  }

  function goNextPage() {
    if (isNextPageDisabled) return;
    const newPage = page + 1;
    setPage(newPage);
    searchFilters.handleSearch({ page: newPage });
  }

  function goLastPage() {
    const newPage = Math.ceil(total / pageSize) - 1;
    setPage(newPage);
    searchFilters.handleSearch({ page: newPage });
  }

  return {
    page,
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
  };
}
