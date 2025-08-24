import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";

const app = express();
app.use(express.json({ limit: '16kb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "2mb" }))
app.use(express.static("public"))
dotenv.config({ path: "./.env" });


app.use(
  cors({
    origin:process.env.ORIGIN,
    // origin: 'http://localhost:5173',
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 

  })
);


import authRoutes from './Routes/Auth.route.js'
import postRoutes from './Routes/Post.route.js'

app.use('/api',authRoutes)
app.use('/api',postRoutes)

export default app