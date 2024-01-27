import express from "express";
import { getUsers } from "../services/user-service";

const userRouter = express.Router();

userRouter.get("/", async (_req, res, next) => {
  try {
    const users = await getUsers();
    res.json({ ok: true, users: users });
  } catch (error) {
    next(error);
  }
});

export default userRouter;
