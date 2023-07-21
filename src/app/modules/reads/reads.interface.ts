/* eslint-disable no-unused-vars */
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export enum EReadStates {
   ToRead = 'ToRead',
   CurrentlyReading = 'CurrentlyReading',
   AlreadyRead = 'AlreadyRead',
   Abandoned = 'Abandoned'
}

export default interface IReads extends Document {
   _id: string | ObjectId;
   user: ObjectId | string;
   book: ObjectId | string;
   state: EReadStates;
   createdAt: string;
   updateddAt: string;
}

export const searchableFields: (keyof IReads)[] = [];
export const updateableFields: (keyof IReads)[] = ['state'];
export const sortableFields: (keyof IReads)[] = ['createdAt', 'state'];