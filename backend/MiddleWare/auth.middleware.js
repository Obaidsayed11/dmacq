import jwt from "jsonwebtoken";
import ApiError from "../Utils/ApiError.js";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.split(" ")[1]
        if (!token) {
            throw new ApiError(400, "UnAuthorized Request")
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decodeToken
        next()
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went Wrong")

    }
};

export default authMiddleware;