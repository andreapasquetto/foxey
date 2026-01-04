import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { UpdatePlaceForm } from "@/modules/places/components/forms/update-place-form";
import {
  getAllPlaceCategories,
  getPlaceById,
} from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "Place Details",
};

export default async function UpdatePlacePage(props: {
  params: Promise<{ id: string }>;
}) {
  const id = (await props.params).id;
  const categories = await getAllPlaceCategories();
  const place = await getPlaceById(id);

  return (
    <div className="space-y-12">
      <Heading1>Edit Place</Heading1>
      <UpdatePlaceForm categories={categories} place={place} />
    </div>
  );
}
