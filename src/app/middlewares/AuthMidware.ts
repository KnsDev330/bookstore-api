import { NextFunction, Request, Response } from "express";
import JwtUtils from "../../utils/JwtUtils.js";
import IJwtUser from "../../interfaces/IJwtUser.js";
import EUserRoles from "../../enums/EUserRoles.js";
import { BadRequest, Forbidden, Unauthorized } from "../../errors/ApiErrors.js";
import Permission from "../../utils/Permission.js";


const AuthMidware =
   (...requiredRoles: string[]) =>
      async (req: Request, res: Response, next: NextFunction) => {
         try {
            const token = req.headers.authorization;

            if (!token)
               throw new BadRequest("No access token found in request header");
            const verifiedUser = JwtUtils.decrypt<IJwtUser>(token);

            if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role))
               throw new Unauthorized();
            if (verifiedUser.role === EUserRoles.BLOCKED)
               throw new Forbidden();

            req.permission = new Permission(verifiedUser.id, verifiedUser.role);
            req.user = verifiedUser;
            next();
         } catch (error) {
            next(error);
         }
      };

export default AuthMidware;
