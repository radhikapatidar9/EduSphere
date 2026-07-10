const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profession: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    phoneNo : {
        type: Number,
    },
    about: {
        type: String,
        trim: true
    }
})
module.exports = mongoose.model("Profile", profileSchema);