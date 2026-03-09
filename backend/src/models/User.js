const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: {
            value: 3,
            message: 'minimum 3 Characters are mandatory'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
         match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please use a valid email address"
    ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: {
            value: 6,
            message: 'password should contain minimum 6 character'
        },
        select: false
    }
}, {timestamps:true}
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

module.exports = mongoose.model('Users', UserSchema);