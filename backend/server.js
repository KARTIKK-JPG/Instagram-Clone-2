import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import messageRoute from "./routes/message.route.js"
import { app, server } from "./socket/socket.js";


dotenv.config({})


const PORT = process.env.PORT



app.get("/",(_,res)=>{
    return res.status(200).json({message:"I am coming from backend",success:true})
})

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))

const corsOptions = {
    origin: ['http://localhost:5173',"http://localhost:5174",
    "http://localhost:5175"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  };

app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/message", messageRoute)

// app.use(express.static(path.join(__dirname, "/frontend/dist")))
// app.get("*", (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
// })

app.get("/", (req, res) => {
    res.send("Social media platform backend running!");
  });



server.listen(PORT, ()=>{
    connectDB()
   console.log(`Server listen at port ${PORT}`)
})