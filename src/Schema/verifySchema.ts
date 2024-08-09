import { z } from "zod";

export const verifySchema = z.object({
  code: z
    .string()
    .min(2, { message: "Please enter a valid verification code" })
    .max(6, { message: "Please enter a valid verification code" }),
});
