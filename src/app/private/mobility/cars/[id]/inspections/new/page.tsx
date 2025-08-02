import { Heading1 } from "@/components/typography";
import { InspectionCreateForm } from "@/modules/mobility/components/forms/inspection-create-form";
import { carsGetAll } from "@/modules/mobility/mobility-actions";

export default async function InspectionCreatePage(props: { params: Promise<{ id: string }> }) {
  const carId = (await props.params).id;
  const cars = await carsGetAll();
  return (
    <div className="space-y-12">
      <Heading1>Add Inspection</Heading1>
      <InspectionCreateForm cars={cars} carId={carId} />
    </div>
  );
}
