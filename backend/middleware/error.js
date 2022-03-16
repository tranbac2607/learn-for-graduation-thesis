const ErrorHander = require('../utils/errorHander');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something went wrong';

    res.status(err.statusCode).json({
        succsess: false,
        message: err.message,
    })
};