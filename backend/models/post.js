const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    postDesc : {
        type : String,
    },
    postImage : {
        type : String
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
}, {timestamps : true})

module.exports = mongoose.model("post", postSchema);