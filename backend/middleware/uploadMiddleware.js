/*import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req,res, cb) => {
        cb(null,"upload/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
});
//file filter\
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }
    else{
        cb(new Error("Only .jpeg, .jpg, ..png are allowed formats"), false)
    }
}

const upload = multer({storage, fileFilter})
export default upload;*/
import multer from 'multer';
import path from 'path';

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Lưu vào thư mục uploads ở root backend
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // Đặt tên file: timestamp + tên gốc (để tránh trùng)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Kiểm tra loại file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Giới hạn 5MB
});

export default upload;