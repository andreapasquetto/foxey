import { Heading1 } from "@/components/typography";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PrivateHome() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="space-y-12">
      <Heading1>Hi, {user.fullName ?? user.username ?? "Mysterious User"}</Heading1>
    </div>
  );
}
