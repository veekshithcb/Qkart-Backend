const Joi = require("joi");
const { objectId } = require("./custom.validation");

/**
 * Example url: `/v1/users/:userId`
 * Validate the "userId" url *params* field. "userId" value should be a
 * - string
 * - valid Mongo id -> Use the helper function in src/validations/custom.validation.js
 */
 const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom((value, helpers) => {
      if (!objectId(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  }),
};
 

const setAddress = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    address: Joi.string().required().min(20),
  }),
};

module.exports = {
  getUser,
  setAddress,
};
