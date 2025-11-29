import bcrypt from "bcrypt";
import { UserDocument } from "#/@types/user";

export const generateToken = (length : number = 6) : string => {
    let OTP = '';

    for(let i = 0; i < length; i++){
        OTP = OTP + Math.floor(Math.random() * 10)
    }

    return OTP;
}

export const hashToken = async (token : string) : Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(token, salt)
}

export const verifyToken = async (plain: string, hashed: string) : Promise<boolean> => {
    return bcrypt.compare(plain, hashed)
}


export const formatProfile = (user: UserDocument) => {
    return {
        id: user.id?.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar
    }
}