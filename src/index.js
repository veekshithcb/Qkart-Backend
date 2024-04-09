const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port

const MONGODB_URL =config.mongoose.url;
const PORT = config.port;

// const PORT = 8082;
// const MONGODB_URL = 'mongodb://127.0.0.1:27017/qkart'; //localhost:by_defaultPortForMOngoDb 


mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Mongodb database connected...")

    app.listen(PORT,()=>{
        console.log("Server is started on port: ",PORT);
    })
 
 
}).catch((error)=>{
    console.log(error);
})

