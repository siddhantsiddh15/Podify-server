import {Schema, Model, model} from 'mongoose';
import { UserDocument as BaseUserDocument } from '#/@types/user';
import bcrypt from "bcrypt"

interface UserDocumentMethods{
    isPasswordMatch(token : string) : Promise<boolean>
}

export interface UserDocument extends BaseUserDocument, UserDocumentMethods {}

const userSchema = new Schema<UserDocument,Model<UserDocument>, UserDocumentMethods>({
    name: {type: String, required: true, trim: true},
    email : {type: String, required: true, trim: true, unique: true},
    password: {type: String, required : true},
    avatar: {
        url: String,
        public_id: String
    },
    verified: {type: Boolean, default: false},
    favourites: [{type: Schema.Types.ObjectId, ref: 'audio'}],
    followers: [{type: Schema.Types.ObjectId, ref: 'user'}],
    followings: [{type: Schema.Types.ObjectId, ref: 'user'}],
    tokens: [String]
}, {
    timestamps: true
})


// pre will Hash the password before saving
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next()

})

// add a method to check password later
userSchema.methods.isPasswordMatch = async function (candidate : string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password)
}

const User: Model<UserDocument> = model<UserDocument>('user', userSchema)

export default User;