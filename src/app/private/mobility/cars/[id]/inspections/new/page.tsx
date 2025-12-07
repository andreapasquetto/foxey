import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { InspectionCreateForm } from "@/modules/mobility/components/forms/inspection-create-form";
import { carsGetById } from "@/modules/mobility/mobility-actions";

export const metadata: Metadata = {
  title: "New Inspection",
};

export default async function InspectionCreatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await carsGetById(carId);
  return (
    <div className="space-y-12">
      <Heading1>Add Inspection</Heading1>
      <InspectionCreateForm car={car} />
    </div>
  );
}
