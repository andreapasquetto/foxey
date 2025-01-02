import { Heading1 } from "@/components/typography";
import { HighwayTripCreateForm } from "@/modules/mobility/components/forms/highway-trip-create-form";

export default function HighwayTripCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>Add Highway Trip</Heading1>
      <HighwayTripCreateForm />
    </div>
  );
}
