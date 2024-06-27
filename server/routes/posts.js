import express from "express";
import multiUpload from "../middleware/multer.js";
import {verifytoken} from "../middleware/verifytoken.js"
import {createPost,getPost, updatePost, deletePost, likePost, getPosts, getUserPosts, 
getPostsBySearch, commentPost, getCommentPosts, getCategoryPosts, findTopThreeAuthors} from "../controllers/posts.js"
const router = express.Router();

/*CREATE*/
router.post("/",verifytoken,multiUpload,createPost);

/*Read*/
router.get("/",getPosts);
router.get("/search",getPostsBySearch);
router.get("/post/:id",getPost);
router.get("/topAuthors", findTopThreeAuthors);
router.get("/category/:catName",getCategoryPosts);
router.get("/:userId",verifytoken,getUserPosts);
router.get("/:id/comment", verifytoken, getCommentPosts);

/*Update*/
router.patch("/:id/like",verifytoken,likePost);
router.patch("/:id/comment", verifytoken, commentPost)
router.patch("/:id",verifytoken,updatePost);

/*Delete Post*/
router.delete("/:id",verifytoken,deletePost);
export default router;