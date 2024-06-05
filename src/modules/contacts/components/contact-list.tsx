import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockedContacts } from "@/mocks/contacts";
import { Building, User } from "lucide-react";

export function ContactList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Full name</TableHead>
          <TableHead>Date of birth</TableHead>
          <TableHead>Emails</TableHead>
          <TableHead>Phone numbers</TableHead>
          <TableHead>Addresses</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockedContacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>
              {contact.isOrganization ? (
                <Building className="h-5 w-5 text-muted-foreground" />
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
            </TableCell>
            <TableCell>
              {contact.name.given} {contact.name.family}
            </TableCell>
            <TableCell>{contact.dateOfBirth ?? "-"}</TableCell>
            <TableCell>
              {contact.emails.length ? (
                <ul>
                  {contact.emails.map((email) => (
                    <li key={email.value}>
                      {email.value}
                      <div className="text-xs text-muted-foreground">{email.type}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {contact.phoneNumbers.length ? (
                <ul>
                  {contact.phoneNumbers.map((phoneNumber) => (
                    <li key={phoneNumber.value}>
                      {phoneNumber.value}
                      <div className="text-xs text-muted-foreground">{phoneNumber.type}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {contact.addresses.length ? (
                <ul>
                  {contact.addresses.map((address) => (
                    <li key={address.value}>
                      {address.value}
                      <div className="text-xs text-muted-foreground">{address.type}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
