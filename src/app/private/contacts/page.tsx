import type { Metadata } from "next";
import { fromUrlToPaginate } from "@/common/pagination";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { ContactList } from "@/modules/contacts/components/contact-list";
import { ContactsActionButtons } from "@/modules/contacts/components/contacts-action-buttons";
import { contactsGetPaginated } from "@/modules/contacts/contacts-actions";

export const metadata: Metadata = {
  title: "Contacts",
};

export default async function ContactsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string; size?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { query, page, size } = searchParams ?? {};

  const { records, total } = await contactsGetPaginated({
    paginate: fromUrlToPaginate({ page, size }),
    query,
  });
  return (
    <div className="space-y-12 pb-24">
      <Heading1>Contacts</Heading1>
      <ContactsActionButtons />
      <section className="space-y-6">
        <div className="w-full sm:w-[250px]">
          <SearchFilter id="contact-search" />
        </div>
        <ContactList contacts={records} total={total} />
      </section>
    </div>
  );
}
