const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
}, {
    timestamps: true,
});

const user = mongoose.model('user', userSchema)

//exposes the module to the project  
module.exports = user;