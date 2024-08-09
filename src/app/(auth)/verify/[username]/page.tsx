"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/Schema/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Page = () => {
  const { toast } = useToast();
  const { username } = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = axios.post("/api/verify", { code: data.code, username });
      toast({
        title: "Success",
        description: "Verification successful",
      });
      router.replace("/");
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center h-[94vh] bg-gray-100">
      <div>
        <p className="text-lg">
          Please enter the verification code sent to your email
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-8 text-xl"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter verification code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-6 w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
