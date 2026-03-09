const UserModel = require('../models/User')
const {  } = require('../Errors')

const register = (req, res) => {
    
    res.json({message: 'register'})
}
const login = (req, res) => {
    res.json({message: 'login'})
}
const userProfile = (req, res) => {
    res.json({message: 'userProfile'})
}
const logout = (req, res) => {
    res.json({message: 'logout'})
}

module.exports = {
    login,logout,register,userProfile
}