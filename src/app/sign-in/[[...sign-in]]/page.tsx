import { SignIn } from "@clerk/nextjs";
import { privateRoute } from "@/common/routes";

export default function SignInPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <SignIn forceRedirectUrl={privateRoute} />
    </main>
  );
}
