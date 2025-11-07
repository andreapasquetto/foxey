import { Heading1 } from "@/components/typography";
import { ContactCreateForm } from "@/modules/contacts/components/forms/contact-create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Contact",
};

export default function ContactCreatePage() {
  return (
    <div className="space-y-12">
      <Heading1>New Contact</Heading1>
      <ContactCreateForm />
    </div>
  );
}
