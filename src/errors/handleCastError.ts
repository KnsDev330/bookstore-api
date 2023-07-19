import env from "../config/env.js";
import { EStrings } from "../enums/strings.js";
import IResponse, { IGenericError } from "../interfaces/IResponse.js";
import { CastError } from "mongoose";

const handleCastError = (error: CastError): IResponse<null> => {
   const errors: IGenericError[] = [
      {
         path: error.path,
         message: error?.reason?.message || "Invalid Id",
      },
   ];

   return {
      code: 400,
      ok: false,
      text: "Bad Request",
      data: null,
      errors: errors,
      stack: env.APP_ENV === EStrings.prod ? undefined : error?.stack,
   };
};

export default handleCastError;
