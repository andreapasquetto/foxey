"use client";

import { Heading1 } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { PlacesList } from "@/modules/places/components/places-list";

export default function PlacesPage() {
  return (
    <section>
      <Heading1>Places</Heading1>

      <div className="mt-3">
        <Card className="pt-6">
          <CardContent>
            <PlacesList />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
