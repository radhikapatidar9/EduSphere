// imports
const User = require('../models/user'); // something wrong in '../models/User as i firstly named file as user.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary')
const Otp = require("../models/Otp");
const otpGenerator = require('otp-generator');
const Profile = require('../models/Profile');
const cookie = require('cookie-parser');
// const user = require('../models/user');
const mailSender = require('../utils/mailSender');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
// otp generate

exports.sendOTP = async(req, res) => {
    try {

        const {email} = req.body;
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent) {
            return res.json({
                success:false,
                message: "user registered already"
            })
        }
        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("OTP Generated", otp)

        // otp must be unique - check
        let result = await Otp.findOne({otp: otp});
        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await Otp.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        // create an entry for otp
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        // return response successful
        return res.json({
            success: true,
            message: "Otp send Successfully!",
            data: otpBody
        })

    } catch(err) {
        console.log("REAL ERROR:", err);

        return res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

// signUp
// all functions used for signUp

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

// 2. check image file type supported or not
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

// 3. upload file to cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    options = {
        folder, resource_type : "auto", quality
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
}

// signUp
exports.signUp = async(req, res) => {
    try {

        const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body;
         
        // verify all fields have their inputs
        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType  || !otp) {
            console.log("all fields must have input");
            return res.json({
                success:false,
                message: "Fill all the fields Carefully!"
            });
        }

        // check if user already registereed
        const emailCheck = await User.findOne({email: email});
        if(emailCheck) {
            return res.json({
                success:false,
                message:"User registered already!"
            })
        }
        // verify email

        // pass length must be atleast 8 digits, including 1 uppercase, 1 lowercase, 1 number, 1 special char;
        if (!checkPassword(password)) {
          return res.json({ success:false, message:"Weak password" });
        }

        if(checkPassword(password)) {

            // check password and confirmpassword same or not
            if(password !== confirmPassword) {
                console.log("password not match");
                return res.json({
                    success:false,
                    message: "check password carefully!"
                })
            }
        }

        // find most recent OTP for user
        const recentOTP = await Otp.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOTP);

        // validate OTP
        if(recentOTP.length == 0) {
            return res.status(401).json({
                success:false,
                message: "Otp not found"
            })
        }
        if(otp != recentOTP[0].otp) {
            return res.status(401).json({
                success:false,
                message: "Invalid OTP"
            })
        }

        // hashed password
        let hashedPassword;
        try {

            hashedPassword = await bcrypt.hash(password, 10);
            // User.password = hashedPassword;

        } catch(err) {
            res.json({
                success: false,
                message: "Error occured while hashing the password!"
            })
        }

        // check account type
        if(accountType !== 'Student' && accountType !== 'Instructor' && accountType !== 'Admin') {
            return res.json({
                success: false,
                message: "Account type not matched!"
            })
        }


    const profileDetail = await Profile.create({
        profession: null,
        gender: null,
        dob:null,
        phoneNo: null,
        about:null
    })

    // userImage = "https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}"

    const user = await User.create({
        firstName, lastName, email, password:hashedPassword, confirmPassword:hashedPassword, accountType,
         userImage:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, 
         additionalDetail: profileDetail._id
    })

    res.status(200).json({
        success:true,
        message: "Account created successfully!",
        user
    })



    } catch(err) {
        console.log("Error Occcured which sign Up!", err);
        res.json({
            success:false,
            message: "Error Occured while sign up"
        })
    }
}


// login
exports.login = async(req, res) => {
    try {

        const {email, password} = req.body;

        // verify email
        if(!email || !password) {
            res.json({
                success:false,
                message: "Fill details carefully!"
            })
        }

        // check if user not registered
        const user = await User.findOne({email: email});
        if(!user) {
            res.json({
                success:flase,
                message: "User Not Registered"
            })
        }

        // check password correct or not
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.json({
                success:false,
                message: "Password Incorrect!"
            })
        }
        const payload = {
            id: user._id,
            accountType: user.accountType,
            email: user.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3d'});
        // User = User.toObject;
        user.token = token;
        user.password = undefined;

        const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true, // no access at client side
        }

        res.cookie("token", token, options).status(200).json({
            success:true,
            message: "User logged in successfully!",
            user,
            token
        })

        

    } catch(err) {
        console.log(err);
        res.json({
            success:false,
            message: "Error occured while login"
        })
    }
}

// change password
exports.changePassword = async(req, res) => {
    try {

        const {email, oldPassword, newPassword, confirmPassword} = req.body;

        if(!email || !oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success:false,
                message: "User not registered"
            })
        }
        // check oldpassword correct or not
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(401).json({
                success:false,
                message: "Please enter Correct password!"
            })
        }

        // password validation
        if(!checkPassword(newPassword)) {
            return res.json({
                success:false,
                message: "Password must be of lenfgth 8 and contain atleast 1 uppercase, 1 lowercase, 1 number, and 1 special char"
            })
        }

        // check pass and confirm pass
        if(newPassword !== confirmPassword) {
            return res.json({
                success:false,
                message: "Check password again"
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password= hashedPassword;
            await user.save()
        }
        catch(err) {
            return res.json({
                success:false,
                message: "Error occured while hashing password!"
            })
        }

        await mailSender(user.email, "Password changed successfully!",
            `<p>If this was not you please reset your password immmediatly</p>`
        )

        return res.json({
            success: true,
            message: "Password changed successfully!"
        })


    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "error occured while changing password"
        })
    }
}

// update profile
exports.updateProfile = async(req, res) => {
    try {

        const profileImg = req.files.profileImg;
        const userCheck = req.user.email;
        if(!userCheck) {
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }
        const user = await User.findOne({email: userCheck});
        const imgUrl = await uploadImageToCloudinary(profileImg, 'EdTech');

        const newProfile = await User.findByIdAndUpdate(user._id, {userImage: imgUrl.secure_url}, {new:true});

        return res.status(200).json({
            success:true,
            message:"Profile image updated successfully",
            newProfile
        })

    } catch(err) {
        console.log("error while updating profile image", err);
        return res.status(500).json({
            success:false,
            message: `error occured while updating profile image, ${err}`
        })
    }
}



