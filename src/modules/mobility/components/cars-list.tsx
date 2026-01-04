import Link from "next/link";
import { carRoute } from "@/common/routes";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { getAllCars } from "@/modules/mobility/server-actions";

export async function CarsList() {
  const cars = await getAllCars();

  if (!cars.length) {
    return <EmptyStateMessage message="There are no cars." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <Link key={car.id} href={carRoute(car.id)} prefetch>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>
                {car.make} {car.model}
              </ItemTitle>
              <ItemDescription>{car.year}</ItemDescription>
            </ItemContent>
          </Item>
        </Link>
      ))}
    </div>
  );
}
