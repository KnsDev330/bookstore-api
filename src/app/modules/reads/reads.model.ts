import { Schema, model } from "mongoose";
import IReads, { EReadStates } from "./reads.interface.js";

export const ReadsSchema = new Schema<IReads>(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      book: {
         type: Schema.Types.ObjectId,
         ref: "Book",
         required: true,
      },
      state: {
         type: String,
         enum: EReadStates,
         required: true,
         default: EReadStates.ToRead
      }
   },
   {
      timestamps: true,
   }
);

const Reads = model<IReads>("Reads", ReadsSchema);
export default Reads;
