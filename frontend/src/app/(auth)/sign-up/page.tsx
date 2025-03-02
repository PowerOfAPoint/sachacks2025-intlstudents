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
import { SignUp, TSignUp } from "@/lib/validation/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const form = useForm<TSignUp>({
    resolver: zodResolver(SignUp),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: TSignUp) => {
    const { data, error } = await authClient.signUp.email({
      name: values.name,
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
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription className="">
            Get started with your personalized visa roadmap.
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
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="John Doe"
                        className="py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="py-2"
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
                      <Input type="password" className="py-2" {...field} />
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
                Sign Up
              </button>
            </form>
          </Form>

          <p className="text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
