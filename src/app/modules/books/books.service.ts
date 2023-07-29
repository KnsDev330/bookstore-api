import { FilterQuery, SortOrder } from "mongoose";
import IBook from "./books.interface.js";
import Book from "./books.model.js";
import { BadRequest, InternalServerError } from "../../../errors/ApiErrors.js";

const BookService = {
   create: async (bookData: IBook) => {
      const book = await Book.create(bookData);
      book.__v = undefined;
      return book;
   },


   getOneById: async (id: string) => {
      const book = await Book.findById(id, { __v: false });
      if (!book) throw new BadRequest(`Book not found with given ID`);
      return book;
   },


   updateOneById: async (id: string, book: Partial<IBook>) => {
      const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true, projection: { __v: false } });
      if (!updatedBook) throw new InternalServerError(`Could not update book, does the book exists?`);
      return updatedBook;
   },


   deleteOneById: async (id: string) => {
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) throw new InternalServerError(`Could not delete book, does the book exists?`);
      deletedBook.__v = undefined;
      return deletedBook;
   },


   getAll: async <T>(whereConditions: T, sortConditions: { [key: string]: SortOrder }, skip: number, limit: number) => {
      const newWhereCond = whereConditions as FilterQuery<IBook>;
      const result = await Book.find(newWhereCond, { __v: false }).sort(sortConditions).skip(skip).limit(limit);
      const total = await Book.countDocuments(newWhereCond);
      return { result, total };
   },
};

export default BookService;
