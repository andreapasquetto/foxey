import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArchiveContact } from "@/modules/contacts/components/dialogs/archive-contact";
import { DeleteContact } from "@/modules/contacts/components/dialogs/delete-contact";
import { UnarchiveContact } from "@/modules/contacts/components/dialogs/unarchive-contact";
import { contactsGetAll } from "@/modules/contacts/contacts-actions";
import { Building, MoreHorizontal, User } from "lucide-react";

export async function ContactList(props: { query?: string }) {
  const contacts = await contactsGetAll({
    query: props.query,
  });

  if (!contacts.length) {
    return <ComponentEmptyState />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Full name</TableHead>
          <TableHead>Date of birth</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id} className={cn({ "opacity-50": contact.isArchived })}>
            <TableCell>
              {contact.isBusiness ? (
                <Building className="h-5 w-5 text-muted-foreground" />
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
            </TableCell>
            <TableCell>
              {contact.fullName}
              {contact.subtitle && (
                <div className="text-xs text-muted-foreground">{contact.subtitle}</div>
              )}
            </TableCell>
            <TableCell>
              <code>{contact.dob}</code>
            </TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ComponentEmptyState() {
  return (
    <div className="my-6">
      <p className="text-center text-sm text-muted-foreground">There are no contacts.</p>
    </div>
  );
}
