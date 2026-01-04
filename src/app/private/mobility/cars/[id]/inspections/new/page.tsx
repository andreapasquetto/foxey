import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateInspectionForm } from "@/modules/mobility/components/forms/create-inspection-form";
import { getCarById } from "@/modules/mobility/server-actions";

export const metadata: Metadata = {
  title: "New Inspection",
};

export default async function NewInspectionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await getCarById(carId);
  return (
    <div className="space-y-12">
      <Heading1>Add Inspection</Heading1>
      <CreateInspectionForm car={car} />
    </div>
  );
}
