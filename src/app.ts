import express from "express";
import dotenv from "dotenv";
import { dbShutdown } from "./db";
import logRequest from "./middlewares/logRequest";
import errorHandler from "./middlewares/errorHandler";
import userRouter from "./routers/user-router";
import noteRouter from "./routers/note-router";

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
app.use(userRouter);
app.use(noteRouter);
app.use(errorHandler);
