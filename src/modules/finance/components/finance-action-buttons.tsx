import { ArrowRightLeft, Plus, Shapes, TextSelect, Wallet } from "lucide-react";
import Link from "next/link";
import {
  newTransactionRoute,
  newWalletRoute,
  transactionCategoriesRoute,
  transactionTemplatesRoute,
} from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FinanceActionButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-2 sm:right-6 sm:bottom-6">
      <Button variant="outline" className="size-14 rounded-xl" asChild>
        <Link href={transactionCategoriesRoute}>
          <Shapes className="size-6" />
        </Link>
      </Button>
      <Button variant="outline" className="size-14 rounded-xl" asChild>
        <Link href={transactionTemplatesRoute}>
          <TextSelect className="size-6" />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-14 rounded-xl">
            <Plus className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 w-[250px] sm:mr-6">
          <DropdownMenuItem asChild>
            <Link
              href={newTransactionRoute}
              className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
            >
              Add transaction <ArrowRightLeft className="size-5" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={newWalletRoute}
              className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
            >
              Add wallet <Wallet className="size-5" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
