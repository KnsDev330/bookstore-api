import { SortOrder } from "mongoose";
import { BadRequest, InternalServerError } from "../../../errors/ApiErrors.js";
import Utils from "../../../utils/utils.js";
import IReview, { updateableFields } from "./reviews.interface.js";
import Review from "./reviews.model.js";
import ReviewZodSchema from "./reviews.validation.js";
import { create } from "./services/create.js";

const ReviewsService = {
   create,
   getOneById: async (id: string) => {
      const review = await Review.findById(id, { __v: false });
      if (!review)
         throw new BadRequest(`Review not found with given ID`);
      return review;
   },


   updateOneById: async (id: string, payload: Partial<IReview>) => {
      Utils.validateUpdateableFields(updateableFields, payload);
      await ReviewZodSchema.update.parseAsync(payload);
      const updatedReview = await Review.findByIdAndUpdate(id, payload, { new: true, projection: { __v: false } });
      if (!updatedReview)
         throw new InternalServerError(`Could not update review`);
      return updatedReview;
   },


   deleteOneById: async (id: string) => {
      const deletedReview = await Review.findByIdAndDelete(id);
      if (!deletedReview)
         throw new InternalServerError(`Could not delete review`);
      deletedReview.__v = undefined;
      return deletedReview;
   },


   getAll: async (
      whereConditions: any,
      sortConditions: { [key: string]: SortOrder },
      skip: number,
      limit: number
   ) => {
      const result = await Review.find(whereConditions, { __v: false }).sort(sortConditions).skip(skip).limit(limit);
      const total = await Review.countDocuments(whereConditions);
      return { result, total };
   },
};

export default ReviewsService;
