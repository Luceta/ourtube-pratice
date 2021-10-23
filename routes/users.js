import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  githubAuth,
  githubCallback,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";

import {
  checkAuthUser,
  publicMiddleWare,
  uploadFileMiddleWare,
} from "../Middleware/localsMiddleware";

const userRouter = express.Router();

userRouter.get("/logout", checkAuthUser, logout);
userRouter
  .route("/edit")
  .all(checkAuthUser)
  .get(getEdit)
  .post(uploadFileMiddleWare.single("avatar"), postEdit);
userRouter.get("/github/start", publicMiddleWare, githubAuth);
userRouter.get("/github/callback", publicMiddleWare, githubCallback);
userRouter
  .route("/change-password")
  .all(checkAuthUser)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
