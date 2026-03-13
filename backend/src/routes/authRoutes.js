const authRouter = require('express').Router();
const { login, logout, register, userProfile,getAllUsers } = require('../controllers/authController')
const authentication = require('../middlewares/authentication')

authRouter.route('/auth/register').post(register)
authRouter.route('/auth/login').post(login)
authRouter.route('/auth/me').get(authentication,userProfile)
authRouter.route('/auth/logout').get(logout)
authRouter.route('/auth/users').get(authentication, getAllUsers)


module.exports = authRouter