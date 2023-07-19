import env from "../../../config/env.js";
import { z } from "zod";

const UserZodSchema = {
   /* Zod schema for validating user creation request */
   update: z.object({
      name: z.string({ required_error: "Name is require" }).min(3).max(64).optional(),
      email: z.string({ required_error: "Email is require" }).email().optional(),
      password: z
         .string({ required_error: "Password is require" })
         .min(env.PASSWORD_MIN_LENGTH)
         .max(env.PASSWORD_MAX_LENGTH)
         .optional(),
   }),
};

export default UserZodSchema;
