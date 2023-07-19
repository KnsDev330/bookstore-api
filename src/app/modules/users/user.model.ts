import { Schema, model } from "mongoose";
import IUser from "./user.interface.js";
import EUserRoles from "../../../enums/EUserRoles.js";

export const UserSchema = new Schema<IUser>(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
      },
      name: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: EUserRoles,
         default: EUserRoles.USER,
         validate: {
            validator: function (this: any, value: string) {
               return value === EUserRoles.USER;
            },
            message: 'Invalid role provided'
         }
      }
   },
   {
      timestamps: true,
   }
);

export const User = model<IUser>("User", UserSchema);
