import {
  ArrowRightLeft,
  Plus,
  Shapes,
  Tag,
  TextSelect,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import {
  newTagRoute,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FinanceActionButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-2 sm:right-6 sm:bottom-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="size-14 rounded-xl" asChild>
            <Link href={transactionCategoriesRoute}>
              <Shapes className="size-6" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Categories</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="size-14 rounded-xl" asChild>
            <Link href={transactionTemplatesRoute}>
              <TextSelect className="size-6" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Templates</TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button className="size-14 rounded-xl">
                <Plus className="size-6" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>New</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-[250px]">
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer items-center justify-between"
              asChild
            >
              <Link href={newTagRoute}>
                Add tag <Tag className="text-current" />
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer items-center justify-between"
              asChild
            >
              <Link href={newTransactionRoute}>
                Add transaction <ArrowRightLeft className="text-current" />
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full cursor-pointer items-center justify-between"
              asChild
            >
              <Link href={newWalletRoute}>
                Add wallet <Wallet className="text-current" />
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
