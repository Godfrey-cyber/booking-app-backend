import express from "express"
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js"
import { verifyAdmin, verifyUser } from "../utiles/verifyToken.js"
const router = express.Router()

//CREATE A Room
router.post("/:hotelId", verifyUser, createRoom)
//UPDATE A Room
router.put("/:id", verifyUser, updateRoom)
//UPDATE A Room
router.put("/availability/:id", updateRoomAvailability)
//DELETE User
router.delete("/:id",verifyUser, deleteRoom)
//GET User
router.get("/:id",verifyUser, getRoom)
//GET ALL UserS
router.get("/", verifyAdmin, getRooms)
export default router

