import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { ContactList } from "@/modules/contacts/components/contact-list";
import { ContactsActionButtons } from "@/modules/contacts/components/contacts-action-buttons";

export default async function ContactsPage(props: { searchParams?: Promise<{ query?: string }> }) {
  const query = (await props.searchParams)?.query;
  return (
    <div className="space-y-12 pb-24">
      <Heading1>Contacts</Heading1>
      <ContactsActionButtons />
      <section className="space-y-6">
        <div className="w-full sm:w-[250px]">
          <SearchFilter id="contact-search" />
        </div>
        <ContactList query={query} />
      </section>
    </div>
  );
}
