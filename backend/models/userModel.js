const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userChema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Please enter your name'],
        maxlength: [30, 'Name cannot be more than 30 characters'],
        minlength: [2, 'Name cannot be less than 2 characters'],
    },
    email: {
        type: String,
        require: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        require: [true, 'Please enter your password'],
        minlength: [6, 'Name cannot be less than 6 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,  
});

userChema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token


module.exports = mongoose.model('User', userChema);