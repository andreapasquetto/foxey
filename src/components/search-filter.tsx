"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useId } from "react";
import { useSearchFilters } from "@/common/hooks/use-search-filters";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export function SearchFilter(props: {
  paramName?: string;
  id?: string;
  placeholder?: string;
}) {
  const searchParams = useSearchParams();
  const { handleSearch } = useSearchFilters();

  const defaultId = useId();
  const id = props.id ?? defaultId;
  const paramName = props.paramName ?? "query";

  return (
    <InputGroup>
      <InputGroupInput
        id={id}
        placeholder={props.placeholder ?? "Search..."}
        defaultValue={searchParams.get(paramName)?.toString()}
        onChange={(e) => handleSearch({ [paramName]: e.target.value })}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
