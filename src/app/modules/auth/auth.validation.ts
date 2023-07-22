import env from "../../../config/env.js";
import { z } from "zod";

const AuthZodSchema = {
   login: z.object({
      email: z.string({ required_error: "Email is required" }).email(),
      password: z
         .string({ required_error: "Password is required" })
         .min(env.PASSWORD_MIN_LENGTH)
         .max(env.PASSWORD_MAX_LENGTH),
   }),

   signUp: z.object({
      name: z.string({ required_error: "Name is required" }).min(3).max(64),
      email: z.string({ required_error: "Email is required" }).email(),
      password: z
         .string({ required_error: "Password is required" })
         .min(env.PASSWORD_MIN_LENGTH)
         .max(env.PASSWORD_MAX_LENGTH),
   }),

   refreshToken: z.object({
      cookies: z.object({
         refreshToken: z.string({
            required_error: "Refresh Token is required",
         }),
      }),
   }),
};

export default AuthZodSchema;
