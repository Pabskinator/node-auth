const {Schema, model} = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email'],
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
})

// HOOKS

// fire a function AFTER doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user created', doc);
    next();
});

// fire a function BEFORE doc saved to db
userSchema.pre('save', function (next) {
    console.log('user about to be created', this);
    next();
});

const User = model('User', userSchema);

module.exports = User;