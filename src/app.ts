import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import routes from "./app/routes.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";
import sendResponse from "./utils/sendResponse.js";
import EHttpCodes from "./enums/EHttpCodes.js";
const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
   sendResponse(res, EHttpCodes.OK, true, "Server is running");
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
   sendResponse(res, EHttpCodes.NOT_FOUND, false, "Not Found");
});

export default app;
