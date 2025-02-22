"use client";

import { carRoute } from "@/common/routes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCarsGetAllQuery } from "@/modules/mobility/mobility-queries";
import Link from "next/link";

export function CarList() {
  const query = useCarsGetAllQuery();

  if (!query.data) {
    return <ComponentSkeleton />;
  }

  const cars = query.data;

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
            <CardContent></CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function ComponentSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
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
