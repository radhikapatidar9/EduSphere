const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now(),
        required: true,
        expires: 5*60
    },
    otp: {
        type: String,
        required: true
    }

})

// a function -> to send mails
async function sendVerificationEmail(email, otp) {
    try {

        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
        console.log("Email Sent Successfully!", mailResponse);

    } catch(err) {
        console.log("Error occured while sending email", err)
    }
}

otpSchema.pre("save", async function() {
    await sendVerificationEmail(this.email, this.otp);
    // next();
})

module.exports = mongoose.model("Otp", otpSchema);