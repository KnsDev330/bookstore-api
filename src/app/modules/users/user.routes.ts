import express from "express";
import UserController from "./user.controller.js";
import AuthMidware from "../../../app/middlewares/AuthMidware.js";
import EUserRoles from "../../../enums/EUserRoles.js";
const userRoutes = express.Router();

userRoutes.get("/", AuthMidware(EUserRoles.ADMIN), UserController.getUsers);
userRoutes.get("/me", AuthMidware(), UserController.getMyProfile);
userRoutes.get("/:id", AuthMidware(), UserController.getSingleUser);
userRoutes.patch("/:id", AuthMidware(), UserController.updateSingleUser);
userRoutes.delete("/:id", AuthMidware(EUserRoles.ADMIN), UserController.deleteSingleUser);

export default userRoutes;
