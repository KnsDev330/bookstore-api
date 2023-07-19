import { Request, Response } from "express";
import catchAsync from "../../../utils/catchASync.js";
import UserZodSchema from "./user.validation.js";
import UserService from "./user.service.js";
import sendResponse from "../../../utils/sendResponse.js";
import IUser from "./user.interface.js";
import EHttpCodes from "../../../enums/EHttpCodes.js";
import Utils from "../../../utils/utils.js";
import EUserRoles from "../../../enums/EUserRoles.js";
import { BadRequest } from "../../../errors/ApiErrors.js";

const UserController = {
   /* Create a new user */
   deleteSingleUser: catchAsync(async (req: Request, res: Response) => {
      Utils.checkPermission(req.user!, "", EUserRoles.ADMIN);
      const deletedUserData = await UserService.deleteSingleUserById(req.params.id);
      sendResponse(res, EHttpCodes.OK, true, "User deleted successfully", deletedUserData);
   }),

   /* Get single user */
   getSingleUser: catchAsync(async (req: Request, res: Response) => {
      const user = await UserService.getSingleUserById(req.params.id);
      Utils.checkPermission(req.user!, user._id, EUserRoles.ADMIN);
      sendResponse(res, EHttpCodes.OK, true, "User retrieved successfully", user);
   }),

   /* Get all users */
   getUsers: catchAsync(async (req: Request, res: Response) => {
      const { limit: rawLimit, page: rawPage } = req.query;
      const limit = Number(rawLimit || 10);
      const pageRaw = Number(rawPage || 1);
      const page = pageRaw < 1 ? 1 : pageRaw;
      const skip = limit * page - limit;
      const { total, users } = await UserService.getAllUsers(limit, skip);
      sendResponse(res, EHttpCodes.OK, true, "Users retrieved successfully", users, undefined, undefined, {
         limit,
         page,
         total,
      });
   }),

   /* Update single user */
   updateSingleUser: catchAsync(async (req: Request, res: Response) => {
      const payload: Partial<IUser> = req.body;
      if (!payload) throw new BadRequest("Updated User data must be sent as request body");
      await UserZodSchema.update.parseAsync(payload);

      const user = await UserService.getSingleUserById(req.params.id);
      Utils.checkPermission(req.user!, user._id, EUserRoles.ADMIN);

      const updatedUser = await UserService.updateSingleUserById(req.params.id, payload);
      sendResponse(res, EHttpCodes.OK, true, "User updated successfully", updatedUser);
   }),
};

export default UserController;
