const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true,
        min: 10,
        max: 250
    },
    text: {
        type: String
    },
    authorName: {
        type: String,
        default: 'noname'
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    categories: {
        type: Array
    },
    img: {
        type: String
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Post', schema)