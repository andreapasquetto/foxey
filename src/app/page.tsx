import { privateRoute } from "@/common/routes";
import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto space-y-12 pt-24 text-center">
        <Heading1>Welcome to Foxey</Heading1>
        <div className="mx-auto flex max-w-sm items-center justify-center gap-3">
          <SignedIn>
            <Button asChild>
              <Link href={privateRoute}>Go to Private Area</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <SignUpButton />
            </Button>
            <Button variant="outline" asChild>
              <SignInButton />
            </Button>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
