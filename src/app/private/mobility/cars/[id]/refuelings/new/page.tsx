import { Heading1 } from "@/components/typography";
import { walletsGetAll } from "@/modules/finance/finance-actions";
import { RefuelingCreateForm } from "@/modules/mobility/components/forms/refueling-create-form";
import { carsGetAll } from "@/modules/mobility/mobility-actions";
import { placesGetAll } from "@/modules/places/places-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Refueling",
};

export default async function RefuelingCreatePage(props: { params: Promise<{ id: string }> }) {
  const carId = (await props.params).id;
  const cars = await carsGetAll();
  const wallets = await walletsGetAll();
  const places = await placesGetAll();
  return (
    <div className="space-y-12">
      <Heading1>Add Refueling</Heading1>
      <RefuelingCreateForm cars={cars} wallets={wallets} places={places} carId={carId} />
    </div>
  );
}
