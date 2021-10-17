import express from "express";
import { join } from "../controllers/userController";
import { see } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", see);
rootRouter.get("/join", join);

export default rootRouter;
