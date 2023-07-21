import express from "express";
import AuthMidware from "../../../app/middlewares/AuthMidware.js";
import ReviewsController from "./reviews.controller.js";
import CheckIfUser from "../../middlewares/CheckIfUser.js";
const reviewRoutes = express.Router();

reviewRoutes.get("/", CheckIfUser(), ReviewsController.getAll);
reviewRoutes.get("/:id", AuthMidware(), ReviewsController.getOne);
reviewRoutes.post("/", AuthMidware(), ReviewsController.create);
reviewRoutes.patch("/:id", AuthMidware(), ReviewsController.updateOne);
reviewRoutes.delete("/:id", AuthMidware(), ReviewsController.deleteOne);

export default reviewRoutes;
