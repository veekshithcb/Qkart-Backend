const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const cartRoute = require("./cart.route");

const router = express.Router();


// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Reroute all API requests beginning with the `/v1/users` route to Express router in user.route.js

router.use('/users', userRoute);  
router.use('/auth', authRoute);  
router.use('/products', productRoute); 
router.use("/cart", cartRoute); 
// send back a 404 error for any unknown api request
router.use((req, res, next) => {
    console.log("Not found in index.js");
    res.status(404).json({message:'Not found in index.js'})
});



module.exports = router;
