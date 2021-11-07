import Joi from 'joi';
import userBadRequest from '../../utls/Errors/badRequestError';

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Invalid email",
      "string.base": "Email must be a string",
    }),
    password:Joi.string().min(6).required().messages({
        "string.base": "Password must be string",
        "string.empty": "Password Is required",
        "string.min":"Password must atleast 4 characters long"
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new userBadRequest(error.details[0].message);
  }
  next();
};

export const resetPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email can't be empty",
        "string.email": "Invalid email",
        "string.base": "Email must be a string",
      })
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new userBadRequest(error.details[0].message);
    }
    next();
  };
export const validateResetPassword = (req, res, next) =>{
    const pass = req.body.password
    const schema = Joi.object({
    password: Joi.string().min(6).required().messages({
        "string.base": "Password must be string",
        "string.empty": "Password Is required",
        "string.min":"Password must atleast 8 characters long",
    }),
    confirmPassword: Joi.string().min(6).required().equal(pass).messages({
        "string.base": "ConfirmPassword must be string",
        "string.empty": "ConfirmPassword Is required",
        "string.min":"ConfirmPassword must atleast 8 characters long"
    }),
    });
    const { error } = schema.validate(req.body);
    if (error) throw new userBadRequest(error.details[0].message);
    next();
}

export const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    // userName: Joi.string().required().messages({
    //   "string.empty": "name can't be empty",
    //   "string.base": "Name must be a string",
    // }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Invalid email",
      "string.base": "Email must be a string",
    }),
    password:Joi.string().min(6).required().messages({
      "string.base": "Password must be string",
      "string.empty": "Password Is required",
      "string.min":"Password must atleast 4 characters long"
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new userBadRequest(error.details[0].message);
  }
  next();
};
export const signUpWithGoogleValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Invalid email",
      "string.base": "Email must be a string",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new userBadRequest(error.details[0].message);
  }
  next();
};
