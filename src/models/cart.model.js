const mongoose = require('mongoose');
const { productSchema } = require('./product.model');
const config = require("../config/config")

// TODO: CRIO_TASK_MODULE_CART - Complete cartSchema, a Mongoose schema for "carts" collection
const cartSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    cartItems: {
      type:[{
        product: productSchema,
        quantity: Number
      }]
    },
    paymentOption: {
      type: String,
      default: config.default_payment_option
    }
  },
  {
    timestamps: false,
  }
);


/**
 * Return total added cart items cost
 * @param {[products]} cartItems
 * @return {Number}
 */
 cartSchema.methods.totalAmount = async function () {
  // console.log("cartItems: ",cartItems);
  let ans = 0;
  let cart = this;
  for (let item of cart.cartItems) {
    ans += item.product.cost * item.quantity;
  }

  return ans;
}


/**
 * @typedef Cart
 */
const Cart = mongoose.model('Cart', cartSchema);

module.exports.Cart = Cart;