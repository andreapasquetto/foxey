import { Heading1 } from "@/components/typography";
import { PlaceUpdateForm } from "@/modules/places/components/forms/place-update-form";
import { placeCategoriesGetAll, placesGetById } from "@/modules/places/places-actions";

interface PlaceUpdatePageProps {
  params: Promise<{ id: string }>;
}

export default async function PlaceUpdatePage(props: PlaceUpdatePageProps) {
  const id = (await props.params).id;
  const categories = await placeCategoriesGetAll();
  const place = await placesGetById(id);

  return (
    <div className="space-y-12">
      <Heading1>Edit Place</Heading1>
      <PlaceUpdateForm categories={categories} place={place} />
    </div>
  );
}
