const mongoose = require("mongoose")
const PostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postType: {
        type: String,
        required: true,
        enum: ['text', 'image',]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: function () { return this.postType == 'text' }
    },
    File: {
        type: String,
        required: function () { return this.postType != 'text' }
    },
    Period :{
        type:Number,
        required:true,
        trim:true
    },
    data:{
        type:Number,
        trim:true
    
    }

}, { timeStamps: true })
const Post = mongoose.model("Post", PostSchema)
module.exports = Post