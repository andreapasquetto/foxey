import { Plus, Shapes } from "lucide-react";
import Link from "next/link";
import { newPlaceRoute, placeCategoriesRoute } from "@/common/routes";
import { Button } from "@/components/ui/button";

export function PlacesActionButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-50 m-0 flex flex-col gap-2 sm:right-6 sm:bottom-6">
      <Button variant="outline" className="size-14 rounded-xl" asChild>
        <Link href={placeCategoriesRoute} prefetch>
          <Shapes className="size-6" />
        </Link>
      </Button>
      <Button className="size-14 rounded-xl" asChild>
        <Link href={newPlaceRoute} prefetch>
          <Plus className="size-6" />
        </Link>
      </Button>
    </div>
  );
}
