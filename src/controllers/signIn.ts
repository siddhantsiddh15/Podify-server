import jwt from "jsonwebtoken";
import User from "#/models/user";
import { JWT_SECRET } from "#/config/variables";
import { Request, Response } from "express";

export const signIn = async (req :Request, res : Response) => {
    const {email, password} = req.body

    // Find user by email
    const user = await User.findOne({email})
    if(!user){
        return res.status(403).json({
            error : "Email/Password mismatch"
        })
    }

    // compare password
    const matched = await user.isPasswordMatch(password)
    if(!matched){
        return res.status(403).json({
            error : "Email/Password mismatch"
        })
    }
    // generate jwl token
    const token = jwt.sign(
        {userId: user._id},
        JWT_SECRET,
        {expiresIn : '1d'}
    )

    user.tokens.push(token);
    await user.save();

    // respond with user profile + token

    res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user?.avatar?.url,
      followers: user.followers.length,
      followings: user.followings.length,
    },
    token,
  });
}