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
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      rating: {
         type: Number,
         required: true,
         default: 0
      },
      reviews: {
         type: Number,
         required: true,
         default: 0
      },
      image: {
         type: String,
         required: true
      }
   },
   {
      timestamps: true,
   }
);

const Book = model<IBook>("Book", BookSchema);
export default Book;
