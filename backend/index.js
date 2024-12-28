import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.route.js"
import documentRoute from './routes/document.route.js'
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config({});
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

//api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/document",documentRoute);

const Port = process.env.Port || 3000;
app.listen(Port,()=>{
    connectDB();
    console.log(`Server running on Port ${Port}`);
})