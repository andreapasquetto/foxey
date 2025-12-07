import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import {
  transactionCategoriesGetAll,
  walletsGetAll,
} from "@/modules/finance/finance-actions";
import { RefuelingCreateForm } from "@/modules/mobility/components/forms/refueling-create-form";
import { carsGetById } from "@/modules/mobility/mobility-actions";
import { placesGetAll } from "@/modules/places/places-actions";

export const metadata: Metadata = {
  title: "New Refueling",
};

export default async function RefuelingCreatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await carsGetById(carId);
  const wallets = await walletsGetAll();
  const categories = await transactionCategoriesGetAll();
  const places = await placesGetAll();
  return (
    <div className="space-y-12">
      <Heading1>Add Refueling</Heading1>
      <RefuelingCreateForm
        car={car}
        wallets={wallets}
        categories={categories}
        places={places}
      />
    </div>
  );
}
