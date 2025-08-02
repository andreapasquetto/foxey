import { Heading1 } from "@/components/typography";
import { PlaceCreateForm } from "@/modules/places/components/forms/place-create-form";
import { placeCategoriesGetAll } from "@/modules/places/places-actions";

export default async function PlaceCreatePage() {
  const categories = await placeCategoriesGetAll();

  return (
    <div className="space-y-12">
      <Heading1>New Place</Heading1>
      <PlaceCreateForm categories={categories} />
    </div>
  );
}
