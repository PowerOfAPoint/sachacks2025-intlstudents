import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { Auth } from ".";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL, // the base url of your auth server
  plugins: [inferAdditionalFields<Auth>()],
});
