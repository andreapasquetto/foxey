import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { placeCategoriesGetAll } from "@/modules/places/places-actions";

export async function PlaceCategoryList(props: { query?: string }) {
  const categories = await placeCategoriesGetAll({
    query: props.query,
  });

  if (!categories.length) {
    return <EmptyStateMessage message="There are no categories." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {categories.slice(0, 10).map((c) => {
        const [category, subCategory] = c.name.split("/");
        return (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>
                {subCategory ? (
                  <>
                    <span className="text-muted-foreground">{category.trim()}</span> /{" "}
                    {subCategory.trim()}
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
  );
}
