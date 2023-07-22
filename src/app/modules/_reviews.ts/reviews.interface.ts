import { ObjectId } from "mongodb";
import { Document } from "mongoose";


export default interface IReview extends Document {
   _id: string | ObjectId;
   userId: ObjectId | string;
   bookId: ObjectId | string;
   userName: string;
   userDp: string;
   rating: number;
   comment: string | null;
   createdAt: string;
   updatedAt: string;
}


export const searchableFields: (keyof IReview)[] = [];
export const updateableFields: (keyof IReview)[] = ['comment', 'rating'];
export const sortableFields: (keyof IReview)[] = ['createdAt', 'updatedAt', 'rating'];