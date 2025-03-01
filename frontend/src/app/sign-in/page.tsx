"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignIn, TSignIn } from "@/lib/validation/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export default function SignInPage() {
  const form = useForm<TSignIn>({
    resolver: zodResolver(SignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: TSignIn) => {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/dashboard",
    });

    if (error) {
      toast.error("An error occurred", {
        description: error.message,
      });
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left Side - Branding + Value Prop */}
      <div className="relative xl:w-2/3 md:w-1/2 sm:flex hidden flex-col justify-center items-center p-12 space-y-8">
        <h1 className="text-4xl font-extrabold">welcome back to flock</h1>
        <p className="text-lg text-muted-foreground max-w-md text-center leading-relaxed">
          Sign in to access your personalized visa & career roadmap.
        </p>
        {/* Optional - Background Gradient */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-black/5 pointer-events-none"></div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="min-h-screen flex items-center justify-center flex-1">
        <div className="w-full max-w-md border-neutral-500 space-y-6 rounded-lg p-8 shadow-lg border mx-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Sign In to Your Account</h1>
            <p className="text-muted-foreground">
              Welcome back! Enter your details below.
            </p>
          </div>

          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="block rounded-md px-4 py-2 placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        className="rounded-md px-4 py-2 placeholder-gray-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className={cn(
                  "w-full rounded-md bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-500 transition justify-center flex",
                  {
                    "opacity-50": form.formState.isSubmitting,
                  },
                )}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="size-6 mr-2 animate-spin" />
                )}
                Sign In
              </button>
            </form>
          </Form>

          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-400 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
