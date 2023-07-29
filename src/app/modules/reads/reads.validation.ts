import { z } from "zod";
import { EReadStates } from "./reads.interface.js";

const ReadZodSchema = {
   /* Zod schema for validating create operation */
   create: z.object({
      bookId: z.string({ required_error: `Book ID is required` }).min(1).max(255),
   }),

   /* Zod schema for validating update operation */
   update: z.object({
      state: z.nativeEnum(EReadStates).optional(),
   }),
};

export default ReadZodSchema;
