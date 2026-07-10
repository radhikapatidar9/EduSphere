const User = require('../models/user');
const mailSender = require('../utils/mailSender')
const crypto = require("crypto");
const bcrypt = require('bcrypt')

// 1. check password validation 
function checkPassword(pass) {
   return (
     pass.length >= 8 &&
     /[A-Z]/.test(pass) &&
     /[a-z]/.test(pass) &&
     /[0-9]/.test(pass) &&
     /[!@#$%^&*(),.?":{}|<>]/.test(pass)
   );
}

// resetPasswordToken

exports.resetPasswordToken = async(req, res) => {
    try {

        const {email} = req.body;
        // validation
        if(!email) {
            return res.json({
                success: false,
                message: "Please fill the field carefully!"
            })
        }

        // check if user not registered
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                success: false,
                message: "User with this email never registered!"
            })
        }

        // generate token for reset password link
        // const resetToken = crypto.randomBytes(32).toString("hex");
        const resetToken = crypto.randomUUID();
        // User = User.toObject();
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() +15 * 60 * 1000;

        await user.save();

        // create link
        const url = `http://localhost:5173/update-password/${resetToken}`

        // send link to reset password on user email
        await mailSender(user.email, "Below is the link for passwork change", `Password reset link ${url}`);

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });


    } catch(err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message: "Error occcured while reset password!",
            err
        })
    }
}

// resetPassword
exports.resetPassword = async(req, res) => {
    try {

        // fetch data
        const {password, confirmPassword, resetToken} = req.body;

        // validation
        if(!password || !confirmPassword || !resetToken) {
            return res.status(400).json({
                success:false,
                message: "Check fields carefully"
            })
        }
        console.log(resetToken);
        const user = await User.findOne({resetToken: resetToken});

        if(!user) {
            return res.status(401).json({
                success:false,
                message: "Invalid token!"
            })
        }

         // token time check
        if(user.resetTokenExpiry < Date.now()) {
            return res.json({
                success:false,
                message: "Token expires!"
            })
        }

        if(!checkPassword(password) || (password !== confirmPassword)) {
            return res.status(400).json({
                success:false,
                message: "Not valid password"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })



    } catch(err) {
        return res.status(500).json({
            success:false,
            message: "Error occured while reset password!"
        })
    }
}