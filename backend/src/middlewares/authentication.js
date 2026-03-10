const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../Errors')

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('No Token: Login First')
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        
        req.user = { userId: decodedToken.userId, email: decodedToken.email }   
    } catch (error) {
        throw new UnauthorizedError("Invalid Token")
    }
    
    next()

}


module.exports = authenticationMiddleware