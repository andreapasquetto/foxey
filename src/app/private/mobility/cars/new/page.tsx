import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateCarForm } from "@/modules/mobility/components/forms/create-car-form";

export const metadata: Metadata = {
  title: "New Car",
};

export default function NewCarPage() {
  return (
    <div className="space-y-12">
      <Heading1>Add car</Heading1>
      <CreateCarForm />
    </div>
  );
}
