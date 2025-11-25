import mongoose from "mongoose";


export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://nq2020ngohoanghaiduong200104_db_user:resume123@cluster0.05sy9mr.mongodb.net/RESUME')
    .then(()=> console.log('DB CONNECTED'))
}
