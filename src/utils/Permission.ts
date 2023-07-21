import EUserRoles from "../enums/EUserRoles.js";
import { BadRequest, Unauthorized } from "../errors/ApiErrors.js";
import { ObjectId } from "mongodb";

class Permission {
   userId: string;
   userRole: string;

   constructor(userId: string, userRole: string) {
      this.userId = userId;
      this.userRole = userRole;
   }

   onlyAdmin = () => {
      if (this.userRole !== EUserRoles.ADMIN)
         throw new Unauthorized(`You don't have permission to do that`);
   }

   userAndAdmin = (resourceUserId: string | ObjectId) => {
      if (typeof resourceUserId !== 'string') resourceUserId = resourceUserId.toString();
      if (resourceUserId !== this.userId && this.userRole !== EUserRoles.ADMIN)
         throw new Unauthorized(`You don't have permission to do that.`);
   }

   checkUpdateFields = (payload: { [key: string]: any }, updateableFields: string[]) => {
      for (const key in payload) {
         if (!updateableFields.includes(key))
            throw new BadRequest(`You cannot update ${key} field`);
      }
   }
}

export default Permission;