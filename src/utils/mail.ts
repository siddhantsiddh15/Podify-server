import {transporter} from '#/services/email'
import path from "path";
import { generateTemplate } from "#/mail/template";
type Profile = {
    name: string;
    email: string;
    userId: string;
}


export async function sendVerificationMail(otp: string, newUser: Profile){
    const welcomeMessage = `Hi ${newUser?.name || 'User'}, welcome to Podify! There are so many things we can do for verified users. Use the given OTP to verify your Email`

    await transporter.sendMail({
        from: "auth@myapp.com",
        to: newUser.email,
        subject: "Verify your email",
        html: generateTemplate({
            title: "Welcome to Podify",
            message: welcomeMessage,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: otp
        }),
        attachments: [{
            filename: "logo.png",
            path: path.join(__dirname, "../mail/logo.png"),
            cid: "logo"
        },
        {
            filename: "welcome.png",
            path: path.join(__dirname, "../mail/welcome.png"),
            cid: "welcome"
        }
        
        ]
    })
}
