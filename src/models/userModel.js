const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required: true,
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("User", userSchema)
