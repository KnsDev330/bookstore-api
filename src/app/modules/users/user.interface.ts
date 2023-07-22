import EUserRoles from "enums/EUserRoles.js";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export default interface IUser extends Document {
   _id: ObjectId | string;
   role: EUserRoles;
   name: string;
   email: string;
   password?: string;
   dp: string;
   counters: {
      reads: number;
      books: number;
      reviews: number;
   }
   createdAt: string;
   updatedAt: string;
}

export const searchableFields: (keyof IUser)[] = ['name', 'email', '_id'];
export const updateableFields: (keyof IUser)[] = ['name', 'email', 'password', 'dp'];
export const sortableFields: (keyof IUser)[] = ['createdAt'];