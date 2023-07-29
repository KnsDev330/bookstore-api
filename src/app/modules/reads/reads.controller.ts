import { Request, Response } from "express";
import catchAsync from "../../../utils/catchASync.js";
import sendResponse from "../../../utils/sendResponse.js";
import { SortOrder } from "mongoose";
import EHttpCodes from "../../../enums/EHttpCodes.js";
import Utils, { sleep } from "../../../utils/utils.js";
import EUserRoles from "../../../enums/EUserRoles.js";
import { BadRequest } from "../../../errors/ApiErrors.js";
import IReads from "./reads.interface.js";
import ReadZodSchema from "./reads.validation.js";
import ReadsService from "./reads.service.js";
import { ObjectId } from "mongodb";

const ReadsController = {
   create: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const payload: IReads = req.body;
      await ReadZodSchema.create.parseAsync(payload);
      if (await ReadsService.getOneByQuery({ user: new ObjectId(req.user!.id), book: new ObjectId(payload.book) }))
         throw new BadRequest(`You already have that book in your read list`);
      payload.user = req.user?.id as string;
      const result = await ReadsService.create(payload);
      sendResponse(res, EHttpCodes.CREATED, true, "Book added to read list", result);
   }),


   deleteById: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const id = req.params.id;
      const dbRead = await ReadsService.getOneById(id);
      Utils.checkPermission(req.user!, dbRead.user as string, EUserRoles.ADMIN);
      const result = await ReadsService.deleteOneById(id);
      sendResponse(res, EHttpCodes.OK, true, "Book removed from read list", result);
   }),


   getAll: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const { page, limit, skip, sortBy, sortOrder } = Utils.pageLimit(req.query);
      const sortConditions: { [key: string]: SortOrder } = { [sortBy]: sortOrder as SortOrder }

      const { result, total } = await ReadsService.getAll({ user: new ObjectId(req.user!.id) }, sortConditions, skip, limit);
      sendResponse(res, EHttpCodes.OK, true, "Books fetched from read list", result, undefined, undefined, { limit, page, total, pages: Math.ceil(total / limit) });
   }),


   updateOne: catchAsync(async (req: Request, res: Response) => {
      await sleep();

      const payload = req.body as Partial<IReads>;
      if (!Object.keys(payload).length)
         throw new BadRequest("Updated book read list data must be sent in request body");
      await ReadZodSchema.update.parseAsync(payload);

      const id = req.params.id;
      const dbBook = await ReadsService.getOneById(id);
      Utils.checkPermission(req.user!, dbBook.user as string, EUserRoles.ADMIN);

      const updatedRead = await ReadsService.updateOneById(id, payload);
      sendResponse(res, EHttpCodes.OK, true, "Book in read list updated", updatedRead);
   }),
};

export default ReadsController;
