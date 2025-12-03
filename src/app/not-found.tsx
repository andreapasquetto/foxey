import Link from "next/link";
import { Heading1 } from "@/components/typography";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container mx-auto space-y-12 pt-24 text-center">
      <code className="text-muted-foreground">404</code>
      <Heading1>Not Found</Heading1>
      <p>Could not find the requested resource.</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </main>
  );
}
