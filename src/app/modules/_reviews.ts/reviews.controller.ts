import { Request, Response } from "express";
import catchAsync from "../../../utils/catchASync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { SortOrder } from "mongoose";
import EHttpCodes from "../../../enums/EHttpCodes.js";
import Utils from "../../../utils/utils.js";
import EUserRoles from "../../../enums/EUserRoles.js";
import { BadRequest } from "../../../errors/ApiErrors.js";
import ReviewsService from "./reviews.service.js";
import ReviewZodSchema from "./reviews.validation.js";
import IReview, { updateableFields } from "./reviews.interface.js";
import { ObjectId } from "mongodb";
import ISortOrder from "../../../interfaces/ISortOrder.js";

const ReviewsController = {

   create: catchAsync(async (req: Request, res: Response) => {
      const payload: IReview = req.body;
      await ReviewZodSchema.create.parseAsync(payload);
      const result = await ReviewsService.create(req.user!.id, payload);
      sendResponse(res, EHttpCodes.CREATED, true, "Review added", result);
   }),


   deleteOne: catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id;
      const dbReview = await ReviewsService.getOneById(id);
      Utils.checkPermission(req.user!, dbReview.userId as string, EUserRoles.ADMIN);
      const result = await ReviewsService.deleteOneById(id);
      sendResponse(res, EHttpCodes.OK, true, "Review deleted", result);
   }),


   getAll: catchAsync(async (req: Request, res: Response) => {
      const { bookId } = req.query;
      if (!bookId && !req.user?.id)
         throw new BadRequest(`bookId must be present`);

      const { page, limit, skip, sortBy, sortOrder } = Utils.pageLimit(req.query);
      const sortConditions: ISortOrder = { [sortBy]: sortOrder as SortOrder };

      const where = bookId ? { book: new ObjectId(bookId as string) } : { user: new ObjectId(req.user!.id) };
      const { result, total } = await ReviewsService.getAll(where, sortConditions, skip, limit);
      sendResponse(res, EHttpCodes.OK, true, "Reviews fetched", result, undefined, undefined, { limit, page, total });
   }),


   getOne: catchAsync(async (req: Request, res: Response) => {
      const result = await ReviewsService.getOneById(req.params.id);
      sendResponse(res, EHttpCodes.OK, true, "Review fetched", result);
   }),


   updateOne: catchAsync(async (req: Request, res: Response) => {
      const id = req.params.id;
      const dbReview = await ReviewsService.getOneById(id);
      req.permission!.userAndAdmin(dbReview.userId);

      const payload = req.body as Partial<IReview>;
      if (!Object.keys(payload).length)
         throw new BadRequest("Updated review data must be sent in request body");
      await ReviewZodSchema.update.parseAsync(payload);
      req.permission!.checkUpdateFields(payload, updateableFields);

      const result = await ReviewsService.updateOneById(id, payload);
      sendResponse(res, EHttpCodes.OK, true, "Review updated", result);
   }),
};

export default ReviewsController;
