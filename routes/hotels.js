import express from "express"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js"
import { createError } from "../utiles/error.js"
import { verifyAdmin } from "../utiles/verifyToken.js"
const router = express.Router()
//POST HOTEL
router.post("/", verifyAdmin, createHotel)
//UPDATE A HOTEL
router.put("/:id", verifyAdmin, updateHotel)
//DELETE HOTEL
router.delete("/:id", verifyAdmin, deleteHotel)
//GET HOTEL
router.get("/find/:id", getHotel)
//GET ALL HOTELS
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/rooms/:id", getHotelRooms)
export default router