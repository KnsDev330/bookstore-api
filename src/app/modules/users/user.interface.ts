import EUserRoles from "enums/EUserRoles.js";
import { Document } from "mongoose";

export default interface IUser extends Document {
   _id: string;
   name: string;
   email: string;
   password?: string;
   role: EUserRoles;
   createdAt: string;
   updateddAt: string;
}
