/* eslint-disable no-console */
import bcrypt from "bcrypt";
import env from "../config/env.js";
import { Unauthorized } from "../errors/ApiErrors.js";

const PasswordUtils = {
   /* Hash a plain password */
   hashPassword: async (password: string): Promise<string> => {
      const hashedPassword = await bcrypt.hash(password, env.PASSWORD_SALT_ROUNDS);
      return hashedPassword;
   },

   /* Compare plain password with hashed password */
   comparePassword: async (password: string, hashedPassword: string): Promise<boolean> => {
      try {
         return await bcrypt.compare(password, hashedPassword);
      } catch (e) {
         console.log(e);
         return false;
      }
   },

   /* Validate plain password with hashed password */
   validatePassword: async (password: string, hashedPassword: string): Promise<void> => {
      if (!(await PasswordUtils.comparePassword(password, hashedPassword))) throw new Unauthorized("Invalid password");
   },
};

export default PasswordUtils;
