import { Router } from "express";

import { Login, Signup, SendResetToken, ResetPassword, ChangePassword, sendResetPasswordEmail, EditUserProfile } from "./user.controller";
import { checkExistingUser, validateUser, formatCreateNewUserPayload, isUser, checkExisitingPassword, formatUpdateProfileData } from "./user.middleware";
import {  upload, uploadMulter } from '../../helpers/cloudinary';
import { passwordResetTokenGenerate, resetPasswordVerifyToken } from "../../helpers/utils";
import Validator, { validate } from "../../helpers/validators";

const {
	emailValidator,
	fnameValidator,
	lnameValidator,
	passwordValidator,
	oldPasswordValidator,
	newPasswordValidator,
	confirmPasswordValidator,
} = Validator;

const routes = Router();

routes.post("/login", emailValidator, passwordValidator, validate, Login);

routes.post("/signup", uploadMulter.single('passport'),  fnameValidator, lnameValidator, emailValidator, passwordValidator, validate, checkExistingUser, formatCreateNewUserPayload, Signup);

routes.post("/sendResetToken", emailValidator, validate, sendResetPasswordEmail);

routes.post("/resetPassword/:token", 	newPasswordValidator, confirmPasswordValidator, validate, ResetPassword);

routes.post("/editprofile", validateUser, isUser, uploadMulter.single('passport'), formatUpdateProfileData, EditUserProfile);

routes.post(
	"/changePassword",
	oldPasswordValidator,
	newPasswordValidator,
	confirmPasswordValidator,
	validate,
	validateUser,
	isUser,
	checkExisitingPassword,
	ChangePassword
);

export default routes;
