import { RequestHandler } from "express";
import User from "#/models/user";

export const logout : RequestHandler = async (req, res) => {
    try{
        const fromAll = req.query.fromAll;
        const token = req.token;
        const user = await User.findById(req?.user?.id)

        if(!user){
            return res.status(500).json({
                error : "Invalid User"
            })
        }

        // log out from all devices
        if(fromAll === "yes"){
            user.tokens = []
        }else{
            user.tokens = user.tokens.filter((tokenLocal) => tokenLocal !== token)
        }

        await user.save();

        return res.status(200).json({
            success : true
        })

    }catch(err){
        return res.status(500).json({
            error : "Logout failed"
        })
    }
}