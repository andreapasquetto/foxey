import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { ServiceCreateForm } from "@/modules/mobility/components/forms/service-create-form";
import { carsGetById } from "@/modules/mobility/mobility-actions";

export const metadata: Metadata = {
  title: "New Service",
};

export default async function ServiceCreatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const carId = (await props.params).id;
  const car = await carsGetById(carId);
  return (
    <div className="space-y-12">
      <Heading1>Add Service</Heading1>
      <ServiceCreateForm car={car} />
    </div>
  );
}
