import { ReactNode } from "react";

export function Heading1({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}
