import {Schema, model, Document} from 'mongoose';
import bcrypt from "bcrypt"

interface passwordResetTokenDocument extends Document {
    owner: Schema.Types.ObjectId;
    token: string;
    compareToken(providedToken : string): Promise<boolean>;
    createdAt? : Date
}

const passwordResetTokenSchema = new Schema<passwordResetTokenDocument>({
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token:{
        type: String,
        required : true
    },
    createdAt: {
        type: Date,
        default : Date.now,
        expires : 3600 // 1 hour
    }
})

// passwordResetTokenSchema.pre("validate", function(next){
//     this.token = crypto.randomBytes(32).toString("hex")
// })

// hash the token before saving

passwordResetTokenSchema.pre("save", async function(next){
    if(this.isModified("token")){
        const salt = await bcrypt.genSalt(10);
        this.token = await bcrypt.hash(this.token, salt)
    }

    next()
})

//compare method
passwordResetTokenSchema.methods.compareToken = async function (token: string) {
    return bcrypt.compare(token, this.token)
}

export default model<passwordResetTokenDocument>('PasswordResetToken', passwordResetTokenSchema)