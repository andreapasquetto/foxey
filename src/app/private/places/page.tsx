import { newPlaceRoute, placeCategoriesRoute } from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlaceListWithFilters } from "@/modules/places/components/place-list-with-filters";
import { Plus, Shapes } from "lucide-react";
import Link from "next/link";

export default function PlacesPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Places</Heading1>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <Link
          href={placeCategoriesRoute}
          className={cn(buttonVariants({ variant: "outline" }), "h-14 w-14 rounded-xl")}
          prefetch
        >
          <Shapes className="h-6 w-6" />
        </Link>
        <Link
          href={newPlaceRoute}
          className={cn(buttonVariants({ variant: "default" }), "h-14 w-14 rounded-xl")}
          prefetch
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      <section>
        <PlaceListWithFilters />
      </section>
    </div>
  );
}
