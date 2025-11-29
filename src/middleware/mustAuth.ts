import { JWT_SECRET }from "#/config/variables";
import User from "#/models/user";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const mustAuth : RequestHandler = async (req : Request, res: Response, next: NextFunction) => {
    try{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({
                error : "Unauthorized"
            })
        }

        const token = authorization?.split("Bearer ")[1];
 
        if(!token){
            return res.status(403).json({
                error : "Unauthorized request"
            })
        }

        req.token = token;

        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

        // we are saving payload like this
        // generate jwl token
        // const token = jwt.sign(
        //     {userId: user._id},
        //     JWT_SECRET,
        //     {expiresIn : '1d'}
        // )

        const user = await User.findOne({
            _id : payload.userId,
            tokens: token
        });

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