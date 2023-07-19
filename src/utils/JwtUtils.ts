import { BadRequest } from "../errors/ApiErrors.js";
import jwt from "jsonwebtoken";

const JwtUtils = {
   encrypt: (data: string | object | Buffer, expiresIn?: number | string) => {
      const token = jwt.sign(data, process.env.JWT_SECRET as string, expiresIn ? { expiresIn } : {});
      return token;
   },
   decrypt: <PayloadType>(token: string): PayloadType => {
      try {
         const data = jwt.verify(token, process.env.JWT_SECRET as string);
         return data as PayloadType;
      }
      catch (e: any) {
         const err = e as Error;
         throw new BadRequest(err.message);
      }
   },
};

export default JwtUtils;
