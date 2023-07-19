import { Schema } from "mongoose";

export default interface IBook {
   _id: string;
   user: Schema.Types.ObjectId | string;
   title: string;
   author: string;
   genre: string;
   publicationDate: number;
   createdAt: string;
   updateddAt: string;
}

export const bookSeacrableFields: (keyof IBook)[] = ['title', 'author', 'genre', 'publicationDate'];