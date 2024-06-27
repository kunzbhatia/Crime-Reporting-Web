import multer from "multer";
const storage = multer.memoryStorage();
const multiUpload  = multer({storage}).array('files', 5);
export default multiUpload;