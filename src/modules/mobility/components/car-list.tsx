import { carRoute } from "@/common/routes";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { carsGetAll } from "@/modules/mobility/mobility-actions";
import Link from "next/link";

export async function CarList() {
  const cars = await carsGetAll();

  if (!cars.length) {
    return <ComponentEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <Link key={car.id} href={carRoute(car.id)} prefetch>
          <Card>
            <CardHeader>
              <CardTitle>
                {car.make} {car.model}
              </CardTitle>
              <CardDescription>{car.year}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">There are no cars.</p>
    </div>
  );
}
