import { Request, Response } from "express";
import catchAsync from "../../../utils/catchASync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { SortOrder } from "mongoose";
import EHttpCodes from "../../../enums/EHttpCodes.js";
import BookZodSchema from "./books.validation.js";
import BookService from "./books.service.js";
import IBook, { searchableFields } from "./books.interface.js";
import Utils, { sleep } from "../../../utils/utils.js";
import EUserRoles from "../../../enums/EUserRoles.js";
import { BadRequest } from "../../../errors/ApiErrors.js";
import ISortOrder from "interfaces/ISortOrder.js";
import { ObjectId } from "mongodb";

const BooksController = {
   create: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const book: IBook = req.body;
      await BookZodSchema.create.parseAsync(book);
      book.userId = req.user!.id;
      const result = await BookService.create(book);
      sendResponse(res, EHttpCodes.CREATED, true, "Book created successfully", result);
   }),

   deleteOne: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const id = req.params.id;
      const dbBook = await BookService.getOneById(id);
      Utils.checkPermission(req.user!, dbBook.userId as string, EUserRoles.ADMIN);
      const result = await BookService.deleteOneById(id);
      sendResponse(res, EHttpCodes.OK, true, "Book deleted successfully", result);
   }),

   getAll: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const {
         searchTerm,
         page: rawPage,
         limit: rawLimit,
         sortBy: rawSortBy,
         sortOrder: rawSortOrder,
         ...filtersData
      } = req.query;

      const page = Number(rawPage || 1);
      const limit = Number(rawLimit || 10);
      const skip = (page - 1) * limit;
      const sortBy = rawSortBy || "createdAt";
      const sortOrder = rawSortOrder || "desc";

      const andConditions = [];

      if (searchTerm) {
         andConditions.push({
            $or: searchableFields.map((field) => ({
               [field]: {
                  $regex: searchTerm,
                  $options: "i",
               },
            })),
         });
      }

      if (Object.keys(filtersData).length) {
         andConditions.push({
            $and: Object.entries(filtersData).map(
               ([
                  field,
                  value,
               ]) => {
                  if (searchableFields.includes(field as keyof IBook)) return { [field]: value };
               }
            ),
         });
      }

      const sortConditions: { [key: string]: SortOrder } = {};
      if (sortBy && sortOrder) {
         sortConditions[sortBy as string] = sortOrder as SortOrder;
      }

      const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
      const { result, total } = await BookService.getAll(whereConditions, sortConditions, skip, limit);
      sendResponse(res, EHttpCodes.OK, true, "Books fetched successfully", result, undefined, undefined, { limit, page, total, pages: Math.ceil(total / limit) });
   }),

   getAllMy: catchAsync(async (req: Request, res: Response) => {
      await sleep();
      const { page, limit, skip, sortBy, sortOrder } = Utils.pageLimit(req.query);
      const sortConditions: ISortOrder = { [sortBy as string]: sortOrder as SortOrder }

      const { result, total } = await BookService.getAll<Partial<IBook>>({ userId: new ObjectId(req.user!.id) }, sortConditions, skip, limit);
      sendResponse(res, EHttpCodes.OK, true, "Books fetched successfully", result, undefined, undefined, { limit, page, total, pages: Math.ceil(total / limit) });
   }),

   getOne: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const result = await BookService.getOneById(req.params.id);
      sendResponse(res, EHttpCodes.OK, true, "Book fetched successfully", result);
   }),

   updateOne: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const id = req.params.id;
      const dbBook = await BookService.getOneById(id);

      Utils.checkPermission(req.user!, dbBook.userId, EUserRoles.ADMIN);

      const payload = req.body as Partial<IBook>;
      if (!payload) throw new BadRequest("Updated book data must be sent in request body");
      await BookZodSchema.update.parseAsync(payload);

      const result = await BookService.updateOneById(id, payload);
      sendResponse(res, EHttpCodes.OK, true, "Book updated successfully", result);
   }),
};

export default BooksController;
