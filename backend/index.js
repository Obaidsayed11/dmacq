import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import app from "./app.js";


dotenv.config({ path: "./.env" });


connectDB()
.then(()=>{
 const server= app.listen(process.env.PORT,()=>{
    console.log(`App listen at ${process.env.PORT}`)
  })
  
})
.catch((err)=>{
  console.log("Mondodb connection failed ",err)
})