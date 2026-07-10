const Tag = require('../models/Tag');

exports.createCategory = async(req, res) => {
    try {

        // fetch data from req body
        const {name, description} = req.body;

        // validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message: "All fields are required!"
            })
        }

        // create entry in DB
        const tagDetails = await Tag.create({name, description});

        // return success response
        return res.status(200).json({
            success:true,
            message: "Tag created successfully!",
            tagDetails
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "Error occured while creating tag!"
        })
    }
}

// get all tags handler function
exports.showAllCategory = async(req, res) => {
    try {

        const allTags = await Tag.find({}, {name: true, description: true});

        res.status(200).json({
            success:true,
            message: "All tags fetched successfully!",
            allTags
        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Error occured while fetching all tags"
        })
    }
}

// categoryPageDetails
exports.categoryPageDetails = async(req, res) => {
    try {

        // getcourseId
        const {categoryId} = req.body;

        // get courses for specific category
        const selectedCategory = await Tag.findById(categoryId).populate("course").exec()

        // validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message: "data not found"
            })
        }
        // get courses for diffeerent category
        const differentCategories = await Tag.find({_id: {$ne: categoryId}}).populate("course");
        // get top selling courses ?

        // return responce
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory, differentCategories
            }
        })

    } catch(err) {
        return res.status(500).json({
            success:false,
            message: "error occcured while fetch all category details"
        })
    }
}