const { Schema, model } = require('mongoose');
const CommentSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    blogId: {
        type: String,
        trim:true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String,
        trim: true,
        required:true
    },
    comment: {
        type: String,
        trim: true,
        required: true,
        max: 30000,
    }
}, {timestamps:true});

module.exports = model('Comment', CommentSchema);