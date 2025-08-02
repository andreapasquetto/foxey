import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { placeCategoriesGetAll } from "@/modules/places/places-actions";

export async function PlaceCategoryList(props: { query?: string }) {
  const categories = await placeCategoriesGetAll({
    query: props.query,
  });

  if (!categories.length) {
    return <ComponentEmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.slice(0, 10).map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">There are no categories.</p>
    </div>
  );
}
