const {Schema, model} = require('mongoose');
const { isEmail } = require('validator');

// 3rd party hashing package
const bcrypt = require('bcrypt');

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
userSchema.pre('save', async function (next) {
    // hashing password
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);

        if (auth) {
            return user;
        }

        throw Error('incorrect password');
    }

    throw Error('incorrect email');
}

const User = model('User', userSchema);

module.exports = User;