import jwt from "jsonwebtoken"
import { createError } from "../utiles/error.js"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "Sorry! You are not Authenticated"))
    }
    jwt.verify(token, "werwels;jdlfksdjgjepojjgkejlkdm", (err, user) => {
        if (err) return next(createError(403, "Sorry! Invalid Token"))
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Sorry! Invalid Token"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "Sorry! You are not an Admin"))
        }
    })
}