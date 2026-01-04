import type { Metadata } from "next";
import { fromUrlToPaginate } from "@/common/pagination";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { ContactsActionButtons } from "@/modules/contacts/components/contacts-action-buttons";
import { ContactsList } from "@/modules/contacts/components/contacts-list";
import { getPaginatedContacts } from "@/modules/contacts/server-actions";

export const metadata: Metadata = {
  title: "Contacts",
};

export default async function ContactsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string; size?: string }>;
}) {
  const searchParams = await props.searchParams;
  const { query, page, size } = searchParams ?? {};

  const { records, total } = await getPaginatedContacts({
    paginate: fromUrlToPaginate({ page, size }),
    query,
  });
  return (
    <div className="space-y-12 pb-24">
      <Heading1>Contacts</Heading1>
      <ContactsActionButtons />
      <section className="space-y-6">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <SearchFilter />
        </div>
        <ContactsList contacts={records} total={total} />
      </section>
    </div>
  );
}
