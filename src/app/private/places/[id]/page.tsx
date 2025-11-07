import { Heading1 } from "@/components/typography";
import { PlaceUpdateForm } from "@/modules/places/components/forms/place-update-form";
import { placeCategoriesGetAll, placesGetById } from "@/modules/places/places-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Place Details",
};

export default async function PlaceUpdatePage(props: { params: Promise<{ id: string }> }) {
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
