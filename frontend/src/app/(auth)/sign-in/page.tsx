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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="min-h-screen flex items-center justify-center flex-1">
      <Card className="max-w-md mx-6 w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In to Your Account</CardTitle>
          <CardDescription className="">
            Welcome back! Enter your details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      <Input
                        type="email"
                        className="py-2"
                        placeholder="you@example.com"
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
                      <Input className="py-2" type="password" {...field} />
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

          <p className="text-sm text-muted-foreground mt-2">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
