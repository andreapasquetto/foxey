"use client";

import { usePagination } from "@/common/hooks/use-pagination";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Pagination } from "@/components/pagination";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import type { PlaceCategory } from "@/db/types/places";

export function PlaceCategoriesList({
  categories,
  total,
}: {
  categories: PlaceCategory[];
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
            <Item key={c.id} variant="outline">
              <ItemContent>
                <ItemTitle>
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
