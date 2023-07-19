/* eslint-disable no-console */

import mongoose from "mongoose";
import app from "./app.js";
import { Server } from "http";
import env from "./config/env.js";

process.on("uncaughtException", (error) => {
   console.error(error);
   process.exit(1);
});

async function boot() {
   let server: Server;

   try {
      console.info(`🛢 connesting to db`);
      await mongoose.connect(
         `mongodb+srv://${env.DATABASE_URI_USER}:${env.DATABASE_URI_PASS}@cluster0.apugylf.mongodb.net/${env.DATABASE_URI_NAME}?retryWrites=true&w=majority`
      );
      console.info(`✅ db connected`);

      server = app.listen(env.PORT, () => {
         console.info(`✅ Application  listening on port ${env.PORT}`);
      });
   } catch (err) {
      console.error("⚠️ Failed to connect database", err);
   }

   process.on("unhandledRejection", (error) => {
      if (!server) process.exit(1);
      else {
         server.close(() => {
            console.error(error);
            process.exit(1);
         });
      }
   });
}

boot();
