const { StatusCodes } = require('http-status-codes')
const CustomErrorApi = require('./CustomErrorApi')

class ForbiddenError extends CustomErrorApi{
    constructor(message) {
        super(message)
        this.status = StatusCodes.FORBIDDEN
    }
}


module.exports = ForbiddenError