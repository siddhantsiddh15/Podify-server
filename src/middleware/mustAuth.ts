import { JWT_SECRET }from "#/config/variables";
import User from "#/models/user";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const mustAuth : RequestHandler = async (req : Request, res: Response, next: NextFunction) => {
    try{
        const {authorization} = req.headers;

        const token = authorization?.split("Bearer ")[1];

        if(!token){
            return res.status(403).json({
                error : "Unauthorized request"
            })
        }

        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

        const user = await User.findById(payload.userId);
        if(!user){
            return res.status(403).json({
                error : "Unauthorized request"
            })
        }

        req.user = user; 
        next();
    }catch(err){
        return res.status(403).json({ error: "Unauthorized request" });
    }
}