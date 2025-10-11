import { Router } from "express";
import { createUserSchema } from "#/validations/validationSchema";
import { validate } from "#/middleware/validator";
import { createUser } from "#/controllers/user";
import { emailVerificationBody } from "#/validations/emailVerification";
import { verifyEmail, sendReVerificationToken } from "#/controllers/verifyEmail";
// import { sendReVerificationMail } from "#/utils/mail";
const router = Router();

// create sign up route

router.post("/create", validate(createUserSchema), createUser);
router.post("/verify-email",validate(emailVerificationBody), verifyEmail);
router.post('/re-verify-email', sendReVerificationToken)

export default router;
