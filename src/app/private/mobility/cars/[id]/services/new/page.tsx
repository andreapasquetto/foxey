import { Heading1 } from "@/components/typography";
import { ServiceCreateForm } from "@/modules/mobility/components/forms/service-create-form";
import { carsGetAll } from "@/modules/mobility/mobility-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Service",
};

export default async function ServiceCreatePage(props: { params: Promise<{ id: string }> }) {
  const carId = (await props.params).id;
  const cars = await carsGetAll();
  return (
    <div className="space-y-12">
      <Heading1>Add Service</Heading1>
      <ServiceCreateForm cars={cars} carId={carId} />
    </div>
  );
}
