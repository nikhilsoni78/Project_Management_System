const authRouter = require('express').Router();
const { login, logout, register, userProfile } = require('../controllers/authController')

authRouter.route('/auth/register').post(register)
authRouter.route('/auth/login').post(login)
authRouter.route('/auth/me').get(userProfile)
authRouter.route('/auth/logout').get(logout)


module.exports = authRouter