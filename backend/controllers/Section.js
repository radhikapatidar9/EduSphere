const Section = require('../models/Section');
const Course = require('../models/Course');

// create section
exports.createSection = async(req, res) => {
    try {

        // fetch data
        const {name, courseId} = req.body;

        // validation
        if(!name || !courseId) {
            return res.status(400).json({
                success:false,
                message: "All fields are required!"
            })
        }

        const findCourse = await Course.findById(courseId)
        if(!findCourse) {
            return res.status(404).json({
                success:false,
                message: "Course not found"
            })
        }

        const newSection = await Section.create({
            name: name,
        })

        await Course.findByIdAndUpdate({_id: courseId}, {$push: {courseContent: newSection._id}}, {new:true});
        // use populate to replace section/sub-section idz by data

        
        return res.status(200).json({
            success:true,
            message: "Section created successfully",
            newSection,

        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Error occured while creating section"
        })
    }
}

// update section
exports.updateSection = async(req, res) => {
    try {

        // fetch data
        const {name, sectionId} = req.body;

        // validation
        if(!name || !sectionId) {
            return res.status(400).json({
                success:false,
                message: "All fields are required!"
            })
        }

        const findSection = await Section.findById(sectionId)
        if(!findSection) {
            return res.status(404).json({
                success:false,
                message: "Section not found"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            name: name,
        }, {new:true})
        
        return res.status(200).json({
            success:true,
            message: "Section updated successfully",
            newSection,

        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Error occured while updating section"
        })
    }
}

// delete section 
exports.deleteSection = async(req, res) => {
    try {

        // fetch data
        const {sectionId} = req.body;

        // validation
        if(!sectionId) {
            return res.status(400).json({
                success:false,
                message: "All fields are required!"
            })
        }

        const findSection = await Section.findById(sectionId)
        if(!findSection) {
            return res.status(404).json({
                success:false,
                message: "Section not found"
            })
        }

        await Section.findByIdAndDelete(sectionId);

        await Course.findOne({$pull : {courseContent : sectionId}}, {new:true});  //doubt
        // do we need to delete section id from course
        
        return res.status(200).json({
            success:true,
            message: "Section deleted successfully",

        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Error occured while deleting section"
        })
    }
}