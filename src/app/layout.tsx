import QueryProvider from "@/common/query-provider";
import { ThemeProvider } from "@/common/theme-provider";
import { NavbarDesktop, NavbarMobile } from "@/components/navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foxey",
  description: "Create (almost) everything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <TooltipProvider>
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

                    <div className="sm:hidden">
                      <ThemeToggle />
                    </div>
                  </header>
                  <main className="container p-4 sm:px-6 sm:py-0">{children}</main>
                </div>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
