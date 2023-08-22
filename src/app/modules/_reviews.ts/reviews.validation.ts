import { z } from "zod";

const ReviewZodSchema = {

   create: z.object({
      bookId: z.string({ required_error: `Book ID is required` }).min(1).max(255),
      comment: z.string().min(5).max(255).default(''),
      rating: z.number({ required_error: `Rating is required` }).int().min(1).max(5),
   }),


   update: z.object({
      comment: z.string().min(5).max(255).optional(),
      rating: z.number({ required_error: `Rating is required` }).int().min(1).max(5).optional(),
   }),

};

export default ReviewZodSchema;
