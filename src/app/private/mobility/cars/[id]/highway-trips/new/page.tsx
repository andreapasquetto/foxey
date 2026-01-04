import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import {
  getAllTags,
  getAllTransactionCategories,
  getAllWallets,
} from "@/modules/finance/server-actions";
import { CreateHighwayTripForm } from "@/modules/mobility/components/forms/create-highway-trip-form";
import { getCarById } from "@/modules/mobility/server-actions";

export const metadata: Metadata = {
  title: "New Highway Trip",
};

export default async function NewHighwayTripPage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await getCarById(carId);
  const wallets = await getAllWallets();
  const categories = await getAllTransactionCategories();
  const tags = await getAllTags();

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Add Highway Trip</Heading1>
      <CreateHighwayTripForm
        car={car}
        wallets={wallets}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
