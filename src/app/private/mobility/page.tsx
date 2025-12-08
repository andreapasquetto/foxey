import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { newCarRoute } from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CarList } from "@/modules/mobility/components/car-list";

export const metadata: Metadata = {
  title: "Mobility",
};

export default function MobilityPage() {
  return (
    <div className="space-y-12 pb-24">
      <Heading1>Mobility</Heading1>
      <div className="fixed right-4 bottom-4 z-50 m-0 sm:right-6 sm:bottom-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="size-14 rounded-xl" asChild>
              <Link href={newCarRoute} prefetch>
                <Plus className="size-6" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New car</TooltipContent>
        </Tooltip>
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
        // biome-ignore lint/suspicious/noArrayIndexKey: <dummy component>
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
