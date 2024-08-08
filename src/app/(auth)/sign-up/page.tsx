'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signUpSchema } from "@/Schema/signup";



  

const SignUpForm = () => {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues:{
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (values:z.infer<typeof signUpSchema>) =>{
        console.log(values);
        
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                <Input placeholder="Enter your password" type="password"{...field} />
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
                <Input placeholder="Confirm Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        <Button className="w-full mt-6" type="submit">Sign Up</Button>
      </form>
      {/* <div className="'mx-auto my-4 flex w-full items-center justify-evenly before:mr- before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSingInButton>Sign up with Google</GoogleSingInButton> */}
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp; 
        <Link className="text-blue-500 hover:underline" href='/sign-in'>Sign in</Link>
      </p>
    </Form>
  )
}

export default SignUpForm