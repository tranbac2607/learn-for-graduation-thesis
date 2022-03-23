const ErrorHander = require('../utils/errorHander');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something went wrong';

    // Wrong MongoDB ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    // Wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json Web Token is invalid, try again';
        err = new ErrorHander(message, 400);
    }

    // JWT Expire Error
    if (err.name === 'JsonExpireError') {
        const message = 'Json Web Token is Expire, try again';
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        succsess: false,
        message: err.message,
    })
};