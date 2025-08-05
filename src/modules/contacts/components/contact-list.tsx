import { EmptyStateMessage } from "@/components/empty-state/empty-state-message";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArchiveContact } from "@/modules/contacts/components/dialogs/archive-contact";
import { DeleteContact } from "@/modules/contacts/components/dialogs/delete-contact";
import { UnarchiveContact } from "@/modules/contacts/components/dialogs/unarchive-contact";
import { contactsGetAll } from "@/modules/contacts/contacts-actions";
import { differenceInYears, format, startOfToday } from "date-fns";
import { Cake, Check, MoreHorizontal, X } from "lucide-react";

export async function ContactList(props: { query?: string }) {
  const contacts = await contactsGetAll({
    query: props.query,
  });

  if (!contacts.length) {
    return <EmptyStateMessage message="There are no contacts." />;
  }

  const today = startOfToday();

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {contacts.slice(0, 10).map((contact) => (
        <Card key={contact.id} className="relative">
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-full border px-2 py-1 text-xs text-muted-foreground">
              <>
                {contact.isArchived ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <X className="size-4 text-red-500" />
                )}
                Archived
              </>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[250px]">
                <DropdownMenuItem asChild>
                  {contact.isArchived ? (
                    <UnarchiveContact contact={contact} />
                  ) : (
                    <ArchiveContact contact={contact} />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <DeleteContact contact={contact} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardHeader>
            {contact.subtitle && <CardDescription>{contact.subtitle}</CardDescription>}
            <CardTitle className={cn(contact.isArchived && "text-muted-foreground")}>
              {contact.fullName}
            </CardTitle>
            {contact.dob && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Cake className="size-4" />
                {format(contact.dob, "dd MMMM y")} ({differenceInYears(today, contact.dob)})
              </div>
            )}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
