import { Plus, Shapes, TextSelect } from "lucide-react";
import Link from "next/link";
import {
  newTransactionRoute,
  newTransactionTemplateRoute,
  transactionCategoriesRoute,
} from "@/common/routes";
import { Button } from "@/components/ui/button";

export function TransactionsActionButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-2 sm:right-6 sm:bottom-6">
      <Button variant="outline" className="size-14 rounded-xl" asChild>
        <Link href={newTransactionTemplateRoute}>
          <TextSelect className="size-6" />
        </Link>
      </Button>
      <Button variant="outline" className="size-14 rounded-xl" asChild>
        <Link href={transactionCategoriesRoute}>
          <Shapes className="size-6" />
        </Link>
      </Button>
      <Button className="size-14 rounded-xl" asChild>
        <Link href={newTransactionRoute} prefetch>
          <Plus className="size-6" />
        </Link>
      </Button>
    </div>
  );
}
