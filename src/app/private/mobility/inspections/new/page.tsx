import { Heading1 } from "@/components/typography";
import { InspectionCreateForm } from "@/modules/mobility/components/forms/inspection-create-form";

export default function InspectionCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>Add Inspection</Heading1>
      <InspectionCreateForm />
    </div>
  );
}
