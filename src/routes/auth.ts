import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  createUserSchema,
  updatePasswordSchema,
} from "#/validations/validationSchema";
import { validate } from "#/middleware/validator";
import { createUser } from "#/controllers/user";
import { emailVerificationBody } from "#/validations/emailVerification";
import {
  verifyEmail,
  sendReVerificationToken,
} from "#/controllers/verifyEmail";
import { generateForgetPasswordLink } from "#/controllers/generateForgetPasswordLink";
import {
  isValidPasswordResetToken,
  grantValid,
} from "#/controllers/isValidPasswordResetToken";
import { tokenAndIdValidation } from "#/validations/tokenAndIdValidation";
import { updatePassword } from "#/controllers/updatePassword";
import { signInValidationSchema } from "#/validations";
import { signIn } from "#/controllers/signIn";
import { mustAuth } from "#/middleware/mustAuth";
import { updateProfile } from "#/controllers/updateProfile";
import { fileParser, RequestWithFiles } from "#/middleware/fileParser";
import { sendProfile } from "#/controllers/auth";
import { logout } from "#/controllers/logout";
// import { sendReVerificationMail } from "#/utils/mail";
const router = Router();

// create sign up route
router.post("/create", validate(createUserSchema), createUser);
router.post("/verify-email", validate(emailVerificationBody), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/generate-forget-password-link", generateForgetPasswordLink);
router.post(
  "/password-reset-token",
  validate(tokenAndIdValidation),
  isValidPasswordResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(updatePasswordSchema),
  isValidPasswordResetToken,
  updatePassword
);
router.post("/sign-in", validate(signInValidationSchema), signIn);
router.post("/update-profile", mustAuth, fileParser, updateProfile);
router.post("/log-out", mustAuth, logout);

router.get("/is-auth", mustAuth, sendProfile);


export default router;
