const { Schema, model } = require('mongoose');

const schema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        min: 10,
        max: 1000
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Comment', schema);