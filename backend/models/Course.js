const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    learning: {
        type: String
    },
    courseContent: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
        }
    ],
    rateReview: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RateReview"
        }
    ],
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    },
    studentEnroll: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        }
    ] 
})
module.exports = mongoose.model("Course", courseSchema);