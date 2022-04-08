import { Op } from "sequelize";
import { User, Sequelize } from "../../db/models";

export const createNewUser = async (payload) => {
	try {
		const newUser = await User.create(payload);
		return { newUser, successful: true };
	} catch (error) {
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error, successful: false };
	}
};

export const fetchUserByEmail = async (payload) => {
	try {
		const foundUser = await User.findOne({
			where: { email: payload },
		});
		if (foundUser) {
			return { foundUser, successful: true };
		} else {
			return { error: "User not found", successful: false };
		}
	} catch (error) {
		if (error.name == "SequelizeDatabaseError") {
			return { error: "user not found or invalid email", successful: false };
		}
		if (error instanceof Sequelize.DatabaseError) {
			return { error, successful: false };
		}
		return { error: "Something went wrong", successful: false };
	}
};

export const getUserById = async (user_id) => {
	try {
		const foundUser = await User.findOne({
			where: { user_id },
		});
		if (foundUser) {
			return foundUser;
		}
		return null;
	} catch (error) {
		throw error;
	}
};

export const updateUserPassword = async (userObj) => {
	const err = {};
	try {
		const user = await User.findOne({
			where: { user_id: userObj.user_id },
		});

		if (user) {
			user.password = userObj.password;
			await user.save();

			delete user.id;
			delete user.password;
			delete user.updatedAt;

			return user;
		} 
     return null;
	} catch (error) {
		err.message = "Updating user verification failed";
		return err;
	}
};

export const updateUserProfile = async(userObj) => {
	const err = {}
	try {
		const user = await User.findOne({
			where: { user_id: userObj.user_id },
		});

		if (user) {
			user.passport = userObj.passport;
			await user.save();

			delete user.id;
			delete user.password;
			delete user.updatedAt;

			return user;
		} 
     return null;
	} catch (error) {
			console.log(error, 'userData error')
			err.message = 'Updating user verification failed'
			return err;
	}
}
