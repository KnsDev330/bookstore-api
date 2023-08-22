import mongoose from "mongoose";
import IReview from "../reviews.interface.js";
import Review from "../reviews.model.js";
import { User } from "../../users/user.model.js";
import UserService from "../../users/user.service.js";
import BookService from "../../books/books.service.js";
import Book from "../../books/books.model.js";

export const create = async (userId: string, payload: IReview) => {
   const user = await UserService.getOneById(userId);
   const dbBook = await BookService.getOneById(payload.bookId as string);
   payload.bookId = dbBook._id;
   payload.userId = user._id;
   payload.userDp = user.dp;
   payload.userName = user.name;
   const newRating = Number((((dbBook.rating * dbBook.reviews) + payload.rating) / (dbBook.reviews + 1)).toFixed(1));
   const session = await mongoose.startSession();
   session.startTransaction();
   try {
      const review = await Review.create(payload);
      review.__v = undefined;
      await User.findByIdAndUpdate(payload.userId, { $inc: { 'counters.reviews': 1 } });
      await Book.findByIdAndUpdate(payload.bookId, { $inc: { reviews: 1 }, $set: { rating: newRating } })
      return review;
   }
   catch (e) {
      await session.abortTransaction();
      await session.endSession();
      throw e;
   }
}