"use client";

import { startOfToday } from "date-fns";
import { usePagination } from "@/common/hooks/use-pagination";
import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Pagination } from "@/components/pagination";
import type { Contact } from "@/db/types/contacts";
import { ContactCard } from "@/modules/contacts/components/contact-item";

export function ContactList({
  contacts,
  total,
}: {
  contacts: Contact[];
  total: number;
}) {
  const pagination = usePagination(total);

  if (!contacts.length) {
    return <EmptyStateMessage message="There are no contacts." />;
  }

  const today = startOfToday();

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} today={today} />
        ))}
      </div>
      <Pagination {...pagination} />
    </div>
  );
}
