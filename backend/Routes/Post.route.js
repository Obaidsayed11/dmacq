import { Router } from "express";
import Controllers from "../Controllers/Post.Controller.js";
import authMiddleware from "../MiddleWare/auth.middleware.js";

const { allPostController, singlePostController, likePostController,searchPostsController } =
  Controllers;

const router = Router();

router.route("/posts").get(authMiddleware, allPostController);
router.get('/posts/search', searchPostsController);
router.route("/posts/:id").get(authMiddleware, singlePostController);

router.route("/likepost/:id").put(authMiddleware, likePostController);


export default router;
