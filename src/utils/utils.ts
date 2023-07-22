import IJwtUser from "../interfaces/IJwtUser.js";
import { BadRequest, Unauthorized } from "../errors/ApiErrors.js";
import { ObjectId } from "mongodb";


export const sleep = (ms: number = 600) => new Promise(r => setTimeout(() => r(''), ms));
export const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const Utils = {
   checkPermission: (user: IJwtUser, resourceUserId: string | ObjectId, ...allowedRoles: string[]): void => {
      if (typeof resourceUserId !== 'string')
         resourceUserId = resourceUserId.toString();
      if (user.id !== resourceUserId && !allowedRoles.includes(user.role)) throw new Unauthorized();
   },

   validateUpdateableFields: (updateableFieilds: string[], payload: { [key: string]: any }): void => {
      for (const key in payload) {
         if (!updateableFieilds.includes(key))
            throw new BadRequest(`You cannot update '${key}' field /or is not updateable`);
      }
   },


   pageLimit: (query: { [key: string]: any }): { page: number, limit: number, skip: number, sortBy: string, sortOrder: string } => {
      const {
         page: rawPage,
         limit: rawLimit,
         sortBy: rawSortBy,
         sortOrder: rawSortOrder,
      } = query;
      const page = Number(rawPage || 1);
      const limit = Number(rawLimit || 10);
      const skip = (page - 1) * limit;
      const sortBy = rawSortBy || "createdAt";
      const sortOrder = rawSortOrder || "desc";
      return { page, limit, skip, sortBy, sortOrder }
   }
};

export default Utils;
