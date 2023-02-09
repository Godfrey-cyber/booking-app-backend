import UserData from "../models/User.js"
import bcrypt from "bcryptjs"
import {createError} from "../utiles/error.js"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new UserData({
            username: req.body.username,
            password: hash,
            email: req.body.email,
        })
        const savedUser = await newUser.save()
        res.status(201).json({user: savedUser})
    } catch (error) {
        next(error)
    }
}

// login 
export const login = async (req, res, next) => {
    try {
        const user = await UserData.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User Not found"))
        
        const passCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!passCorrect) return next(createError(404, "You entered wrong credentials"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, "werwels;jdlfksdjgjepojjgkejlkdm")
        const { password, isAdmin, ...others } = user._doc
        res.cookie("access_token", token, { httpOnly: true}).status(201).json({...others})
    } catch (error) {
        next(error)
    }
}