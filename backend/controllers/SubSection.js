const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

// create subsection
exports.createSubSection = async(req, res) => {
    try {

        const {title, timeDuration, description, sectionId} = req.body;

        const videoUrl = req.files?.videoUrl;

        // validation
        if(!title || !timeDuration || !description || !videoUrl || !sectionId) {
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        const section = await Section.findById(sectionId);
        if(!section) {
            return res.status(404).json({
                success:false,
                message: "Section not found for which we want to create sub section"
            })
        }

        // upload video to cloudinary
        console.log(uploadImageToCloudinary);
        const uploadVideo = await uploadImageToCloudinary(videoUrl, process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({
            title, timeDuration, description, videoUrl:uploadVideo.secure_url
        });

        await Section.findByIdAndUpdate({_id: sectionId}, {$push: {subSection: newSubSection._id}}, {new:true}).populate('subSection');

        return res.status(200).json({
            success:true,
            message: "Subsection created successfuly",
            newSubSection
        })



    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Error occured while creating sub section",
            
        })
    }
}

// update subsection
exports.updateSubSection = async(req, res) => {
    try {

        const {title, timeDuration, description, videoUrl, subSectionId} = req.body;

        // validation
        if(!title || !timeDuration || !description || !videoUrl || !subSectionId) {
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            })
        }

        const subSection = await SubSection.findById(subSectionId);
        if(!subSection) {
            return res.status(404).json({
                success:false,
                message: "sub Section not found"
            })
        }

        // upload video to cloudinary
        const uploadVideo = await uploadFileToCloudinary(videoUrl, process.env.FOLDER_NAME);

        const updateSubSection = await SubSection.findByIdAndUpdate(subSectionId,{
            title, timeDuration, description, videoUrl:uploadVideo.secure_url,
        }, {new:true});

        return res.status(200).json({
            success:true,
            message: "Subsection updated successfuly",
            updateSubSection
        })



    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Error occured while creating sub section".
            newSubSection
        })
    }
}

// delete subSection