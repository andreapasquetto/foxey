import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreatePlaceForm } from "@/modules/places/components/forms/create-place-form";
import { getAllPlaceCategories } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "New Place",
};

export default async function NewPlacePage() {
  const categories = await getAllPlaceCategories();

  return (
    <div className="space-y-12">
      <Heading1>New Place</Heading1>
      <CreatePlaceForm categories={categories} />
    </div>
  );
}
