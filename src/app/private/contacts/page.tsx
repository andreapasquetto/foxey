import { newContactRoute } from "@/common/routes";
import { SearchFilter } from "@/components/search-filter";
import { Heading1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ContactList } from "@/modules/contacts/components/contact-list";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ContactsPage(props: { searchParams?: Promise<{ query?: string }> }) {
  const query = (await props.searchParams)?.query;
  return (
    <div className="space-y-12 pb-20">
      <Heading1>Contacts</Heading1>
      <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 sm:right-6 sm:bottom-6">
        <Link
          href={newContactRoute}
          className={cn(buttonVariants({ variant: "default" }), "h-14 w-14 rounded-xl")}
          prefetch
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      <section className="space-y-6">
        <div className="w-[250px]">
          <SearchFilter id="contact-search" />
        </div>
        <ContactList query={query} />
      </section>
    </div>
  );
}
