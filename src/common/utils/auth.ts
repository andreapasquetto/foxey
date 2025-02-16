import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserId() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("User is not logged in");
  }
  return session.userId;
}
