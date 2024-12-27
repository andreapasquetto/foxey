import { Heading1 } from "@/components/typography";
import { ContactListWithFilters } from "@/modules/contacts/components/contact-list-with-filters";

export default function ContactsPage() {
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Contacts</Heading1>
      <section className="space-y-6">
        <ContactListWithFilters />
      </section>
    </div>
  );
}
