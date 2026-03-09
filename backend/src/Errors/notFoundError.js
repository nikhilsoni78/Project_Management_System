const { StatusCodes } = require('http-status-codes')
const CustomErrorApi = require('./CustomErrorApi')

class NotFoundError extends CustomErrorApi{
    constructor(message) {
        super(message)
        this.status = StatusCodes.NOT_FOUND
    }
}


module.exports = NotFoundError