import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  githubAuth,
  githubCallback,
} from "../controllers/userController";

import {
  checkAuthUser,
  publicMiddleWare,
} from "../Middleware/localsMiddleware";

const userRouter = express.Router();

userRouter.get("/logout", checkAuthUser, logout);
userRouter.route("/edit").all(checkAuthUser).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicMiddleWare, githubAuth);
userRouter.get("/github/callback", publicMiddleWare, githubCallback);

export default userRouter;
