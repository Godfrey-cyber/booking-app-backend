import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}
//UPDATE HOTEL
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}
//DELETE HOTEL
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndUpdate(req.params.id)
        res.status(200).json({msg: "Hotel has been deleted"})
    } catch (error) {
        next(error)
    }
}
//GET HOTEL
export const getHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}
//GET HOTELS
export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query
    try {
        const hotels = await Hotel.find({...others, cheapestPrice: {$gte: min || 1, $lte: max || 999}}).limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

//COUNT BY CITY NAMES
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

//COUNT BY TYPE
export const countByType = async (req, res, next) => {
    try {
        const appartmentCount = await Hotel.countDocuments({ type: "appartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})
        const villaCount = await Hotel.countDocuments({type: "villas"})
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        res.status(200).json([
            {type: "appartment", count: appartmentCount }, 
            { type: "resort", count: resortCount }, 
            { type: "cabin", count: cabinCount },
            { type: "villas", count: villaCount },
            { type: "hotel", count: hotelCount }
        ])
    } catch (error) {
        next(error)
    }
}
//GET ROOMS
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}