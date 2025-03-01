"use client";

import { authClient } from "@/lib/auth/client";
import { redirect } from "@/app/api/_actions/redirect";

// for testing purposes

export const SignOutButton = () => {
  return (
    <button
      onClick={async () =>
        await authClient.signOut({
          fetchOptions: {
            onSuccess: async () => await redirect("/"),
          },
        })
      }
    >
      Sign out
    </button>
  );
};
