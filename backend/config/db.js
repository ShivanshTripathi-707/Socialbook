const mongoose = require("mongoose");

async function connectDB(){
    try {
       await mongoose.connect(process.env.MONGODB_URI).then(()=> {
        console.log("database connected");
       }).catch((err)=>{
        console.log("failed to connect db");
       })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports =  connectDB;