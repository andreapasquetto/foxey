import { IGNORE_DOB_YEAR } from "@/common/utils/dates";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact } from "@/db/types/contacts";
import { cn } from "@/lib/utils";
import { ArchiveContact } from "@/modules/contacts/components/dialogs/archive-contact";
import { DeleteContact } from "@/modules/contacts/components/dialogs/delete-contact";
import { UnarchiveContact } from "@/modules/contacts/components/dialogs/unarchive-contact";
import { differenceInYears, format, parseISO } from "date-fns";
import { Cake, MoreHorizontal } from "lucide-react";

export function ContactCard({ contact, today }: { contact: Contact; today: Date }) {
  const dob = contact.dob ? parseISO(contact.dob) : undefined;
  return (
    <Card key={contact.id} className="relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {contact.isArchived && <Badge variant="secondary">Archived</Badge>}
        <CopyToClipboardButton content={contact.id} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="size-5" />
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
        {dob && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Cake className="size-4" />
            {dob.getFullYear() === IGNORE_DOB_YEAR && <span>{format(dob, "dd MMMM")}</span>}
            {dob.getFullYear() !== IGNORE_DOB_YEAR && (
              <span>
                {format(dob, "dd MMMM y")} ({differenceInYears(today, dob)})
              </span>
            )}
          </div>
        )}
      </CardHeader>
    </Card>
  );
}
