import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import {
  getAllTags,
  getAllTransactionCategories,
  getAllWallets,
} from "@/modules/finance/server-actions";
import { CreateRefuelingForm } from "@/modules/mobility/components/forms/create-refueling-form";
import { getCarById } from "@/modules/mobility/server-actions";
import { getAllPlaces } from "@/modules/places/server-actions";

export const metadata: Metadata = {
  title: "New Refueling",
};

export default async function NewRefuelingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await getCarById(carId);
  const wallets = await getAllWallets();
  const categories = await getAllTransactionCategories();
  const places = await getAllPlaces();
  const tags = await getAllTags();
  return (
    <div className="space-y-12 pb-24">
      <Heading1>Add Refueling</Heading1>
      <CreateRefuelingForm
        car={car}
        wallets={wallets}
        categories={categories}
        places={places}
        tags={tags}
      />
    </div>
  );
}
