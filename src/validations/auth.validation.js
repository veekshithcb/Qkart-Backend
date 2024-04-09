const Joi = require("joi");
const { password } = require("./custom.validation");

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */ 
const register = {
  body: Joi.object().keys({
  "email":Joi.string().email().required(),
  "password": Joi.string().custom(password).required(),
  "name": Joi.string().required(),
  "walletMoney":Joi.number()
})};

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */
const login = {
  body: Joi.object().keys({
  "email": Joi.string().email().required(),
  "password": Joi.string().custom(password).required()
})};

module.exports = {
  register,
  login,
};
