const { StatusCodes } = require('http-status-codes')
const CustomErrorApi = require('./CustomErrorApi')

class UnauthorizedError extends CustomErrorApi{
    constructor(message) {
        super(message)
        this.status = StatusCodes.UNAUTHORIZED
    }
}


module.exports = UnauthorizedError