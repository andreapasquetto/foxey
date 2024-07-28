import { Heading1 } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { AddPlace } from "@/modules/places/components/add-place";
import { PlaceList } from "@/modules/places/components/place-list";

export default function PlacesPage() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <Heading1>Places</Heading1>
        <AddPlace />
      </div>
      <div className="mt-3">
        <Card className="pt-6">
          <CardContent>
            <PlaceList />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
