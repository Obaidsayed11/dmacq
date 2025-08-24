import { Router } from "express";
import Controllers from "../Controllers/Post.Controller.js";
import authMiddleware from "../MiddleWare/auth.middleware.js";

const { allPostController, singlePostController, likePostController } =
  Controllers;

const router = Router();

router.route("/posts").get(authMiddleware, allPostController);
router.route("/posts/:id").get(authMiddleware, singlePostController);

router.route("/likepost/:id").put(authMiddleware, likePostController);

export default router;
