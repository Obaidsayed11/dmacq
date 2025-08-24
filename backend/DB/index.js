import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`mongo connected ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("Connection error",error);
        process.exit(1)
        
    }
}

export default connectDB