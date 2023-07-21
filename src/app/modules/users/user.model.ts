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
            message: "Invalid role provided",
         },
      },
      dp: {
         type: String,
         required: true,
         default: '/dps/1.svg',
         enum: ['/dps/1.svg', '/dps/2.svg', '/dps/3.svg', '/dps/4.svg', '/dps/5.svg', '/dps/6.svg', '/dps/7.svg', '/dps/8.svg', '/dps/9.svg', '/dps/10.svg']
      }
   },
   {
      timestamps: true,
   }
);

export const User = model<IUser>("User", UserSchema);
