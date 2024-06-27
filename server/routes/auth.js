import express from "express";
import {login, register} from "../controllers/auth.js"
import multiUpload from "../middleware/multer.js";

const router = express.Router();

router.post("/register",multiUpload,register);
router.post("/login",login);

export default router;