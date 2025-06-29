import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://vaatsalyasahu:iitisocproject@cluster0.ptyhydb.mongodb.net/PORTFOLIO')
    .then(()=> console.log('DB CONNECTED'))
}