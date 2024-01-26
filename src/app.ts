import express from "express";
import dotenv from "dotenv";
import { dbShutdown } from "./db";
import logRequest from "./middlewares/logRequest";
import errorHandler from "./middlewares/errorHandler";

if (process.env["NODE_ENV"] === "test") {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

export const app = express();

app.use(express.json());
process.on("SIGINT", dbShutdown);
process.on("SIGTERM", dbShutdown);
app.use(logRequest);
app.use(errorHandler);
