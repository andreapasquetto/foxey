import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TransactionCategoryListWithFilters } from "@/modules/accounting/components/transaction-category-list-with-filters";
import { Plus, SquareStack } from "lucide-react";
import Link from "next/link";

export default function TransactionCategoriesPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Transaction Categories</Heading1>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-xl">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 w-[250px] sm:mr-6">
            <DropdownMenuItem asChild>
              <Link
                href="/accounting/categories/new"
                className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
              >
                Add category <SquareStack className="h-5 w-5" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <section className="space-y-6">
        <TransactionCategoryListWithFilters />
      </section>
    </div>
  );
}
