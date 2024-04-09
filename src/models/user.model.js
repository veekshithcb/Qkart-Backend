const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require('bcryptjs');
 
const userSchema = mongoose.Schema(
  {  
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    walletMoney: {
      type: Number,
      default: 500,
    },
    address: {
      type: String,
      default: config.default_address,
    },
  },
  {
    timestamps: true,
  }
);



/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  try{
    let user = await User.find({email});
    // console.log("user form esEmailTaken: ",user);
    if(user.length!==0){
      return true;
    }else{
      return false;
    }
  }catch(error){
    throw error;
  }
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  // try{
    let hashedPassword = this.password;
    let isSame = await bcrypt.compare(password, hashedPassword);

    return isSame;

  // }catch(error){
  //   throw error;
  // }
};





/**
 * Check if user have set an address other than the default address
 * - should return true if user has set an address other than default address
 * - should return false if user's address is the default address
 *
 * @returns {Promise<boolean>} 
 */
userSchema.methods.hasSetNonDefaultAddress = async function () {
  // console.log("inside hasSetNonDefaultAddress function");
  const user = this;
  
  // console.log("user.address: ",user.address);
  // console.log("config.default_address: ",config.default_address);
  // console.log("user.address !== config.default_address: ",user.address !== config.default_address);
  return user.address !== config.default_address;
};

/*
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */
/**
 * @typedef User
 */


 const User = mongoose.model('User', userSchema);

 module.exports = {User};
