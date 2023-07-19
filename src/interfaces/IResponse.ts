export interface IMetaData {
   page: number;
   limit: number;
   total: number;
}

export interface IGenericError {
   path: string;
   message: string;
}

export default interface IResponse<ResponseDataType> {
   code: number;
   ok: boolean;
   text: string;
   data?: ResponseDataType;
   errors?: IGenericError[];
   stack?: string;
   meta?: IMetaData;
}
