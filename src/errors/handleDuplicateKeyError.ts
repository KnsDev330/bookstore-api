import env from "../config/env.js";
import { EStrings } from "../enums/strings.js";
import IResponse, { IGenericError } from "../interfaces/IResponse.js";
import { MongoServerError } from "mongodb";

const handleDuplicateKeyError = (error: MongoServerError): IResponse<null> => {
   const errors: IGenericError[] = [
      {
         path: Object.keys(error.keyPattern)[0],
         message: "already taken",
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

export default handleDuplicateKeyError;
