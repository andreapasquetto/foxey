"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Calendar, Car, Contact, Home, Landmark, Map, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    href: "/",
    icon: <Home className="h-5 w-5" />,
    title: "Home",
  },
  {
    href: "/accounting",
    icon: <Landmark className="h-5 w-5" />,
    title: "Accounting",
  },
  {
    href: "/cars",
    icon: <Car className="h-5 w-5" />,
    title: "Cars",
  },
  {
    href: "/contacts",
    icon: <Contact className="h-5 w-5" />,
    title: "Contacts",
  },
  {
    href: "/events",
    icon: <Calendar className="h-5 w-5" />,
    title: "Events",
  },
  {
    href: "/places",
    icon: <Map className="h-5 w-5" />,
    title: "Places",
  },
];

export function NavbarDesktop() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background py-5 sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2">
        {navigationItems.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-foreground text-accent"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.icon}
                <span className="sr-only">{item.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2">
        <ThemeToggle />
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                pathname === "/settings"
                  ? "bg-foreground text-accent"
                  : "text-accent-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

export function NavbarMobile() {
  const pathname = usePathname();
  return (
    <nav className="grid gap-6 text-lg font-medium">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-4 px-2.5 hover:text-foreground",
            pathname === item.href ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
