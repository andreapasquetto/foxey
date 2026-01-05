"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId } from "react";
import { useSearchFilters } from "@/common/hooks/use-search-filters";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function SearchFilter({
  paramName = "query",
  placeholder = "Search...",
  id,
}: {
  paramName?: string;
  placeholder?: string;
  id?: string;
}) {
  const searchParams = useSearchParams();
  const { handleSearch } = useSearchFilters();

  const defaultId = useId();
  const inputId = id ?? defaultId;

  return (
    <InputGroup>
      <InputGroupInput
        id={inputId}
        placeholder={placeholder}
        defaultValue={searchParams.get(paramName)?.toString()}
        onChange={(e) => handleSearch({ [paramName]: e.target.value })}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
