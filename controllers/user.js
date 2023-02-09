import UserData from "../models/User.js"

//UPDATE User
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await UserData.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}
//DELETE User
export const deleteUser = async (req, res, next) => {
    try {
        await UserData.findByIdAndUpdate(req.params.id)
        res.status(200).json({msg: "User has been deleted"})
    } catch (error) {
        next(error)
    }
}
//GET User
export const getUser = async (req, res, next) => {

    try {
        const user = await UserData.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
//GET UserS
export const getUsers = async (req, res, next) => {
    try {
        const users = await UserData.find()
        res.status(200).json({data: users})
    } catch (error) {
        next(error)
    }
}
