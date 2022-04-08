module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				unique: true,
				type: Sequelize.UUID,
				required: true,
				primaryKey: true,
			},
			first_name: {
				unique: false,
				type: Sequelize.STRING,
				required: true,
			},
			last_name: {
				unique: false,
				type: Sequelize.STRING,
				required: true,
			},
			email: {
				unique: true,
				type: Sequelize.STRING,
				required: true,
			},
			password: {
				unique: false,
				type: Sequelize.STRING,
				required: true,
			},
			passport: {
				unique: false,
				type: Sequelize.STRING,
				required: true,
			},
			phone_number: {
				unique: false,
				type: Sequelize.STRING,
				required: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Users");
	},
};
