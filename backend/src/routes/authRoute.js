const authRouter = require('express').Router();


authRouter.route('/auth/register').post((req, res) => {
    res.send('register')
} )
authRouter.route('/auth/login').post((req, res) => {
    res.send('login')
} )
authRouter.route('/auth/me').post((req, res) => {
    res.send('me')
})

authRouter.route('/auth/logout').post((req, res) => {
    res.send('loggedOut')
})


module.exports = authRouter