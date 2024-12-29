"use client";

import { QueryPagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ArchiveContact } from "@/modules/contacts/components/dialogs/archive-contact";
import { DeleteContact } from "@/modules/contacts/components/dialogs/delete-contact";
import { UnarchiveContact } from "@/modules/contacts/components/dialogs/unarchive-contact";
import { useContactsPaginatedQuery } from "@/modules/contacts/contacts-queries";
import { Building, MoreHorizontal, User } from "lucide-react";

interface ContactListProps {
  searchFilter?: string;
  onlyArchived?: boolean;
}

export function ContactList(props: ContactListProps) {
  const query = useContactsPaginatedQuery({
    searchFilter: props.searchFilter,
    onlyArchived: props.onlyArchived,
  });

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
      <TableHead></TableHead>
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
        <Skeleton className="h-9 w-11" />
      </TableCell>
    </TableRow>
  ));
}
