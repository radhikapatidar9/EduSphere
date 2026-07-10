const User = require('../models/user');
const Profile = require('../models/Profile');

exports.updateProfile = async(req, res) => {
    try {

        const {profession, gender, dob, phoneNo, about} = req.body;
        const userId = req.user.id;
        // console.log(userId);

        if(!profession || !gender || !dob || !phoneNo || !about || !userId) {
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                success:false,
                message: "User not found"
            })
        }

        const profileId = user.additionalDetail;
        const profileDetail = await Profile.findById(profileId);

        const newProfile = await Profile.findByIdAndUpdate(profileId,{
            profession: profession, gender:gender, dob:dob, phoneNo:phoneNo, about:about
        }, {new:true});
        // save???

        return res.status(200).json({
            success:true,
            message: "Profile updated successfully",
            newProfile
        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error occured while creating profile"
        })
    }
}

// delete account
exports.deleteAccount = async(req, res) => {
    try {

        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user) {
            return req.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({_id : user.additionalDetail});

        // delete user
        await User.findByIdAndDelete(userId);

        // unenroll user from enrolled courses
        // how can we scheduled req, i want to delete account after 5 day of req
        // cron job???

        return res.status(200).json({
            success:true,
            message: "User deleted successfully"
        })


    } catch(err) {
         console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error occured while creating profile"
        })
    }
}

// fetch all details of user
exports.getAllUserDetails = async(req, res) => {
    try {

        const userId = req.user.id;
        const userDetail = await User.findById(userId).populate('additionalDetail')

        res.status(200).json({
            success:true,
            message: "All data fetched successfully",
            userDetail
        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error occured while fetch user data"
        })
    }
}