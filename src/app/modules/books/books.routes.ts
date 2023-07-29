import express from "express";
import AuthMidware from "../../../app/middlewares/AuthMidware.js";
import BooksController from "./books.controller.js";
const bookRoutes = express.Router();

bookRoutes.get("/", BooksController.getAll);
bookRoutes.get("/my", AuthMidware(), BooksController.getAllMy);
bookRoutes.get("/:id", BooksController.getOne);
bookRoutes.post("/", AuthMidware(), BooksController.create);
bookRoutes.patch("/:id", AuthMidware(), BooksController.updateOne);
bookRoutes.delete("/:id", AuthMidware(), BooksController.deleteOne);

export default bookRoutes;
