import { SortOrder } from "mongoose";
import { BadRequest, InternalServerError } from "../../../errors/ApiErrors.js";
import IReads, { updateableFields } from "./reads.interface.js";
import Reads from "./reads.model.js";
import Utils from "../../../utils/utils.js";
import ReadZodSchema from "./reads.validation.js";

const ReadsService = {
   create: async (data: IReads) => {
      const read = await Reads.create(data);
      read.__v = undefined;
      return read;
   },

   getOneById: async (id: string) => {
      const read = await Reads.findById(id, { __v: false });
      if (!read)
         throw new BadRequest(`Read data not found with given ID`);
      return read;
   },

   getOneByQuery: async (query: any, throwErrIfNotFound: boolean = true) => {
      const read = await Reads.findOne(query, { __v: false });
      if (!read && throwErrIfNotFound)
         throw new BadRequest(`Read data not found`);
      return read;
   },

   updateOneById: async (id: string, payload: Partial<IReads>) => {
      Utils.validateUpdateableFields(updateableFields, payload);
      await ReadZodSchema.update.parseAsync(payload);
      const updatedRead = await Reads.findByIdAndUpdate(id, payload, { new: true, projection: { __v: false } });
      if (!updatedRead)
         throw new InternalServerError(`Could not update read data`);
      return updatedRead;
   },

   deleteOneById: async (id: string) => {
      const deletedRead = await Reads.findByIdAndDelete(id);
      if (!deletedRead)
         throw new InternalServerError(`Could not delete Read data`);
      deletedRead.__v = undefined;
      return deletedRead;
   },

   getAll: async (
      whereConditions: any,
      sortConditions: { [key: string]: SortOrder },
      skip: number,
      limit: number
   ) => {
      const result = await Reads.find(whereConditions, { __v: false }).sort(sortConditions).skip(skip).limit(limit).populate('bookId', { title: true, image: true });
      const total = await Reads.countDocuments(whereConditions);
      return { result, total };
   },
};

export default ReadsService;
