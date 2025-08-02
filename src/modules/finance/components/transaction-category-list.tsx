import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoriesGetAll } from "@/modules/finance/finance-actions";

export async function TransactionCategoryList(props: { query?: string }) {
  const categories = await transactionCategoriesGetAll({
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
