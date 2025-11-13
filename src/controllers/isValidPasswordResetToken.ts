import { NextFunction, Request, Response } from "express"
import passwordResetToken from "#/models/passwordResetToken"
import { tokenAndIdValidation } from "#/validations/tokenAndIdValidation"

export const isValidPasswordResetToken = async (req : Request, res: Response, next : NextFunction) => {
    const {token ,userId} = req.body;

    const resetToken = await passwordResetToken.findOne({owner: userId});

    if(!resetToken){
        return res.status(403).json({
            error : "Unauthorized access"
        })
    }

    const matched = await resetToken.compareToken(token);

    if(!matched){
        return res.status(403).json({
            error : "Unauthorized access. Invalid token"
        })
    }
    next()
    // return res.json({message: "Your token is valid"})
}


export const grantValid = async (req : Request, res : Response) => {
    return res.json({valid: true})
}