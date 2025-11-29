"use client";

import { ArrowRightLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePagination } from "@/common/hooks/use-pagination";
import { transactionsRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import type { TransactionCategory } from "@/db/types/finance";

export function TransactionCategoryList({
  categories,
  total,
}: {
  categories: TransactionCategory[];
  total: number;
}) {
  const pagination = usePagination(total);

  if (!categories.length) {
    return <EmptyStateMessage message="There are no categories." />;
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {categories.map((category) => {
          const [parentName, name] = category.name.split("/");
          return (
            <Item key={category.id} variant="outline" className="relative">
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[250px]">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`${transactionsRoute}?category=${category.id}`}
                        className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                        target="_blank"
                        prefetch
                      >
                        See transactions <ArrowRightLeft className="size-5" />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ItemContent>
                <ItemTitle>
                  {name ? (
                    <>
                      <span className="text-muted-foreground">
                        {parentName.trim()}
                      </span>{" "}
                      / {name.trim()}
                    </>
                  ) : (
                    parentName
                  )}
                </ItemTitle>
              </ItemContent>
            </Item>
          );
        })}
      </div>
      <Pagination {...pagination} />
    </div>
  );
}
