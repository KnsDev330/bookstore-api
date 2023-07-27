import { TokenExpiredError } from "jsonwebtoken";
import env from "../config/env.js";
import { EStrings } from "../enums/strings.js";
import IResponse, { IGenericError } from "../interfaces/IResponse.js";

const handleJwtExpiredError = (error: TokenExpiredError): IResponse<null> => {
   const errors: IGenericError[] = [
      {
         path: 'any',
         message: error.message + ", please login again",
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

export default handleJwtExpiredError;
