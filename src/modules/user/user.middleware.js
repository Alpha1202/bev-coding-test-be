import bcrypt from "bcryptjs";

import { fetchUserByEmail, getUserById } from "./user.model";
import { handleSuccessResponse, handleErrorResponse, uuidGenerator, hashPassword, decryptPassword, verifyToken } from "../../helpers/utils";
import { cloudinary } from "../../helpers/cloudinary";

export const checkExistingUser = async (req, res, next) => {
	try {
		const { foundUser, successful, error } = await fetchUserByEmail(req.body.email);

		if (foundUser) {
			return handleErrorResponse(res, "user with this email already exists", 400);
		}

		return next();
	} catch (err) {
		return { error: err, successful: false };
	}
};

export const formatCreateNewUserPayload = async (req, res, next) => {
	// const cloudRes = await cloudinary.v2.uploader.upload(req?.file?.path);

	const hashedPassword = hashPassword(req.body.password);
	const payload = {
		...req.body,
		user_id: uuidGenerator(),
		password: hashedPassword,
		passport: "somerandomStrings",
	};
	req.payload = payload;
	return next();
};

export const validateUser = async (req, res, next) => {
	const { token } = req.headers;
	try {
		if (!token) {
			return handleErrorResponse(res, "Not Authorized", 403);
		}

		const tokenPayload = await verifyToken(token);
		if (!tokenPayload) {
			return handleErrorResponse(res, "Forbidden", 403);
		}

		req.userToken = tokenPayload;
		return next();
	} catch (error) {
		return handleErrorResponse(res, error.message, 500);
	}
};

export const isUser = async (req, res, next) => {

	const { id } = req.userToken;

	try {
		const user = await getUserById(id);
		if (!user) {
			return handleErrorResponse(res, "User not found", 404);
		}

		req.user = user;

		return next();
	} catch (error) {
		return handleErrorResponse(res, error.message, 500);
	}
};

export const checkExisitingPassword = async (req, res, next) => {
	const { old_password, new_password, confirm_password } = req.body;
	const { user_id, password } = req.user;
	try {
		if (!old_password || !new_password || !confirm_password) {
			return handleErrorResponse(res, "All fields are required", 400);
		}
		const existingPassword = await decryptPassword(old_password, password);
		if (!existingPassword) {
			return handleErrorResponse(res, "Incorrect password", 400);
		}
		if (new_password != confirm_password) {
			return handleErrorResponse(res, "Passwords do not match", 400);
		}
		const hashedPassword = await hashPassword(new_password);
		const newUserData = {
			user_id,
			password: hashedPassword,
		};
		req.payload = newUserData;
		return next();
	} catch (error) {
		return handleErrorResponse(res, error.message, 500);
	}
};

export const formatUpdateProfileData = async (req, res, next) => {

	const user = req.user;



	try {
		const cloudRes = await cloudinary.v2.uploader.upload(req.file.path);

		const updateProfileObj = {
			user_id: user.user_id,
			passport: cloudRes.secure_url,
		};
		req.updateProfileObj = updateProfileObj;
		return next();
	} catch (error) {
		return handleErrorResponse(res, error.message, 500);
	}
};
