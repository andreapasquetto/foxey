import {
  contactsRoute,
  eventsRoute,
  financeRoute,
  mobilityRoute,
  placesRoute,
  privateRoute,
} from "@/common/routes";
import { ThemeToggle } from "@/components/theme-toggle";
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
import { ReactNode } from "react";

const navigationItems = [
  {
    href: mobilityRoute,
    icon: <Car className="h-5 w-5" />,
    title: "Mobility",
  },
  {
    href: financeRoute,
    icon: <CircleDollarSign className="h-5 w-5" />,
    title: "Finance",
  },
  {
    href: contactsRoute,
    icon: <Contact className="h-5 w-5" />,
    title: "Contacts",
  },
  {
    href: eventsRoute,
    icon: <Calendar className="h-5 w-5" />,
    title: "Events",
  },
  {
    href: placesRoute,
    icon: <Map className="h-5 w-5" />,
    title: "Places",
  },
];

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-background sm:space-y-6">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50 sm:px-6">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" asChild>
            <Link href={privateRoute}>
              <PocketKnife className="h-5 w-5" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
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
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              elements: {
                userButtonTrigger: "h-10 w-10",
              },
            }}
            fallback={<Skeleton className="h-7 w-7 rounded-full" />}
          />
        </div>
      </header>
      <main className="container p-4 sm:px-6 sm:py-0">{children}</main>
    </div>
  );
}
