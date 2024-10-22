import { Router } from "express";
import { postHandler } from "../controllers/post.controller";
import { verifySelf, verifyUser } from "../middlewares/user.protectRoutes";

const postsRoute = Router();

postsRoute.post("/create", verifyUser as any, postHandler.create);
postsRoute.get("/postById/:postID", verifyUser as any, postHandler.getPostByID);
postsRoute.get(
  "/postsByAuthorID/:authorID",
  verifyUser as any,
  postHandler.getPostsByAuthor
);
postsRoute.patch(
  "/update/:postID",
  verifyUser as any,
  verifySelf,
  postHandler.updatePost
);

postsRoute.get("/allPosts", postHandler.getAllPosts);
postsRoute.delete("/delete/:postID", postHandler.deletePost);

export default postsRoute;
