const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{type:String, required:true},
    authorName:{type:String, require:true},
    category:{type:String, require:true},
    year:{type:Number, require:true}
}, { timestamps: true });

module.exports = mongoose.model('User', bookSchema) 