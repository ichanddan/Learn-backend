import mongoose from "mongoose";
import dotevn from 'dotenv'
dotevn.config()


const connectDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_DB)
        console.log("MongoDB is connected",)
    } catch (error) {
        console.error("Data base not connect:")
    }
}

export default connectDB