/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({}) {}
	}
	User.init(
		{
			user_id: {
				unique: true,
				type: DataTypes.UUID,
				required: true,
				primaryKey: true,
			},
			first_name: {
				unique: false,
				type: DataTypes.STRING,
				required: true,
			},
			last_name: {
				unique: false,
				type: DataTypes.STRING,
				required: true,
			},
			email: {
				unique: true,
				type: DataTypes.STRING,
				required: true,
			},
			password: {
				unique: false,
				type: DataTypes.STRING,
				required: true,
			},
			passport: {
				unique: false,
				type: DataTypes.STRING,
				required: true,
			},
			phone_number: {
				unique: false,
				type: DataTypes.STRING,
				required: true,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
