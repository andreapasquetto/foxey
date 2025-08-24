import { newTransactionCategoryRoute, newTransactionRoute, newWalletRoute } from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRightLeft, Plus, Shapes, Wallet } from "lucide-react";
import Link from "next/link";

export function FinanceActionButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 sm:right-6 sm:bottom-6">
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
              href={newTransactionCategoryRoute}
              className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
            >
              Add category <Shapes className="size-5" />
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
