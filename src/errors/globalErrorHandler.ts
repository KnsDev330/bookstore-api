/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import env from "../config/env.js";
import { EStrings } from "../enums/strings.js";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import IResponse from "../interfaces/IResponse.js";

import { ZodError } from "zod";
import handleValidationError from "./handleValidationError.js";
import handleZodError from "./handleZodError.js";
import handleCastError from "./handleCastError.js";
import handleDuplicateKeyError from "./handleDuplicateKeyError.js";
import { ApiError, Forbidden, Unauthorized, BadRequest, InternalServerError } from "./ApiErrors.js";
import handleApiErrors from "./handleApiErrors.js";
import handleJwtExpiredError from "./handleJwtErrors.js";
import jwtPkg from "jsonwebtoken";
const { TokenExpiredError } = jwtPkg;

const globalErrorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
   console.log(`GlobalErrorHandler ~~`, { error });
   if (env.APP_ENV !== EStrings.prod) {
      console.log("------------------------");
      console.log(error.name);
      console.log(error.message);
      console.log("------------------------");
   }

   let response: IResponse<null> = {
      code: 500,
      ok: false,
      text: "Something went wrong",
      data: null,
      errors: [
         { path: "any", message: `Something went wrong` },
      ],
      stack: env.APP_ENV === EStrings.prod ? undefined : error?.stack,
   };

   if (error?.name === "ValidationError") response = handleValidationError(error);
   else if (error instanceof ZodError) response = handleZodError(error);
   else if (error?.name === "CastError") response = handleCastError(error);
   else if (error?.name === "MongoServerError") response = handleDuplicateKeyError(error);
   else if (error instanceof TokenExpiredError) {
      console.log('-----------------------------------------------');
      console.log('-----------------------------------------------');
      console.log('-----------------------------------------------');
      console.log('-----------------------------------------------');
      console.log('-----------------------------------------------');

      response = handleJwtExpiredError(error);
   }
   else if (
      error instanceof ApiError ||
      error instanceof Forbidden ||
      error instanceof Unauthorized ||
      error instanceof BadRequest ||
      error instanceof InternalServerError
   )
      response = handleApiErrors(error);
   else if (error instanceof Error) {
      response = {
         code: 500,
         ok: false,
         text: error.message,
         data: null,
         errors: [
            {
               path: "any",
               message: error.message,
            },
         ],
         stack: env.APP_ENV === EStrings.prod ? undefined : error?.stack,
      };
   }

   res.status(response.code).json(response);
};

export default globalErrorHandler;
