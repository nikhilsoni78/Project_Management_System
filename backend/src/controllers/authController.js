const UserModel = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadrequestError, UnauthorizedError, NotFoundError } = require('../Errors')

const register = async(req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadrequestError("Name Email and Password are Required")
    }
    const user = await UserModel.findOne({ email });
    if (user) {
        throw new BadrequestError(`User Already Exist with Email: ${email}`)
    }
    const createdUser = await UserModel.create({ name, email, password });
    res.status(StatusCodes.CREATED).json({success: true, message: "User Created Successfully", data: createdUser})
}

const login = async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadrequestError("Email And Password is Required")
    }
    const existingUser = await UserModel.findOne({ email }).select('+password');

    if (!existingUser) {
        throw new UnauthorizedError(`User with Email ${email} does not exits`)
    }

    const matched = await existingUser.matchPassword(password)

    if (!matched) {
        throw new UnauthorizedError('Wrong Credentials Please Try Again')
    }

    const accessToken = existingUser.generateToken();

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Login Successfully',
        data: {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        },
        accessToken: accessToken
    })
}

const userProfile = async (req, res) => {
    const { userId } = req.user
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        throw new UnauthorizedError("No User Exist Login First")
    }
    res.json({success:true, data: user})
}

const getAllUsers = async (req, res) => {
    const users = await UserModel.find({});
    if (users.length === 0) {
        throw new NotFoundError("No Users Found")
    }
    res.status(StatusCodes.OK).json({success: true, count: users.length, data: users})
}

const logout = (req, res) => {
    res.json({message: 'logout'})
}

module.exports = {
    login,logout,register,userProfile,getAllUsers
}