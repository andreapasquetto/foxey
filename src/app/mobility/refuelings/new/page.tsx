import { Heading1 } from "@/components/typography";
import { RefuelingCreateForm } from "@/modules/mobility/components/forms/refueling-create-form";

export default function RefuelingCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>Add Refueling</Heading1>
      <RefuelingCreateForm />
    </div>
  );
}
