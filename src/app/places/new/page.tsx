import { Heading1 } from "@/components/typography";
import { PlaceCreateForm } from "@/modules/places/components/place-create-form";

export default function PlaceCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>New Place</Heading1>
      <PlaceCreateForm />
    </div>
  );
}
