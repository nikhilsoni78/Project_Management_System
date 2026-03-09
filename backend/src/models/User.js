const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'minimum 3 Characters are mandatory']
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
        minlength: [6,'password should contain minimum 6 character'],
        select: false
    }
}, {timestamps:true}
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

UserSchema.methods.matchPassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch
}

UserSchema.methods.generateToken = function(){
    return jwt.sign(
        { userId: this._id , email: this.email },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: '7h' }
    )
}

module.exports = mongoose.model('Users', UserSchema);