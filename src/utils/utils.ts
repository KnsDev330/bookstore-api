import IJwtUser from "../interfaces/IJwtUser.js";
import { Unauthorized } from "../errors/ApiErrors.js";

const Utils = {
   checkPermission: (user: IJwtUser, resourceUserId: string, ...allowedRoles: string[]): void => {
      if (user.id !== resourceUserId && !allowedRoles.includes(user.role))
         throw new Unauthorized();
   }
};

export default Utils;