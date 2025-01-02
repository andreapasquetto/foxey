import { NavbarDesktop, NavbarMobile } from "@/components/navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { ReactNode } from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <NavbarDesktop />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50 sm:static sm:h-auto sm:border-0 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <NavbarMobile />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-3 sm:hidden">
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
        <main className="container p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </div>
  );
}
