const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    gender: {
        type: String,
        required: true
    },
    Date : {
        type : String,
        required : true
    },
    Month : {
        type : String,
        required : true
    },
    Year : {
        type : Number,
        required : true
    },
    profileImage : {
        type : String
    },
    about : {
        type : String
    },
    fatherName : {
        type : String
    },
    school : {
        type : String
    },
    address : {
        type : String
    },
    comment : {
        type : String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
}, {timestamps : true});

module.exports = mongoose.model("user", userSchema);
