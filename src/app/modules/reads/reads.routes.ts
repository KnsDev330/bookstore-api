import express from "express";
import AuthMidware from "../../../app/middlewares/AuthMidware.js";
import ReadsController from "./reads.controller.js";
const readsRoutes = express.Router();

readsRoutes.get("/", AuthMidware(), ReadsController.getAll);
readsRoutes.post("/", AuthMidware(), ReadsController.create);
readsRoutes.patch("/:id", AuthMidware(), ReadsController.updateOne);
readsRoutes.delete("/:id", AuthMidware(), ReadsController.deleteById);

export default readsRoutes;
