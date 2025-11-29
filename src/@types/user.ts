import { ObjectId} from "mongoose";
import { Request } from "express";

export interface UserDocument {
    id?: ObjectId;
    name: string;
    email: string;
    password: string;
    verified: boolean;
    avatar?: {
        url: string;
        public_id: string
    };
    tokens: string[];
    favourites: ObjectId[];
    followers: ObjectId[];
    followings: ObjectId[];
}

export interface CreateUserRequest extends Request {
    body : {
        name : string;
        email: string;
        password: string
    }

    // we are overriding the body type with our expected fields
}

export interface VerifyEmailRequest extends Request {
    body: {
        userId: string;
        token: string
    }
}

export interface UpdatePassword extends Request {
    body: {
        email: string;
        userId: string;
        password: string;
    }
}

