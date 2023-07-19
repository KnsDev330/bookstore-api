import env from "../config/env.js";
import { EStrings } from "../enums/strings.js";
import IResponse, { IGenericError } from "../interfaces/IResponse.js";
import { Error } from "mongoose";

const handleValidationError = (error: Error.ValidationError): IResponse<null> => {
   const errors: IGenericError[] = [];
   Object.values(error.errors).map((el: Error.ValidatorError | Error.CastError) =>
      errors.push({
         path: el.path,
         message: el.message,
      })
   );
   return {
      code: 400,
      ok: false,
      text: "Bad Request",
      data: null,
      errors: errors,
      stack: env.APP_ENV === EStrings.prod ? undefined : error?.stack,
   };
};

export default handleValidationError;
