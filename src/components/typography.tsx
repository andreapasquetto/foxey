import { ReactNode } from "react";

export function Heading1({ children }: { children: ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>
  );
}

export function Heading2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
}
