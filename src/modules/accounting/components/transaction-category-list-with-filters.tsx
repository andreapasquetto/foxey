"use client";

import { Input } from "@/components/ui/input";
import { TransactionCategoryList } from "@/modules/accounting/components/transaction-category-list";
import { useState } from "react";

export function TransactionCategoryListWithFilters() {
  const [searchFilter, setSearchFilter] = useState<string>("");

  return (
    <>
      <div className="flex-wrap items-center gap-3 space-y-3 sm:flex sm:space-y-0">
        <div className="shrink-0 sm:w-[250px]">
          <Input
            id="searchTransactionCategory"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      <TransactionCategoryList searchFilter={searchFilter} />
    </>
  );
}
