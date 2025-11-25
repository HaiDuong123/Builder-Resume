/*import fs from 'fs'
import path from 'path'
import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddleware.js'

export const uploadResumeImages = async (req, res)=>{
    try {
        //configure multer to handle images
        upload.fields([{name: "thumbnail"}, { name: "profileImage"}])
        (req, res, async (err)=>{
            if(err){
                return res.status(400).json({message: "File upload failed", error: err.message})
            }
            
            const resumeId = req.params.id;
            const resume = await Resume.findOne({_id: resumeId, userId: req.user._id})

            if(!resume) {
                return res.status(404).json({message: "Resume not found or unauthorized"})
            }

            //use process cwd to loacte upload folder
            const uploadsFolder = path.join(process.cwd(), "uploads")
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files.thumbnail?.[0];
            const newProfileImage = req.files.profileImage?.[0];

            if(newThumbnail) {
                if(resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                    if(fs.existsSync(oldThumbnail))
                        fs.unlinkSync(oldThumbnail)
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;

            }

            //same for profilpreview image

            if(newProfileImage) {
                if(resume.profileInfo?.profilePreviewUrl) {
                    const oldProfile = path.join(uploadsdFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                    if(fs.existsSync(oldProfile))
                        fs.unlinkSync(oldProfile)
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;

            }
            await resume.save();
            res.status(200).json({
                message: "Images uploaded successfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo.profilePreviewUrl
            })
        })
    } catch (error) {
        console.error('Error uploading images', error);
        res.status(500).json({
            message: "Failed to uploads images",
            error: err.message
        })
    }
}*/
import fs from 'fs';
import path from 'path';
import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

export const uploadResumeImages = async (req, res) => {
    try {
        // 1. Cấu hình multer nhận file
        upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(req, res, async (err) => {
            // Xử lý lỗi từ Multer (File quá lớn, sai định dạng...)
            if (err) {
                console.error("Multer Error:", err);
                return res.status(400).json({ message: "File upload failed", error: err.message });
            }

            console.log("--- Bắt đầu xử lý Upload ---");
            console.log("Req Files:", req.files); // Log xem có nhận được file không

            const resumeId = req.params.id;
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

            if (!resume) {
                return res.status(404).json({ message: "Resume not found or unauthorized" });
            }

            // 2. Xác định thư mục uploads an toàn
            // Lấy đường dẫn thư mục hiện tại của file này, rồi đi ra ngoài 1 cấp để vào folder uploads
            const uploadsFolder = path.join(process.cwd(), "uploads"); 

            // --- QUAN TRỌNG: Tự tạo thư mục nếu chưa có (Tránh sập server) ---
            if (!fs.existsSync(uploadsFolder)) {
                console.log("Thư mục uploads chưa tồn tại, đang tạo mới...");
                fs.mkdirSync(uploadsFolder, { recursive: true });
            }

            const baseUrl = `${req.protocol}://${req.get("host")}`;
            const newThumbnail = req.files?.thumbnail?.[0];
            const newProfileImage = req.files?.profileImage?.[0];

            // 3. Xử lý lưu Thumbnail
            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldFileName = path.basename(resume.thumbnailLink);
                    const oldFilePath = path.join(uploadsFolder, oldFileName);
                    
                    // Kiểm tra kỹ file cũ có tồn tại không mới xóa (Tránh lỗi crash)
                    if (oldFileName && fs.existsSync(oldFilePath)) {
                        try {
                            fs.unlinkSync(oldFilePath);
                        } catch (e) {
                            console.error("Không thể xóa file cũ:", e);
                        }
                    }
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            // 4. Xử lý lưu Profile Image
            if (newProfileImage) {
                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldFileName = path.basename(resume.profileInfo.profilePreviewUrl);
                    const oldFilePath = path.join(uploadsFolder, oldFileName);

                    if (oldFileName && fs.existsSync(oldFilePath)) {
                         try {
                            fs.unlinkSync(oldFilePath);
                        } catch (e) {
                            console.error("Không thể xóa file cũ:", e);
                        }
                    }
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
            }

            await resume.save();
            console.log("Upload thành công!");
            
            res.status(200).json({
                message: "Images uploaded successfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo?.profilePreviewUrl
            });
        });

    } catch (error) {
        console.error('Error uploading images (Server Error):', error);
        res.status(500).json({
            message: "Failed to upload images",
            error: error.message
        });
    }
};