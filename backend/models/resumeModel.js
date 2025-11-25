import mongoose from "mongoose";
// Đã xóa dòng import lỗi từ frontend

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String
    },
    template: {
        theme: String,
        colorPalette: [String]
    },
    profileInfo: {
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String,
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String,
    },
    workExperience: [{  // Đã sửa lỗi chính tả (bỏ chữ e thừa)
        company: String,
        role: String,
        startDate: String,
        endDate: String, // Đã sửa lỗi chính tả (endData -> endDate)
        description: String,
    },
    ],
    education: [{
        degree: String,
        institution: String,
        startDate: String,
        endDate: String,
    },
    ],
    skills: [{
        name: String,
        progress: Number,
    },
    ],
    projects: [{
        title: String,
        description: String,
        github: String,
        liveDemo: String,
    },
    ],
    certifications: [{
        title: String,
        issuer: String,
        year: String,
    },
    ],
    languages: [{
        name: String,
        progress: Number,
    },
    ],
    interests: [String],
},
    {
        timestamps: { createdAt: "createAt", updatedAt: "updateAt" }
    }
);

export default mongoose.model("resume", ResumeSchema);