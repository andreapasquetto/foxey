import type { Metadata } from "next";
import { Heading1 } from "@/components/typography";
import { ContactCreateForm } from "@/modules/contacts/components/forms/contact-create-form";

export const metadata: Metadata = {
  title: "New Contact",
};

export default function ContactCreatePage() {
  return (
    <div className="space-y-12 pb-24">
      <Heading1>New Contact</Heading1>
      <ContactCreateForm />
    </div>
  );
}
