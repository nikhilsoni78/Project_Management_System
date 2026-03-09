const { StatusCodes } = require('http-status-codes')
const CustomErrorApi = require('./CustomErrorApi')

class BadrequestError extends CustomErrorApi{
    constructor(message) {
        super(message)
        this.status = StatusCodes.BAD_REQUEST
    }
}


module.exports = BadrequestError