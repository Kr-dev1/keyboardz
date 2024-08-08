"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/Schema/signupSchema";
import axios, { AxiosError } from "axios";
import { Apiresponse } from "@/types/Apiresponse";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<Apiresponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.error("Error in singup of user");
      const axiosError = error as AxiosError<Apiresponse>;
      let errorMessage =
        axiosError.response?.data.message ?? "Error in singup of user";
      toast({
        title: "SignUp failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[94vh] bg-gray-100">
      <Form {...form}>
        <form className="px-36 w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-6" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait!
              </>
            ) : (
              "SignUp"
            )}
          </Button>
        </form>
        {/* <div className="'mx-auto my-4 flex w-full items-center justify-evenly before:mr- before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSingInButton>Sign up with Google</GoogleSingInButton> */}
        <p className="text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
