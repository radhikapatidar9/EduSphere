const mongoose = require('mongoose');

const rateReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", 
        index: true,
        required: true
    }

})
module.exports = mongoose.model("RateReview", rateReviewSchema)