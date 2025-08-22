import { newCarRoute } from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CarList } from "@/modules/mobility/components/car-list";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function MobilityPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Mobility</Heading1>
      <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
        <Link
          href={newCarRoute}
          className={cn(buttonVariants({ variant: "default" }), "h-14 w-14 rounded-xl")}
          prefetch
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      <section className="space-y-6">
        <Suspense fallback={<CarListSkeleton />}>
          <CarList />
        </Suspense>
      </section>
    </div>
  );
}

function CarListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
