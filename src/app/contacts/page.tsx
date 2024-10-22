import { Heading1 } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { ContactList } from "@/modules/contacts/components/contact-list";
import { CreateContact } from "@/modules/contacts/components/create-contact";

export default function ContactsPage() {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <Heading1>Contacts</Heading1>
        <CreateContact />
      </div>
      <div className="mt-3">
        <Card className="pt-6">
          <CardContent>
            <ContactList />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
