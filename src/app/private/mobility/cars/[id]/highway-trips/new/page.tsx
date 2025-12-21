import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import {
  tagsGetAll,
  transactionCategoriesGetAll,
  walletsGetAll,
} from "@/modules/finance/finance-actions";
import { HighwayTripCreateForm } from "@/modules/mobility/components/forms/highway-trip-create-form";
import { carsGetById } from "@/modules/mobility/mobility-actions";

export const metadata: Metadata = {
  title: "New Highway Trip",
};

export default async function HighwayTripCreatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await carsGetById(carId);
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();
  const tags = await tagsGetAll();

  return (
    <div className="space-y-12 pb-24">
      <Heading1>Add Highway Trip</Heading1>
      <HighwayTripCreateForm
        car={car}
        wallets={wallets}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
