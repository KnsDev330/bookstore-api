import env from "../config/env.js";
import { EStrings } from "../enums/strings.js";
import IResponse, { IGenericError } from "../interfaces/IResponse.js";
import { ZodError, ZodIssue } from "zod";

const handleZodError = (error: ZodError): IResponse<null> => {
   const errors: IGenericError[] = [];
   error.issues.map((issue: ZodIssue) => {
      errors.push({
         path: issue.path[issue.path.length - 1] as string,
         message: issue.message,
      });
   });

   return {
      code: 400,
      ok: false,
      text: "Bad Request",
      data: null,
      errors: errors,
      stack: env.APP_ENV === EStrings.prod ? undefined : error?.stack,
   };
};

export default handleZodError;
