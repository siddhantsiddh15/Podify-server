import { RequestHandler, Request, Response } from "express";
import User from '#/models/user'
import { CreateUserRequest } from "#/@types/user";
import { generateToken, hashToken } from "#/utils/helper";
import EmailVerificationToken from "#/models/emailVerificationToken";
import { sendVerificationMail } from "#/utils/mail";



export const createUser :RequestHandler = async (req : CreateUserRequest, res) => {
    try {
        const newUser = await User.create(req.body);
        const otp = generateToken()
        console.log(newUser)
        await EmailVerificationToken.create({
            owner: newUser._id,
            token : otp
        })

        await sendVerificationMail(otp, {
            name: newUser?.name,
            email: newUser.email,
            userId: newUser?._id.toString()
        })

        return res.status(201).json({
            message : "User registered. Please verify your email",
            userId: newUser._id
        });
    }catch(err : any){
        return res.status(500).json({error : err.message})
    }
}


// export const verifyEmail = async (req: Request, res: Response) => {
//     const {userId, token} = req.body;

//     // Find email verification token by owner
//     const verificationToken = await EmailVerificationToken.findOne({
//         owner: userId
//     });

//     if(!verificationToken){
//         return res.status(403).json({error: 'Invalid token'});
//     }

//     // Compare provided token with stored token
//     const matched = await verificationToken.compareToken(token);

//     if(!matched){
//         return res.status(403).json({error : 'Invalid token'})
//     }

//     // Set user as verified
//     await User.findByIdAndUpdate(userId, {verified: true});

//     // Removed the used verified token
//     await EmailVerificationToken.findByIdAndDelete(verificationToken._id)

//     // Respond with success
//     res.json({message: 'Your email is verified'})
// }