const User = require('../models/userModel');
const ErrorHander = require('../utils/errorHander');
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
        return next(new ErrorHander('Please provide email and password', 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander('Incorrect email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander('Incorrect email or password', 401));
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
        return next(new ErrorHander("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHander(error.message, 500));
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
        return next(new ErrorHander('Reset Password Token is invalid or has been expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander('Password does not password', 400));
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
        success: true,
        user,
    });
});

// Update User Detail
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander('Old password is incorrect', 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander('password does not match', 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };


    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get All Users -- Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
});

// Get One Users -- Admin
exports.getOneUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User does not exist with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    })
});

// Update User Role
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };


    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Delte User -- Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with id: ${req.params.id}`)
        );
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'User Delete Successfully',
    });
});