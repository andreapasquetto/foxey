import { Paginate, Paginated, paginationDefaults } from "@/common/pagination";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type UsePaginatedQueryOptions<TData> = Omit<UseQueryOptions<Paginated<TData>>, "queryFn"> & {
  queryFn: (paginate: Paginate) => Promise<Paginated<TData>>;
};

export type UsePaginatedQueryResult<T> = UseQueryResult<Paginated<T>> & {
  pagination: {
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
};

export function usePaginatedQuery<T>(
  options: UsePaginatedQueryOptions<T>,
): UsePaginatedQueryResult<T> {
  const [page, setPage] = useState(paginationDefaults.page);
  const [pageSize, setPageSize] = useState(paginationDefaults.pageSize);
  const [total, setTotal] = useState(0);

  const pageStartIndex = page * pageSize;
  const pageEndIndex = Math.min(pageStartIndex + pageSize, total);

  const isPrevPageDisabled = pageStartIndex === 0;
  const isNextPageDisabled = pageEndIndex === total;

  function changePageSize(pageSize: number) {
    setPage(paginationDefaults.page);
    setPageSize(pageSize);
  }

  function goFirstPage() {
    setPage(paginationDefaults.page);
  }

  function goPrevPage() {
    if (isPrevPageDisabled) return;
    setPage(page - 1);
  }

  function goNextPage() {
    if (isNextPageDisabled) return;
    setPage(page + 1);
  }

  function goLastPage() {
    setPage(Math.ceil(total / pageSize) - 1);
  }

  const query = useQuery({
    ...options,
    queryFn: () => options.queryFn({ page, pageSize }),
    queryKey: [options.queryKey, page, pageSize],
  });

  useEffect(() => {
    if (query.data) {
      setTotal(query.data.total);
    }
  }, [query.data, setTotal]);

  return {
    ...query,
    pagination: {
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
    },
  };
}
