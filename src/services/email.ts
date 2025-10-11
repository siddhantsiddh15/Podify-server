import nodemailer from 'nodemailer';
import { MAILTRAP_PASS, MAILTRAP_USER } from '#/config/variables';

export const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS
    }
})