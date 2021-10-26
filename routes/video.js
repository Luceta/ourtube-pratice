import express from "express";
import {
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
  watch,
} from "../controllers/videoController";
import { checkAuthUser, videoUpload } from "../Middleware/localsMiddleware";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(checkAuthUser)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

videoRouter.all(checkAuthUser).get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(checkAuthUser)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(checkAuthUser)
  .get(deleteVideo);

export default videoRouter;
