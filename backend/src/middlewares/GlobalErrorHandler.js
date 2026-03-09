const CustomErrorApi = require('../Errors/CustomErrorApi');
const { StatusCodes } = require('http-status-codes')

const globalErrorHandler = (err, req, res, next) => {
    console.log(err);
    
    if (err instanceof CustomErrorApi) {
        return res.status(err.status).json({ message: err.message });
    }

    if (err.name === "ValidationError") {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: err.message
    });
};


module.exports = globalErrorHandler