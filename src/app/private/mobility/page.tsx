import { newCarRoute } from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CarList } from "@/modules/mobility/components/car-list";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function MobilityPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Mobility</Heading1>
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <Link
          href={newCarRoute}
          className={cn(buttonVariants({ variant: "default" }), "h-14 w-14 rounded-xl")}
          prefetch
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      <section className="space-y-6">
        <CarList />
      </section>
    </div>
  );
}
