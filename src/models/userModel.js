const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: String,
    balance : {
        type:Number,
        Default: 100
    },
    address: String,
    age: Number,
    gender: {
        type:String,
        g:["male", "female", "other"]
    },
    isFreeAppUser: {
        type:Boolean,
        Default:false
    }
}, { timestamps: true });

module.exports = mongoose.model('EcommUser', userSchema) //users



// String, Number
// Boolean, Object/json, array