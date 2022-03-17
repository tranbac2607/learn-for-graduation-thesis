const express = require('express');
const { 
    registerUser, 
    loginUser, 
    logout, 
    forgotPassord
} = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassord);


module.exports = router;