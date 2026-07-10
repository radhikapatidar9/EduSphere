const mongoose = require('mongoose');

//tag referes to category
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    course: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
})
module.exports = mongoose.model("Tag", tagSchema);