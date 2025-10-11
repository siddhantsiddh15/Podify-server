import { Request, Response } from "express";
import EmailVerificationToken from "#/models/emailVerificationToken";

import { generateToken, verifyToken } from "#/utils/helper";
import User from "#/models/user";
import { isValidObjectId } from "mongoose";
import { sendVerificationMail } from "#/utils/mail";

export const verifyEmail = async (req : Request, res : Response) => {
    const {userId, token : otp} = req.body;

    const verificationRecord = await EmailVerificationToken.findOne({
        owner : userId
    })

    if(!verificationRecord) return res.status(400).json({error: "Invalid request or expired token"});

    const ismatch = await verificationRecord.compareToken(otp);
    if(!ismatch)return res.status(400).json({
        error: "Invalid OTP"
    })

    // mark user as verified 
    await User.findByIdAndUpdate(userId, {verified: true})

    // delete the token
    await EmailVerificationToken.deleteOne({owner: userId});

    return res.status(200).json({
        message: "Email successfully verified"
    })
}

export async function sendReVerificationToken(req: Request, res: Response){
    const {userId} = req.body;

    // Validate ObjectId
    if(!isValidObjectId(userId)){
        return res.json(403).json({error: 'Invalid request'});
    }

    // Fetch user
    const user = await User.findById(userId);
    if(!user){
        return res.status(403).json({error : 'Invalid request'});
    }

    // Remove any old verification tokesn
    await EmailVerificationToken.findOneAndDelete({owner: userId});

    // Generate new token and save
    const token = generateToken();
    await EmailVerificationToken.create({owner : userId, token});

    // Send verification mail( Do not create token here!)
    await sendVerificationMail(token , {
        name : user.name,
        email: user.email,
        userId: user._id.toString()
    })

    return res.json({message: 'Please check your email again'})
}