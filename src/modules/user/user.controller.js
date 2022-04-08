import bcrypt from "bcryptjs";

import { handleSuccessResponse, handleErrorResponse, generateToken, makeRandomStrings, verifyToken, hashPassword } from "../../helpers/utils";
import { sendEmail } from "../../helpers/mail";
import { fetchUserByEmail, createNewUser, updateUserPassword, getUserById, updateUserProfile } from "./user.model";
import { sendResetEMailTemplate } from "../../constants/mailTemplates/sendResetEmailTemplate";
import { upload, uploadMulter, cloudinary } from "../../helpers/cloudinary";
export const Signup = async (req, res) => {
	try {
		const { successful, newUser = [], error } = await createNewUser(req.payload);
		if (successful) {
			const payload = { id: newUser.user_id, email: newUser.email };
			const token = await generateToken(payload);
			const user = {
				id: newUser.user_id,
				first_name: newUser.first_name,
				last_name: newUser.last_name,
				email: newUser.email,
				passport: newUser.passport,
				phone_number: newUser.phone_number,
			};
			const response = { token, user };
			handleSuccessResponse(res, response, 201);
		} else {
			handleErrorResponse(res, error ?? error.message, 400);
		}
	} catch (err) {
		handleErrorResponse(res, err, 500);
	}
};

export const Login = async (req, res) => {
	try {
		const { foundUser, successful, error } = await fetchUserByEmail(req.body.email);
		if (foundUser) {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				const payload = { id: foundUser.user_id, email: foundUser.email };
				const token = await generateToken(payload);
				const user = {
					id: foundUser.user_id,
					first_name: foundUser.first_name,
					last_name: foundUser.last_name,
					email: foundUser.email,
					passport: foundUser.passport,
					phone_number: foundUser.phone_number,
				};
				const response = { token, user };
				return handleSuccessResponse(res, response, 200);
			} else {
				return handleErrorResponse(res, "Invalid email or password", 401);
			}
		} else {
			return handleErrorResponse(res, "Invalid email or password", 401);
		}
	} catch (error) {
		return handleErrorResponse(res, error, 500);
	}
};

export const ChangePassword = async (req, res) => {
	try {
		const newUserData = req.payload;
		const userObj = await updateUserPassword(newUserData);
		if (userObj.message || !userObj) {
			return handleErrorResponse(res, userObj.message, 500);
		} else if (userObj) {
			return handleSuccessResponse(res, "Password successfully changed", 200);
		}
	} catch (error) {
		return handleErrorResponse(res, error.message, 500);
	}
};

export const sendResetPasswordEmail = async (req, res) => {
	try {
		const { foundUser } = await fetchUserByEmail(req.body.email);

		if (!foundUser) {
			return handleErrorResponse(res, "Invalid login email or password", 404);
		}

		const payload = { id: foundUser.user_id };
		const tempToken = await makeRandomStrings(6);
		const token = await generateToken(payload, "1h");

		return handleSuccessResponse(res, [{ token, tempToken }], 200);
	} catch (error) {
		return handleErrorResponse(res, error.message, 500);
	}
};

export const ResetPassword = async (req, res) => {
	const { token } = req.params;
	try {
		if (!token) {
			return handleErrorResponse(res, "You are not authorized to perform this action", 401);
		}

		if (req.body.password !== req.body.confirmPassword) {
			return handleErrorResponse(res, "Passwords do not match", 401);
		}

		const decodedToken = await verifyToken(token);
		if (!decodedToken) {
			return handleErrorResponse(res, "You are not authorized to perform this action", 401);
		}

		const { id } = decodedToken;
		const userExists = await getUserById(id);

		if (!userExists) {
			return handleErrorResponse(res, "Invalid login email or password", 401);
		}
		const hashedPassword = await hashPassword(req.body.new_password);
		const newUserData = {
			user_id: id,
			password: hashedPassword,
		};
		const userObj = await updateUserPassword(newUserData);
		if (userObj.message || !userObj) {
			return handleErrorResponse(res, userObj.message, 500);
		} else if (userObj) {
			return handleSuccessResponse(res, "Password reset successful", 200);
		}
	} catch (error) {
		return handleErrorResponse(res, error.message, 500);
	}
};

export const EditUserProfile = async (req, res) => {
	const userProfile = req.updateProfileObj;

	try {
		const userData = await updateUserProfile(userProfile);

		if (!userData || userData.message) {
			return handleErrorResponse(res, "Updating user profile failed", 500);
		} else if (userData) {
			return handleSuccessResponse(res, userData, 200);
		}
	} catch (error) {
		console.log(error);
		return handleErrorResponse(res, error.message, 500);
	}
};
