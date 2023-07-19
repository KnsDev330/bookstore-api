import { Schema, model } from "mongoose";
import IBook from "./books.interface.js";

export const BookSchema = new Schema<IBook>(
   {
      title: {
         type: String,
         required: true,
      },
      author: {
         type: String,
         required: true,
      },
      genre: {
         type: String,
         required: true,
      },
      publicationDate: {
         type: Number,
         required: true,
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      }
   },
   {
      timestamps: true,
   }
);

const Book = model<IBook>("Book", BookSchema);
export default Book;
