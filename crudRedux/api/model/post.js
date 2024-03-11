const mongoose = require('mongoose');
const post = new mongoose.Schema({
    title:String,
    body:String,
    createdAt:{type:Date , default:Date.now()}
})

const Post = mongoose.model('postModal' , post)

module.exports = Post