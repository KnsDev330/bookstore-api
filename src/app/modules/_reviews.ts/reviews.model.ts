import { Schema, model } from "mongoose";
import IReview from "./reviews.interface.js";

export const ReviewsSchema = new Schema<IReview>(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      book: {
         type: Schema.Types.ObjectId,
         ref: "Book",
         required: true,
      },
      userName: {
         type: String,
         required: true,
      },
      userDp: {
         type: String,
         required: true
      },
      rating: {
         type: Number,
         required: true,
         min: 1,
         max: 5,
      },
      comment: {
         type: String,
         required: false,
         default: null
      }
   },
   {
      timestamps: true,
   }
);

const Review = model<IReview>("Review", ReviewsSchema);
export default Review;
