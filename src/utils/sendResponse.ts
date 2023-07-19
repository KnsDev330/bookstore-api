import { Response } from "express";
import IResponse, { IGenericError, IMetaData } from "../interfaces/IResponse.js";

const sendResponse = async <ResponseDataType>(
   res: Response,
   httpStatusCode: number,
   ok: boolean,
   text?: string,
   data?: ResponseDataType,
   errors?: IGenericError[],
   stack?: string,
   meta?: IMetaData
): Promise<void> => {
   const r: IResponse<ResponseDataType> = {
      code: httpStatusCode,
      ok,
      text: text || "",
      data,
      errors,
      stack,
      meta,
   };
   res.status(httpStatusCode).json(r);
};

export default sendResponse;
