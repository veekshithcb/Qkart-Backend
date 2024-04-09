const {User} = require("../models/user.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongoose").Types;
const config = require("../config/config")

async function hashPassword(plainPassword) {
  const saltRounds = 10; // Number of salt rounds to use (recommended value: 10)
  
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        reject(err);
        return;
      }

      // Store the hashedPassword in your database
      console.log("Hashed password:", hashedPassword);
      resolve(hashedPassword);
    });
  });
}

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
async function getUserById(id) {
  try {
    // console.log("inside getUserById function:id: ",id)
    let user = await User.findById(id);
    return user;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
}
/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
// Function to fetch a user by email
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement createUser(user)
/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */

// Function to create a new user
async function createUser(user) { 
  try {
    // Check if the email is already taken
    const isEmailTaken = await User.isEmailTaken(user.email);

    if (isEmailTaken) {
      throw new ApiError(200, "Email already taken");
    }
    console.log("user.password: ",user.password);
    let hashedPassword = await hashPassword(user.password);
    // Create and return a new User object if email is not taken
    const newUser = await User.create({
      "name":user.name,
      "email":user.email,
      "password":hashedPassword,
      "walletMoney":user.walletMoney || config.default_wallet_money,
      "address": user.address || "ADDRESS_NOT_SET"
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}


// TODO: CRIO_TASK_MODULE_CART - Implement getUserAddressById()
/**
 * Get subset of user's data by id
 * - Should fetch from Mongo only the email and address fields for the user apart from the id
 *
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getUserAddressById = async (id) => {
  return User.findOne({ _id: id }, { email: 1, address: 1 });
};


/**
 * Set user's shipping address
 * @param {String} email
 * @returns {String}
 */
const setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();

  return user.address;
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  hashPassword,
  getUserAddressById,
  setAddress
};
