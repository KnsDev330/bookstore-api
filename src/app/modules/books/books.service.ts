import { SortOrder } from "mongoose";
import IBook from "./books.interface.js";
import Book from "./books.model.js";
import { BadRequest, InternalServerError } from "../../../errors/ApiErrors.js";

const BookService = {
   /* create a new book */
   create: async (bookData: IBook) => {
      const book = await Book.create(bookData);
      book.__v = undefined;
      return book;
   },

   /* get a single book */
   getSingleBookById: async (id: string) => {
      const book = await Book.findById(id, { __v: false });
      if (!book) throw new BadRequest(`Book not found with given ID`);
      return book;
   },

   /* update single book */
   updateSingleBookById: async (id: string, book: Partial<IBook>) => {
      const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true, projection: { __v: false } });
      if (!updatedBook) throw new InternalServerError(`Could not update book, does the book exists?`);
      return updatedBook;
   },

   /* delete single book */
   deleteSingleBookById: async (id: string) => {
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) throw new InternalServerError(`Could not delete book, does the book exists?`);
      deletedBook.__v = undefined;
      return deletedBook;
   },

   /* get all books */
   getAllBooks: async (
      whereConditions: any,
      sortConditions: { [key: string]: SortOrder },
      skip: number,
      limit: number
   ) => {
      const result = await Book.find(whereConditions, { __v: false }).sort(sortConditions).skip(skip).limit(limit);
      const total = await Book.countDocuments(whereConditions);
      return { result, total };
   },
};

export default BookService;
