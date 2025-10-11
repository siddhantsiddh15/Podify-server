import {Schema, model, Model, Document} from "mongoose";
import bcrypt, {hash, compare} from "bcrypt"
// interface for methods
interface EmailVerificationTokenMethods {
    compareToken(token : string) : Promise<boolean>
}

export interface EmailVerificationTokenDocument extends Document, EmailVerificationTokenMethods {
    owner : Schema.Types.ObjectId; // user whom this token belongs to
    token: string;
    createdAt: Date;
}

const emailVerificationTokenSchema = new Schema<EmailVerificationTokenDocument, {}, EmailVerificationTokenMethods>({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user" // matches the User model exactly
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // unit is in seconds so 3600 means 3600 seconds mean 1 hour
    }
});


// pre save hook
emailVerificationTokenSchema.pre("save", async function (next) {
    // only hash if token is modified
    if(!this.isModified("token")) return next();

    this.token = await hash(this.token, 10);
    next();
})

// instance methods for comparing tokens
emailVerificationTokenSchema.methods.compareToken = async function (candidate: string) : Promise<boolean>{
    // this.token is already hashed in the db
    return compare(candidate, this.token)
}

const EmailVerificationToken: Model<EmailVerificationTokenDocument> = model<EmailVerificationTokenDocument>("emailVerificationToken", emailVerificationTokenSchema)


export default EmailVerificationToken;

// these 3 steps are done here
// 1. Define TypeScript interface
// 2. Create Schema
// 3. Export Model