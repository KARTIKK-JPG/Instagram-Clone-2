import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { addComment, bookmarkPost, deletePost, disLikePost, getAllPost, getCommentOfPost, getUserPost, likePost, addNewPost } from "../controller/post.controller.js";


const router = express.Router()

router.route("/addpost").post(isAuth, upload.single('image'), addNewPost)
router.route("/all").get(isAuth, getAllPost)
router.route("/userpost/all").get(isAuth, getUserPost)
router.route("/:id/like").get(isAuth, likePost)
router.route("/:id/dislike").get(isAuth, disLikePost)
router.route("/:id/comment").post(isAuth, addComment)
router.route("/:id/comment/all").post(isAuth, getCommentOfPost)
router.route("/delete/:id").delete(isAuth, deletePost)
router.route("/:id/bookmark").get(isAuth, bookmarkPost)


export default router

