import { newContactRoute } from "@/common/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export function ContactsActionButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <Link
        href={newContactRoute}
        className={cn(buttonVariants({ variant: "default" }), "size-14 rounded-xl")}
        prefetch
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
}
