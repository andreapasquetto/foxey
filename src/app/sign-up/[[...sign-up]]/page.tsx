import { SignUp } from "@clerk/nextjs";
import { privateRoute } from "@/common/routes";

export default function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <SignUp forceRedirectUrl={privateRoute} />
    </main>
  );
}
