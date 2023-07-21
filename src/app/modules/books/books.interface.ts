import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export default interface IBook extends Document {
   _id: string | ObjectId;
   user: ObjectId | string;
   title: string;
   author: string;
   genre: string;
   publicationDate: number;
   createdAt: string;
   updatedAt: string;
}


export const searchableFields: (keyof IBook)[] = ['title', 'author', 'genre'];
export const updateableFields: (keyof IBook)[] = ['title', 'author', 'genre', 'publicationDate'];
export const sortableFields: (keyof IBook)[] = ['title', 'author', 'genre', 'publicationDate'];