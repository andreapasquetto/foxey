import {
  contactsRoute,
  eventsRoute,
  financeRoute,
  mobilityRoute,
  placesRoute,
  privateRoute,
} from "@/common/routes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import { Calendar, Car, CircleDollarSign, Contact, Map, Menu, PocketKnife } from "lucide-react";
import Link from "next/link";

const navigationItems = [
  {
    href: mobilityRoute,
    icon: <Car className="size-5" />,
    title: "Mobility",
  },
  {
    href: financeRoute,
    icon: <CircleDollarSign className="size-5" />,
    title: "Finance",
  },
  {
    href: contactsRoute,
    icon: <Contact className="size-5" />,
    title: "Contacts",
  },
  {
    href: eventsRoute,
    icon: <Calendar className="size-5" />,
    title: "Events",
  },
  {
    href: placesRoute,
    icon: <Map className="size-5" />,
    title: "Places",
  },
];

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-background sm:space-y-6">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50 sm:px-6">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" asChild>
            <Link href={privateRoute}>
              <PocketKnife className="size-5" />
              <span className="sr-only">homepage</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="size-5" />
                <span className="sr-only">main menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="ml-2 w-[250px]">
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 sm:h-10"
                    prefetch
                  >
                    {item.title} {item.icon}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger: "size-10",
            },
          }}
          fallback={<Skeleton className="size-7 rounded-full" />}
        />
      </header>
      <main className="container mx-auto p-4 sm:px-6 sm:py-0">{children}</main>
    </div>
  );
}
