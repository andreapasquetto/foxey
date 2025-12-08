import { Plus } from "lucide-react";
import Link from "next/link";
import { newContactRoute } from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ContactsActionButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="size-14 rounded-xl" asChild>
            <Link href={newContactRoute} prefetch>
              <Plus className="size-6" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>New</TooltipContent>
      </Tooltip>
    </div>
  );
}
