import { SignOutButton } from "./_logout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Dashboard() {
  const user = await auth.api.getSession({ headers: await headers() });
  if (!user) redirect("/sign-in");

  return (
    <div>
      <SignOutButton />

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
