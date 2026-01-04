import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { CreateContactForm } from "@/modules/contacts/components/forms/create-contact-form";

export const metadata: Metadata = {
  title: "New Contact",
};

export default function NewContactPage() {
  return (
    <div className="space-y-12 pb-24">
      <Heading1>New Contact</Heading1>
      <CreateContactForm />
    </div>
  );
}
