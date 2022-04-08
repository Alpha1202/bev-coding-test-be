import { body, check, sanitizeBody, validationResult } from 'express-validator';
import { handleSuccessResponse, handleErrorResponse, uuidGenerator } from "./utils";

const Validator = {
  passwordValidator: [
    body('password')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Password is required.')
      .isLength({ min: 12 })
      .withMessage('Password must be at least 12 characters long.')
      // .isAlphanumeric()
      // .withMessage('Password must be alphanumeric.'),
  ],
  oldPasswordValidator: [
    body('old_password')
      .trim()
      .exists({ checkFalsy: false })
      .withMessage('Password is required.')
      .isLength({ min: 12 })
      .withMessage('Password must be at least 12 characters long.')
      // .isAlphanumeric()
      // .withMessage('Password must be alphanumeric.'),
  ],
newPasswordValidator: [
    body('new_password')
      .trim()
      .exists({ checkFalsy: false })
      .withMessage('Password is required.')
      .isLength({ min: 12 })
      .withMessage('Password must be at least 12 characters long.')
      // .isAlphanumeric()
      // .withMessage('Password must be alphanumeric.'),
  ],
confirmPasswordValidator: [
    body('confirm_password')
      .trim()
      .exists({ checkFalsy: false })
      .withMessage('Password is required.')
      .isLength({ min: 12 })
      .withMessage('Password must be at least 12 characters long.')
      // .isAlphanumeric()
      // .withMessage('Password must be alphanumeric.'),
  ],
  emailValidator: [
    body('email')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Email is required.')
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email address.'),
  ],
  fnameValidator: [
    body('first_name')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('First Name is required.')
      .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
      .withMessage('Invalid Name.')
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters.'),
  ],
  lnameValidator: [
    body('last_name')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required.')
      .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
      .withMessage('Invalid Name.')
      .isLength({ min: 3, max: 20 })
      .withMessage('Name must be between 3 and 20 characters.'),
  ],
  
};

export default Validator;

export const validate = (req, res, next) => {
  const errorFormatter = ({ msg }) => `${msg}`;
  const validationError = validationResult(req).formatWith(errorFormatter);

  if (!validationError.isEmpty()) {
    const errorMsg = validationError.mapped();

   return handleErrorResponse(res, errorMsg, 400);
    
  }
  return next();
};