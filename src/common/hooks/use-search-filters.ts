import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(values: Record<string, string | number | undefined>) {
    const params = new URLSearchParams(searchParams);

    for (const [paramName, query] of Object.entries(values)) {
      if (query === undefined || query === "") {
        params.delete(paramName);
      } else {
        params.set(paramName, String(query));
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return { handleSearch };
}
