/* eslint-disable no-unused-vars */
import IJwtUser from "./IJwtUser.ts";

declare global {
   namespace Express {
      interface Request {
         user?: IJwtUser;
      }
   }
}
