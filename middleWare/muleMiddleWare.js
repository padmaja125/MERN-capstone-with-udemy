import multer from "multer";

// storage & upload the image file for user
// for storage => destination & filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/upload");
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
