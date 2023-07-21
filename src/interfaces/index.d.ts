/* eslint-disable no-unused-vars */
import Permission from "../utils/Permission.ts";
import IJwtUser from "./IJwtUser.ts";

declare global {
   namespace Express {
      interface Request {
         user?: IJwtUser;
         permission?: Permission;
      }
   }
}
