import express from "express";
import dotenv from "dotenv";
import connectDB from "./conn/conn.js";
dotenv.config();
import userRoute from "./routes/user.js"
import bookRoute from "./routes/book.js"
import favRoute from "./routes/favourite.js"
import cartRoute from "./routes/cart.js"
import OrderRoute from "./routes/order.js"
import cors from "cors";
const app=express();
connectDB()
app.use(express.json());
app.listen(process.env.PORT,()=>{
    console.log("server started on 1000")
})
app.use(cors())
app.use("/api/v1",userRoute)
app.use("/api/v1",bookRoute)
app.use("/api/v1",favRoute)
app.use("/api/v1",cartRoute)
app.use("/api/v1",OrderRoute)