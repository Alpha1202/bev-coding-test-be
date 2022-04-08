import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const dotenv = require('dotenv');


import config from '../db/config/config';

dotenv.config();
const { secret } = config;

export const uuidGenerator = () => uuidv4();

export const handleSuccessResponse = (res, data, statusCode = 200) =>
	res.status(statusCode).json({
		status: "success",
		data,
	});

export const handleErrorResponse = (res, error, statusCode = 400) =>
	res.status(statusCode).json({
		status: "Request Failed",
		error,
	});

export const generateToken = (payload) => {
	return jwt.sign(payload, secret, { expiresIn: "24h" });
};

export const verifyToken = (token) => {
	return jwt.verify(token, secret);
};

export const hashPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

export const decryptPassword = (userPassword, hashPassword) => {
	const password = bcrypt.compareSync(userPassword, hashPassword)
	return password
}

export const makeRandomStrings = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};