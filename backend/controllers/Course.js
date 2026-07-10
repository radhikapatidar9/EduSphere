const Course = require('../models/Course');
const User = require('../models/user');
const Tag = require('../models/Tag');
const {uploadImageToCloudinary} = require('../utils/imageUploader'); 
require('dotenv').config();

exports.createCourse = async(req, res) => {
    try {

        const {name, description, learning, price, tag} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!name || !description || !learning || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success:false,
                message: "All fields are required!"
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details:", instructorDetails);
        // verify userid and instructor id same or diffrent??

        // if instructor not found
        if(!instructorDetails) {
            return res.status(404).json({
                success : false,
                message: "Instructor not found"
            })
        }

        // check given tag is valid or not
        const tagDetails = await Tag.findById(tag)
        if(!tagDetails) {
            return res.status(404).json({
                success : false,
                message: "tag not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            name, description, learning, price, instructor: instructorDetails._id,
            tag: tagDetails._id, thumbnail: thumbnailImage.secure_url
        })

        // add the new course in the user schema of instructor
        await User.findByIdAndUpdate({_id: instructorDetails._id}, {$push: {courses: newCourse._id}}, {new: true})

        // update tag schema
        await Tag.findByIdAndUpdate({_id: tagDetails._id}, {$push : {course: newCourse._id}}, {new: true})

        return res.status(200).json({
            success:true,
            message:"course added successfully",
            data: newCourse
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "Error occured while creating Course"
        })
    }
}

// getAllCourses handler function
exports.getAllCourses = async(req, res) => {
    try {

        const allCourses = Course.find({});

        return res.status(200).json({
            success:true,
            message: "All courses fetched succesfully!",
            data: allCourses
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "Error occcured while get all courses"
        })
    }
}

// get all couse detail
exports.getAllCourseDetail = async(req, res) => {
    try {
        const {courseId} = req.body;

        const course = await Course.find({_id:courseId}).populate(
                                                            {
                                                                path: "instructor",
                                                                populate:{
                                                                    path: "additionalDetails"
                                                                }
                                                            }
                                                        ).populate("tags").populate("rateReview").populate(
                                                                                                    {
                                                                                                        path: "courseContent",
                                                                                                        populate:{
                                                                                                            path:"section",
                                                                                                            populate: {
                                                                                                                path:"subSection"
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                ).populate("studentEnroll").exec()
        if(!course) {
            return res.status(400).json({
                success:false,
                message: "course details not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: course
        })
    } catch(err) {
        return res.status(500).json({
            success:false,
            message: "error occured while fetching course details"
        })
    }
}