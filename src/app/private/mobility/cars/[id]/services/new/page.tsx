import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateServiceForm } from "@/modules/mobility/components/forms/create-service-form";
import { getCarById } from "@/modules/mobility/server-actions";

export const metadata: Metadata = {
  title: "New Service",
};

export default async function NewServicePage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await getCarById(carId);
  return (
    <div className="space-y-12">
      <Heading1>Add Service</Heading1>
      <CreateServiceForm car={car} />
    </div>
  );
}
