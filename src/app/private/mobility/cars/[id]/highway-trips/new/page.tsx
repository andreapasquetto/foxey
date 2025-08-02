import { Heading1 } from "@/components/typography";
import { walletsGetAll } from "@/modules/finance/finance-actions";
import { HighwayTripCreateForm } from "@/modules/mobility/components/forms/highway-trip-create-form";
import { carsGetAll } from "@/modules/mobility/mobility-actions";

export default async function HighwayTripCreatePage(props: { params: Promise<{ id: string }> }) {
  const carId = (await props.params).id;
  const cars = await carsGetAll();
  const wallets = await walletsGetAll();

  return (
    <div className="space-y-12">
      <Heading1>Add Highway Trip</Heading1>
      <HighwayTripCreateForm cars={cars} wallets={wallets} carId={carId} />
    </div>
  );
}
