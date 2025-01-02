import { privateRoute } from "@/common/routes";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <SignUp forceRedirectUrl={privateRoute} />
    </main>
  );
}
