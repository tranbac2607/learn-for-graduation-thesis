const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHander');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'this is a simple id',
            url: 'profile picture url',
        },
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler('Incorrect email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Incorrect email or password', 401));
    }

    sendToken(user, 200, res);
});

// Logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expries: new Date(Date.now),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged Out',
    });
});

// Forgot password
exports.forgotPassord = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecomerce password recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExprie = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // creating token hash
    const token = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler('Reset Password Token is invalid or has been expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not password', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExprie = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({

    });
});