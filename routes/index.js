import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicMiddleWare } from "../Middleware/localsMiddleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicMiddleWare).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicMiddleWare).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
