import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import {createError}  from "../utiles/error.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push:{ rooms: savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json({data: {savedRoom, status: 200}})
    } catch (error) {
        next(error)
    }
}
//UPDATE ROOM
export const updateRoomAvailability = async (req, res, next) => {
    try {
        const newRoom = await Room.updateOne({ "roomNumbers._id": req.params.id },
            {
                $push: { "roomNumbers.$.unavailableDates": req.body.dates },
            })
        res.status(200).json({data: newRoom})
    } catch (error) {
        next(error)
    }
}
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}
//DELETE ROOM
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull:{ rooms: req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json({msg: "Room has been deleted"})
    } catch (error) {
        next(error)
    }
}
//GET ROOM
export const getRoom = async (req, res, next) => {

    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}
//GET ROOMS
export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Hotel.find()
        res.status(200).json({data: rooms})
    } catch (error) {
        next(error)
    }
}