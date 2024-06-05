import { Heading1 } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { ContactList } from "@/modules/contacts/components/contact-list";

export default function ContactsPage() {
  return (
    <section>
      <Heading1>Contacts</Heading1>

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
