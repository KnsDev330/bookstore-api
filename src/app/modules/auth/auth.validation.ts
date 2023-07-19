import env from "../../../config/env.js";
import { z } from "zod";

const AuthZodSchema = {

   /* Zod schema for validating user login request */
   login: z.object({
      email: z
         .string({ required_error: "Email is require" })
         .email(),
      password: z
         .string({ required_error: "Password is require" })
         .min(env.PASSWORD_MIN_LENGTH)
         .max(env.PASSWORD_MAX_LENGTH),
   }),

   /* Zod schema for validating user signup request */
   signUp: z.object({
      name: z
         .string({ required_error: "Name is require" })
         .min(3)
         .max(64),
      email: z
         .string({ required_error: "Email is require" })
         .email(),
      password: z
         .string({ required_error: "Password is require" })
         .min(env.PASSWORD_MIN_LENGTH)
         .max(env.PASSWORD_MAX_LENGTH),
   }),

   /* Zod schema for validating user refresh token request */
   refreshToken: z.object({
      cookies: z.object({
         refreshToken: z.string({
            required_error: "Refresh Token is required",
         }),
      }),
   }),
};

export default AuthZodSchema;
