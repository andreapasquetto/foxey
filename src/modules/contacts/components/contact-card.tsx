import { differenceInYears, format, parseISO } from "date-fns";
import {
  Building,
  Cake,
  CircleUser,
  ExternalLink,
  Mail,
  MapPinHouse,
  MoreHorizontal,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { phoneNumberFormatter } from "@/common/formatters";
import { IGNORE_DOB_YEAR } from "@/common/utils/dates";
import { buildGoogleMapsUrlWithAddress } from "@/common/utils/places";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type {
  Contact,
  ContactAddress,
  ContactEmail,
  ContactPhoneNumber,
} from "@/db/types/contacts";
import { cn } from "@/lib/utils";
import { ArchiveContact } from "@/modules/contacts/components/dialogs/archive-contact";
import { DeleteContact } from "@/modules/contacts/components/dialogs/delete-contact";
import { UnarchiveContact } from "@/modules/contacts/components/dialogs/unarchive-contact";

export function ContactCard({
  contact,
  today,
}: {
  contact: Contact;
  today: Date;
}) {
  const dob = contact.dob ? parseISO(contact.dob) : undefined;
  return (
    <Item key={contact.id} variant="outline" className="relative">
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
      <ItemContent>
        {contact.subtitle && (
          <ItemDescription>{contact.subtitle}</ItemDescription>
        )}
        <ItemTitle
          className={cn(
            "flex items-center gap-2",
            contact.isArchived && "text-muted-foreground",
          )}
        >
          {contact.isBusiness ? (
            <Building className="size-4" />
          ) : (
            <CircleUser className="size-4" />
          )}
          {contact.fullName}
        </ItemTitle>
        {dob && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Cake className="size-4" />
            {dob.getFullYear() === IGNORE_DOB_YEAR && (
              <span>{format(dob, "dd MMMM")}</span>
            )}
            {dob.getFullYear() !== IGNORE_DOB_YEAR && (
              <span>
                {format(dob, "dd MMMM y")} ({differenceInYears(today, dob)})
              </span>
            )}
          </div>
        )}
        <Accordion type="multiple" className="w-full">
          <AccordionItem
            value="phone-numbers"
            disabled={!contact.phoneNumbers.length}
          >
            <AccordionTrigger className="text-muted-foreground hover:cursor-pointer hover:text-foreground hover:no-underline">
              <div className="flex items-center gap-2">
                <Phone className="size-4" />
                Phone numbers ({contact.phoneNumbers.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {contact.phoneNumbers.map((phoneNumber) => (
                <PhoneNumberAccordionItem
                  key={phoneNumber.id}
                  phoneNumber={phoneNumber}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="emails" disabled={!contact.emails.length}>
            <AccordionTrigger className="text-muted-foreground hover:cursor-pointer hover:text-foreground hover:no-underline">
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                Emails ({contact.emails.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {contact.emails.map((email) => (
                <EmailAccordionItem key={email.id} email={email} />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="addresses" disabled={!contact.addresses.length}>
            <AccordionTrigger className="text-muted-foreground hover:cursor-pointer hover:text-foreground hover:no-underline">
              <div className="flex items-center gap-2">
                <MapPinHouse className="size-4" />
                Addresses ({contact.addresses.length})
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {contact.addresses.map((address) => (
                <AddressAccordionItem key={address.id} address={address} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ItemContent>
    </Item>
  );
}

function PhoneNumberAccordionItem({
  phoneNumber,
}: {
  phoneNumber: ContactPhoneNumber;
}) {
  const phoneNumberFormatted = phoneNumberFormatter(
    phoneNumber.value,
  )!.formatInternational();
  return (
    <div>
      {phoneNumber.isArchived && (
        <p
          className={cn(
            phoneNumber.isArchived && "text-muted-foreground line-through",
          )}
        >
          {phoneNumberFormatted}
        </p>
      )}
      {!phoneNumber.isArchived && (
        <Link
          href={`tel:${phoneNumber.value}`}
          className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          {phoneNumberFormatted}
        </Link>
      )}
    </div>
  );
}

function EmailAccordionItem({ email }: { email: ContactEmail }) {
  return (
    <div>
      {email.isArchived && (
        <p
          className={cn(
            email.isArchived && "text-muted-foreground line-through",
          )}
        >
          {email.value}
        </p>
      )}
      {!email.isArchived && (
        <Link
          href={`mailto:${email.value}`}
          className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          {email.value}
        </Link>
      )}
    </div>
  );
}

function AddressAccordionItem({ address }: { address: ContactAddress }) {
  return (
    <div>
      {address.isArchived && (
        <p
          className={cn(
            address.isArchived && "text-muted-foreground line-through",
          )}
        >
          {address.value}
        </p>
      )}
      {!address.isArchived && (
        <Link
          href={buildGoogleMapsUrlWithAddress(address.value)}
          target="_blank"
          className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          {address.value}
          <ExternalLink className="size-4" />
        </Link>
      )}
    </div>
  );
}
