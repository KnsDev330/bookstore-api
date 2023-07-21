import { NextFunction, Request, Response } from "express";
import JwtUtils from "../../utils/JwtUtils.js";
import IJwtUser from "../../interfaces/IJwtUser.js";
import EUserRoles from "../../enums/EUserRoles.js";
import { Forbidden } from "../../errors/ApiErrors.js";


const CheckIfUser =
   () =>
      async (req: Request, res: Response, next: NextFunction) => {
         try {
            const token = req.headers.authorization;

            if (!token) return next();
            const verifiedUser = JwtUtils.decrypt<IJwtUser>(token);
            if (verifiedUser.role === EUserRoles.BLOCKED)
               throw new Forbidden();

            req.user = verifiedUser;
            next();
         } catch (error) {
            next(error);
         }
      };

export default CheckIfUser;
