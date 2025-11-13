import { UpdatePassword } from "#/@types/user";
import passwordResetToken from "#/models/passwordResetToken";
import User from "#/models/user";
import { sentResetPasswordSuccessMail } from "#/utils/mail";
import { Request, Response } from "express"

export const updatePassword = async (req : UpdatePassword, res: Response) => {
    try{
        const {password : newPassword, userId} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(403).json({
                error : "Unauthorized access"
            })
        }

        const matched = await user.isPasswordMatch(newPassword)
        // password is matched

        if(matched){
            return res.status(403).json({
                error : "Invalid entry"
            })
        }
        //Set new password
        user.password = newPassword

        await user.save();

        await passwordResetToken.findOneAndDelete({owner : user._id})

        sentResetPasswordSuccessMail({
            name: user.name,
            email: user.email
        })

        return res.status(200).json({
            message : "Password updated successfully"
        })
    }catch(err : any){
        console.log('>>>>Error in Updaing Password')

        res.status(500).json({
            message: "Server error"
        })
    }

}