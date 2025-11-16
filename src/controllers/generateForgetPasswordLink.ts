import { Request, Response } from "express";
import crypto from 'crypto'
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import PasswordResetToken from "#/models/passwordResetToken";
import { sentResetPasswordMail } from "#/utils/mail";
import { PASSWORD_RESET_LINK,BASE_URL } from "#/config/variables";

export async function generateForgetPasswordLink(req : Request, res: Response){
    // find the user by email. if not found return 404
    // generate a secure token
    // build a reset link and with query parameter userId and token
    // send the email link
    const {email} = req.body;
    if(!email){
        return res.status(403).json({
            error : "Enter valid email"
        })
    }
    // Find user by email
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({error : "We dont't have any such user"})
    }

    const token = crypto.randomBytes(36).toString("hex");

    await PasswordResetToken.findOneAndDelete({
        owner : user._id
    }) // important to delete any pervious generated token

    // Save token and associate with user
    await PasswordResetToken.create({owner: user._id, token})

    // Construct reset URL
    const resetUrl = `${BASE_URL}${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`

    // Send email
    await sentResetPasswordMail(resetUrl, user.email);

    return res.json({message: 'Password reset mail has been sent to your email.', link : resetUrl})

}