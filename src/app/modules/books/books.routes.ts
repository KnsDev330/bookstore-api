import express from "express";
import AuthMidware from "../../../app/middlewares/AuthMidware.js";
import BooksController from "./books.controller.js";
const bookRoutes = express.Router();

bookRoutes.get("/", BooksController.getAllBooks);
bookRoutes.get("/:id", BooksController.getSingleBook);
bookRoutes.post("/", AuthMidware(), BooksController.createBook);
bookRoutes.patch("/:id", AuthMidware(), BooksController.updateSingleBook);
bookRoutes.delete("/:id", AuthMidware(), BooksController.deleteSingleBook);

export default bookRoutes;
