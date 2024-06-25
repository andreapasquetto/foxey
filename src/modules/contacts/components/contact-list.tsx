"use client";

import { CircularSpinner } from "@/components/circular-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContactsQuery } from "@/modules/contacts/contacts-queries";
import { Building, CheckIcon, User, XIcon } from "lucide-react";

export function ContactList() {
  const { data: contacts, isFetching } = useContactsQuery();

  if (!contacts || isFetching) return <CircularSpinner className="mx-auto" />;

  if (!contacts.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">There are no contacts.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Full name</TableHead>
          <TableHead>Date of birth</TableHead>
          <TableHead>Archived</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
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
            <TableCell>{contact.dob ?? "-"}</TableCell>
            <TableCell>
              {contact.isArchived ? (
                <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
              ) : (
                <XIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
