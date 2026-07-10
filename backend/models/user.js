const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    password: {
        type:String,
        required: true,
    },
    confirmPassword: {    //well no need to store in db
        type:String,
        required: true,
    },
    accountType: {
        type:String,
        enum: ["Admin", "Instructor", "Student"],
        required: true,
    },
    additionalDetail: {
        type: mongoose.Schema.Types.ObjectId,  // jis ko ref kr rhe uski id
        ref: "Profile" ,
        required: true
    },
    courses: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
        }
    ],
    userImage: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
    },
    resetTokenExpiry: {
        type: Date
    },
    courseProgress: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }
]
})

module.exports = mongoose.model("user", userSchema);

