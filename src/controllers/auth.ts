import { RequestHandler } from "express";
import { formatProfile } from "#/utils/helper";

export const sendProfile : RequestHandler = (req, res) => {
    if(!req.user) return res.status(401).json({
        error : "Not authenticated"
    })

    return res.json({
        profile: formatProfile(req.user)
    })
}