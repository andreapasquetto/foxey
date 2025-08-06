import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(paramName: string, query: string | undefined) {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set(paramName, query);
    } else {
      params.delete(paramName);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return { handleSearch };
}
