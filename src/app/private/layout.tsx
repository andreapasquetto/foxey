import { privateRoute } from "@/common/routes";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserButton } from "@clerk/nextjs";
import { PocketKnife } from "lucide-react";
import Link from "next/link";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-background sm:space-y-6">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur supports-[backdrop-filter]:bg-background/50 sm:px-6">
        <Button size="icon" variant="ghost" asChild>
          <Link href={privateRoute}>
            <PocketKnife className="size-5" />
            <span className="sr-only">homepage</span>
          </Link>
        </Button>
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
