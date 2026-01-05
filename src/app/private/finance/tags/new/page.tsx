import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateTagForm } from "@/modules/finance/components/forms/create-tag-form";

export const metadata: Metadata = {
  title: "New Tag",
};

export default async function NewTagPage() {
  return (
    <div className="space-y-12 pb-24">
      <Heading1>New Tag</Heading1>
      <CreateTagForm />
    </div>
  );
}
