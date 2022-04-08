import multer from "multer";
import cloudinary from "cloudinary";
import cloudinaryStorage from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = cloudinaryStorage({
	cloudinary,
    filename: (req, file, cb) => {
        // set file name
        cb(undefined, file.originalname);
      },
	folder: "inbev",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const fileFilter = (req, file, cb) => {
    const error = new Error('Invalid file format or file size [Allowed formats: .jpeg, .jpg, .png]');
    error.status = 400;
    const fileSize = parseInt(req.headers['content-length']);
    if ((file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') && (fileSize <= 100000)) {
      cb(null, true);
    } else {
      cb(error, false);
    }
  };

const uploadMulter = multer({ dest: 'uploads/',  fileFilter});

const upload = multer({ storage, fileFilter });

export { upload, cloudinary, uploadMulter };
