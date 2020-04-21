const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        min: 2,
        max: 60
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 2,
        max: 60
    },
    password: {
        type: String,
        min: 8,
        max: 60
    },
    timestamp: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = model('User', schema);