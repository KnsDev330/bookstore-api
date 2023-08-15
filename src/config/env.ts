import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
   APP_ENV: process.env.APP_ENV,
   PORT: process.env.PORT,
   DATABASE_URI_USER: process.env.DATABASE_URI_USER,
   DATABASE_URI_PASS: process.env.DATABASE_URI_PASS,
   DATABASE_URI_NAME: process.env.DATABASE_URI_NAME,
   DATABASE_URI_HOST: process.env.DATABASE_URI_HOST,
   DATABASE_URI_PORT: process.env.DATABASE_URI_PORT,
   DATABASE_URI_SOURCE: process.env.DATABASE_URI_SOURCE,
   PASSWORD_SALT_ROUNDS: Number(process.env.PASSWORD_SALT_ROUNDS),
   PASSWORD_MIN_LENGTH: Number(process.env.PASSWORD_MIN_LENGTH),
   PASSWORD_MAX_LENGTH: Number(process.env.PASSWORD_MAX_LENGTH),
   JWT_SECRET: process.env.JWT_SECRET,
   ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
   REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
};
