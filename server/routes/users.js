import express from "express";
import multiUpload from "../middleware/multer.js";
import {verifytoken} from "../middleware/verifytoken.js";
import {getUser, updateUserPicture, updateProfile,deleteUser, deleteUserNotification} from "../controllers/users.js"
const router= express.Router();

/*Read*/
router.get("/:id",getUser);

/*Update*/
router.patch("/:id/updateProfilePicture",verifytoken,multiUpload,updateUserPicture);
router.patch('/:id', verifytoken , updateProfile)

/*Delete*/
router.delete("/:id/:notificationid",verifytoken, deleteUserNotification)
router.delete("/:id",verifytoken,deleteUser);
export default router;
