const Razorpay = require('razorpay');
const {instance} = require('../config/razorpay');
const User = require('../models/user');
const Course = require('../models/Course');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');

// capture the payment and initiate razorpay order
exports.capturePayment = async(req, res) => {
    try {

        // get userid and courseid
        const {course_id} = req.body;
        const user_id = req.user.id;

        // validation
        if(!course_id) {
            return res.status(401).json({
                success:false,
                message: "Enter valid course id"
            })
        }

        // valid course detail
        let course;
        try {

            course = await Course.findById(course_id);
            if(!course) {
                return res.status(401).json({
                success:false,
                message: "could not find the course"
            })
            }

            // user already pay for same course
            const uid = new mongoose.Types.ObjectId(user_id);
            if(course.studentEnroll.includes(uid)) {
                return res.status(200).json({
                    success:false,
                    message: "User enrolled already"
                })
            }

        } catch(err) {
            console.log(err);
            return res.status(500).json({
                success:false,
                message: "error occured while validation of course detail"
            })
        }

        // order create
        const amount = course.price;
        const currency = "INR"

        const options = {
            amount: amount * 100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            note: {
                courseId: course_id,
                userId:user_id
            }
        }
        try {
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            // return response
            res.status(200).json({
                success:true,
                courseName: course.name,
                couseDescription: course.description,
                thumbnail: course.thumbNail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            })
        }
        catch(err) {
            console.log(err);
            return res.status(500).json({
                success:false,
                message: "could not initiate order"
            })
        }

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success:flase,
            message: "error occured while capture payment"
        })
    }
}

// Hmac - hashed based msg authentication code - (hashing algo, security key)
// Hsa - security hashing algo , no need for security key

exports.veryfySignature = async(req,res) => {
    try {

        const webhookSecret = "12345678"
        const signature = req.headers['x-razorpay-signature'];

        const shaSum = crypto.createHmac("sha256", webhookSecret);
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest("hex");

        if(signature === digest) {
            console.log("Payment is authorized");
        }

        const {userId, courseId} = req.body.payload.payment.entity.notes;
        try {

            // fulfill the action
            // find the course and enroll student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {id: courseId}, {$push: {studentEnroll: userId}}, {new: true}
            );
            if(!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "course not found"
                })
            }
            console.log(enrolledCourse);

            // find the student and update llist of enrollled course
            const enrolledStudent = await User.findOneAndUpdate(
                {id: userId}, {$push: {courses: courseId}}, {new: true}
            )
            if(!enrolledStudent) {
                 return res.status(500).json({
                    success: false,
                    message: "user not found"
                })
            }
            console.log(enrolledStudent);

            // send confirmation mail
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulation from Radhika",
                "Congratulations, you are onboarded into new course"
            )

            return res.status(200).json({
                success: true,
                message: "signature verified and course added"
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                success:false,
                message: err.message
            })
        }

    } catch(err) {
        console.log(err)
        return res.statuss(500).json({
            success:false,
            message: "invalid request"
        })
    }
}