import { z } from "zod";

export type TSignUp = z.infer<typeof SignUp>;
export const SignUp = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email(),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export type TSignIn = z.infer<typeof SignIn>;
export const SignIn = z.object({
  email: z.string().email(),
  password: z.string(),
});
