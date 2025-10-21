import { paginationDefaults } from "@/common/pagination";
import { useState } from "react";
import { useSearchFilters } from "./use-search-filters";

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
  const searchFilters = useSearchFilters();
  const [page, setPage] = useState(paginationDefaults.page);
  const [pageSize, setPageSize] = useState(paginationDefaults.pageSize);

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
