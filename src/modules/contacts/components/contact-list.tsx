"use client";

import { QueryPagination } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DeleteContact } from "@/modules/contacts/components/delete-contact";
import { useContactsPaginatedQuery } from "@/modules/contacts/contacts-queries";
import { Building, User } from "lucide-react";

export function ContactList() {
  const query = useContactsPaginatedQuery();

  if (!query.data) {
    return (
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          <TableRowsSkeleton />
        </TableBody>
      </Table>
    );
  }

  const contacts = query.data.records;

  if (!contacts.length) {
    return (
      <div className="my-6">
        <p className="text-center text-sm text-muted-foreground">There are no contacts.</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
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
              <TableCell>{contact.dob}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <DeleteContact contact={contact} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <QueryPagination query={query} />
    </div>
  );
}

function TableHeaderRow() {
  return (
    <TableRow>
      <TableHead></TableHead>
      <TableHead>Full name</TableHead>
      <TableHead>Date of birth</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  );
}

function TableRowsSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <div className="flex items-center">
          <Skeleton className="aspect-square h-5" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-60" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-end">
          <Skeleton className="aspect-square h-10" />
        </div>
      </TableCell>
    </TableRow>
  ));
}
