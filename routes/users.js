import express from "express";
import {
  edit,
  remove,
  logout,
  githubAuth,
  githubCallback,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.get("/github/start", githubAuth);
userRouter.get("/github/callback", githubCallback);

export default userRouter;
