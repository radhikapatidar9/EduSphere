const express = require('express');
const router = express.Router();

const {signUp, login, changePassword, sendOTP, updateProfile} = require('../controllers/Auth');
const { resetPassword, resetPasswordToken } = require('../controllers/ResetPassword');
const {auth} = require('../middlewares/auth');

// route for user login
router.post("/login", login);

// route for user signUp
router.post("/signUp", signUp);

// route for change password
router.post("/changePassword", changePassword);

// route for sending otp
router.post("/sendotp", sendOTP);

//update profile image
router.put("/profileImageUpdate", auth, updateProfile);

// reset password
// route for generating reset password token
router.post("/reset-password-token", resetPasswordToken);

// route for generating users password afte verification
router.post("/reset-password", resetPassword);

// export router to use in main application
module.exports = router;