import EUserRoles from "../enums/EUserRoles.js";

export default interface IJwtUser {
   id: string;
   role: EUserRoles;
}

export interface IAccessTokenPayload extends IJwtUser {}
export interface IRefreshTokenPayload extends IAccessTokenPayload {}
