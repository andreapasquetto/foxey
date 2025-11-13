import {
  contactsRoute,
  eventsRoute,
  financeRoute,
  mobilityRoute,
  placesRoute,
  signInRoute,
} from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Slot } from "@radix-ui/react-slot";
import { Calendar, Car, CircleDollarSign, Contact, MapPinned } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

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
      <Heading1>Hi {user.fullName ?? user.username ?? "Mysterious User"}</Heading1>
      <div className="mx-auto max-w-xl grid-cols-3 space-y-2 sm:grid">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn("col-span-2 block", index % 2 === 0 ? "col-end-3" : "col-start-2")}
          >
            <Card className="group transition-colors hover:border-foreground">
              <CardHeader
                className={cn(
                  "flex items-center justify-between",
                  index % 2 === 1 && "sm:flex-row-reverse",
                )}
              >
                <CardTitle>{item.title}</CardTitle>
                <Slot className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground sm:size-8">
                  {item.icon}
                </Slot>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
