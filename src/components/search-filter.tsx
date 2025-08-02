"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";

export function SearchFilter(props: { paramName?: string; id?: string; placeholder?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultId = useId();
  const id = props.id ?? defaultId;
  const paramName = props.paramName ?? "query";

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set(paramName, query);
    } else {
      params.delete(paramName);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Input
      id={id}
      placeholder={props.placeholder ?? "Search..."}
      defaultValue={searchParams.get(paramName)?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
