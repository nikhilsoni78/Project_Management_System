const BadrequestError = require('./badRequestError')
const ForbiddenError = require('./forbiddenError')
const NotFoundError = require('./notFoundError')
const UnauthorizedError = require('./unauthorizedError')
const CustomErrorApi = require('./CustomErrorApi')



module.exports = {
    BadrequestError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError,
    CustomErrorApi
}