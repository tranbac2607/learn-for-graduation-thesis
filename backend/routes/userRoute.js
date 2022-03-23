const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    forgotPassord,
    resetPassword,
    getUserDetails,
    updatePassword
} = require('../controllers/userController');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassord);
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/me').get(isAuthenticatedUser, getUserDetails);


module.exports = router;