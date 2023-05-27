import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";
import hotelsRoute from "./api/routes/hotels.js";
import roomsRoute from "./api/routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config()

//Mongodb connection function
const connect = async ()=>{
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO);   
    } catch (error) {
        throw error
    }
};

//Disconnetion event listner
mongoose.connection.on("disconnected",()=>{
    console.log("mongodb Disconnected...")
});

//Connetion event listner
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
});

app.use(cors({origin:[process.env.END_POINT_B,process.env.END_POINT_A], credentials: true }));
// app.use(cors());

//cookie parser
app.use(cookieParser())

//middleware to allow json body
app.use(express.json())
// Add headers before the routes are defined

//main routes
app.use("/api/auth",authRoute);
app.use("/api/user",usersRoute);
app.use("/api/hotel",hotelsRoute);
app.use("/api/room",roomsRoute);

//error middle ware
app.use(errorHandler)


//server geting started here
app.listen(8800,()=>{
    connect()
    console.log("connected to backend !")
})