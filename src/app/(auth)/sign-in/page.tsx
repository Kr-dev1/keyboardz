'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';


import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSingInButton";
import { signinSchema } from "@/Schema/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";





const SignInForm = () => {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  });
  const onSubmit = (values: z.infer<typeof signinSchema>) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" type="email" {...field} />
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
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">Sign in</Button>
      </form>
      {/* <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp; 
        <Link className="text-blue-500 hover:underline" href='/sign-up'>Sign up</Link>
      </p>
    </Form>
  )
}

export default SignInForm
