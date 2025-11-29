import { currentUser } from "@clerk/nextjs/server";
import { Slot } from "@radix-ui/react-slot";
import {
  Calendar,
  Car,
  CircleDollarSign,
  Contact,
  MapPinned,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  contactsRoute,
  eventsRoute,
  financeRoute,
  mobilityRoute,
  placesRoute,
  signInRoute,
} from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

const navigationItems = [
  {
    href: contactsRoute,
    icon: <Contact />,
    title: "Contacts",
  },
  {
    href: eventsRoute,
    icon: <Calendar />,
    title: "Events",
  },
  {
    href: financeRoute,
    icon: <CircleDollarSign />,
    title: "Finance",
  },
  {
    href: mobilityRoute,
    icon: <Car />,
    title: "Mobility",
  },
  {
    href: placesRoute,
    icon: <MapPinned />,
    title: "Places",
  },
];

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function PrivateHome() {
  const user = await currentUser();

  if (!user) {
    redirect(signInRoute);
  }

  return (
    <div className="space-y-12">
      <Heading1>
        Hi {user.fullName ?? user.username ?? "Mysterious User"}
      </Heading1>
      <div className="mx-auto max-w-md space-y-3">
        {navigationItems.map((item) => (
          <Item key={item.href} variant="outline" asChild>
            <Link href={item.href}>
              <ItemMedia variant="icon">
                <Slot>{item.icon}</Slot>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </div>
    </div>
  );
}
