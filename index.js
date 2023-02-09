import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"

const app = express()
app.use(cors())
dotenv.config()
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb")
    } catch (error) {
        throw error
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected")
})
// mongoose.connection.on("connected", () => {
//     console.log("MongoDb Connected")
// })

// middleware
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/rooms", roomsRoute)
app.use("/hotels", hotelsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack

    })
})

app.listen(8800, () => {
    connect()
    console.log("Connected to the Back end.")
}) 