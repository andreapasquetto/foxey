import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CarCreateForm } from "@/modules/mobility/components/forms/car-create-form";

export const metadata: Metadata = {
  title: "New Car",
};

export default function CarCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>Add car</Heading1>
      <CarCreateForm />
    </div>
  );
}
