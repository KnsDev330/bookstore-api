import { Request, Response } from "express";
import catchAsync from "../../../utils/catchASync.js";
import AuthZodSchema from "./auth.validation.js";
import JwtUtils from "../../../utils/JwtUtils.js";
import env from "../../../config/env.js";
import sendResponse from "../../../utils/sendResponse.js";
import PasswordUtils from "../../../utils/PasswordUtils.js";
import UserService from "../users/user.service.js";
import { EStrings } from "../../../enums/strings.js";
import EHttpCodes from "../../../enums/EHttpCodes.js";
import { IAccessTokenPayload } from "../../../interfaces/IJwtUser.js";

const AuthController = {
   /* Login user */
   login: catchAsync(async (req: Request, res: Response) => {
      await AuthZodSchema.login.parseAsync(req.body);
      const { email, password } = req.body;

      const user = await UserService.getSingleUserByQuery({ email }, { password: true, role: true });
      await PasswordUtils.validatePassword(password, user.password as string);

      const accessToken = JwtUtils.encrypt({ id: user._id, role: user.role }, env.ACCESS_TOKEN_EXPIRATION);
      const refreshToken = JwtUtils.encrypt({ id: user._id, role: user.role }, env.REFRESH_TOKEN_EXPIRATION);
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      sendResponse(res, EHttpCodes.OK, true, "Login successful", { accessToken });
   }),

   /* Signup user */
   signUp: catchAsync(async (req: Request, res: Response) => {
      await AuthZodSchema.signUp.parseAsync(req.body);
      const user = await UserService.createSingleUser(req.body);
      const accessToken = JwtUtils.encrypt({ id: user._id, role: user.role }, env.ACCESS_TOKEN_EXPIRATION);
      const refreshToken = JwtUtils.encrypt({ id: user._id, role: user.role }, env.REFRESH_TOKEN_EXPIRATION);
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      sendResponse(res, EHttpCodes.OK, true, "Signup successful", { accessToken });
   }),

   /* Refresh access token */
   refreshToken: catchAsync(async (req: Request, res: Response) => {
      await AuthZodSchema.refreshToken.parseAsync(req);
      const { refreshToken } = req.cookies;

      const verifiedUser = JwtUtils.decrypt(refreshToken) as IAccessTokenPayload;
      const accessToken = JwtUtils.encrypt(
         { id: verifiedUser.id, role: verifiedUser.role },
         env.ACCESS_TOKEN_EXPIRATION
      );

      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: env.APP_ENV === EStrings.prod });
      sendResponse(res, EHttpCodes.OK, true, "Access token refreshed successfully", { accessToken });
   }),
};

export default AuthController;
