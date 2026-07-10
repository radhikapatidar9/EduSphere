const RateReview = require('../models/RateReview');
const User = require('../models/user');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

// create rate review
exports.rateAndReview = async(req, res) => {
    try {

        const {rating, review, courseId} = req.body;
        const userId = req.user.id;
        // validation
        if(!rating || !review || !courseId) {
            return res.status(400).json({
                success:false,
                message: "all fields required"
            })
        }
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

        // check if user is enrolled or not
        const userEnrolled = await Course.find({_id: courseId, studentEnroll: {$elemMatch: {$eq: userId}}});
        if(!userEnrolled) {
            return res.status(404).json({
                success:false,
                message:"student is not enrolled in course"
            })
        }

        // check if user already gave review
        const alreadyReviewed = await RateReview.findOne({user: userId, course: courseId});
        if(!alreadyReviewed) {
            return res.status(404).json({
                success:false,
                message:"course is already reviewed by the student"
            })
        }

        const newRateReview =await RateReview.create({user:userId, rating: rating, review:review, course: courseId})
        const newCourse = await Course.findByIdAndUpdate(courseId, {$push: {rateReview: newRateReview._id}}, {new: true} )

        console.log(newCourse)

        return res.status(200).json({
            success:true,
            message: "rating review added successfully!",
            newRateReview
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "error occured while creating rate review"
        })
    }
}

// getAverageRating
exports.getAverageRating = async(req,res) => {
    try {

        const {courseId} = req.body;

        // calculate avg rating
        const result = await RateReview.aggregate([
            {
                $match: {
                    course: mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group: {
                    _id:null,
                    averageRating: {$avg : "$rating"}
                }
            }
        ])

        // return rating
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating : result[0].averageRating
            })
        }
        // if no rating review exists
        return res.status(200).json({
            success:true,
            message: "avg rating is 0, no rating given till now",
            averageRating: 0
        })

    } catch(err) {
        return res.status(500).json({
            success:false,
            message: "Error occured while fetching average rating "
        })
    }
}

// get all rating and review
exports.getAllRating = async(req, res) => {
    try {

        const allReviews = await RateReview.find({})
                                 .sort({rating: "desc"})
                                 .populate({
                                    path: "user",
                                    select: "firstName lastName email image"
                                 })
                                 .populate({
                                    path: "course",
                                    select: "name"
                                 })
                                 .exec()

        return res.status(200).json({
            success:true,
            message:"All ratings and reviews fetched successfully",
            allReviews
        })

    } catch(err) {
        return res.status(500).json({
            success:false,
            message: "Error occured whilefetching all reviews andrating"
        })
    }
}