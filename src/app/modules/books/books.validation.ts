import { z } from "zod";

const BookZodSchema = {
   /**
    * @description Zod schema for validating cow creation request
    * @returns {object} Zod object schema
    */
   create: z.object({
      title: z.string({ required_error: `Book title is required` }).min(1).max(255),
      author: z.string({ required_error: `Author is required` }).min(1).max(255),
      genre: z.string({ required_error: `Genre is required` }).min(1).max(255),
      publicationDate: z
         .number({ required_error: `Publication year is required` })
         .min(1)
         .max(new Date().getUTCFullYear()),
   }),

   /**
    * @description Zod schema for validating cow update request
    * @returns {object} Zod object schema
    */
   update: z.object({
      title: z.string({ required_error: `Book title is required` }).min(1).max(255).optional(),
      author: z.string({ required_error: `Author is required` }).min(1).max(255).optional(),
      genre: z.string({ required_error: `Genre is required` }).min(1).max(255).optional(),
      publicationDate: z
         .number({ required_error: `Publication year is required` })
         .min(1)
         .max(new Date().getUTCFullYear())
         .optional(),
   }),
};

export default BookZodSchema;
