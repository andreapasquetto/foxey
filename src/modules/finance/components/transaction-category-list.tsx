"use client";

import { usePagination } from "@/common/hooks/use-pagination";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Pagination } from "@/components/pagination";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
        {categories.map((c) => {
          const [category, subCategory] = c.name.split("/");
          return (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle>
                  {subCategory ? (
                    <>
                      <span className="text-muted-foreground">
                        {category.trim()}
                      </span>{" "}
                      / {subCategory.trim()}
                    </>
                  ) : (
                    category
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>
      <Pagination {...pagination} />
    </div>
  );
}
