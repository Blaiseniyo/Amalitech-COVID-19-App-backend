import express from "express"
import { 
    signUpManager,
    signUpWithGoogle, 
    verification, 
    login,
    logout,
    sendResetPasswordEmail,
    verifyResetPassword
} from "../../controller/authController";
import { 
    signUpValidation,
    loginValidation,
    signUpWithGoogleValidation,
    resetPasswordValidation,
    validateResetPassword
} from "../../middlewares/validations/authValidations";

import checkLogin from "../../middlewares/auth/checkUser";

const router =  express.Router()


router.post("/signup",signUpValidation, signUpManager);

router.post("/signupgoogle",signUpWithGoogleValidation, signUpWithGoogle);

router.post("/login", loginValidation, login);

router.post("/logout",logout);

router.post("/rest_password_request", resetPasswordValidation, sendResetPasswordEmail);

router.patch("/rest_password", validateResetPassword, verifyResetPassword);

export default router