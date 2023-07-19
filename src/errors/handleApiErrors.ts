import env from "../config/env.js";
import { EStrings } from "../enums/strings.js";
import IResponse, { IGenericError } from "../interfaces/IResponse.js";

const handleApiErrors = (error: any): IResponse<null> => {
   const errors: IGenericError[] = [
      {
         path: "any",
         message: error?.message || "Something went wrong.",
      },
   ];

   return {
      code: error?.code ? error.code : 500,
      ok: false,
      text: "Bad Request",
      data: null,
      errors: errors,
      stack: env.APP_ENV === EStrings.prod ? undefined : error?.stack,
   };
};

export default handleApiErrors;
