const express = require('express');
const router = express.Router();

// import course controllers
const {createCourse, getAllCourses, getAllCourseDetail} = require('../controllers/Course');

// import category controllers
const {createCategory, showAllCategory, categoryPageDetails} = require('../controllers/Tags');

// import section controllers
const {createSection, updateSection, deleteSection} = require('../controllers/Section');

// import subSection controllers
const {createSubSection, updateSubSection } = require('../controllers/SubSection');

// import rating controllers
const {rateAndReview, getAllRating, getAverageRating} = require('../controllers/RateReview');

// import middlewares
const {auth, isAdmin, isInstructor, isStudent} = require('../middlewares/auth');

// course routes
router.post("/createCourse", auth, isInstructor, createCourse);
// add a section to a course
router.post("/createSection", auth, isInstructor, createSection);
// update section
router.post("/updateSection", auth, isInstructor, updateSection);
// deleteSection
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// add subSection
router.post("/createSubSection", auth, isInstructor, createSubSection);
// updateSubSection
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

// get all registered courses
router.get("/getAllCourses", getAllCourses);

// get details for a specific course
router.post("/getAllCourseDetails", getAllCourseDetail);

// category routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/getAllCategory", showAllCategory);
router.post("/categoryDetails", categoryPageDetails);

// rating and review routes
router.post("/createRating", auth, isStudent, rateAndReview);
router.get("/getAllRating", getAllRating);
router.post("/getAvgRating", getAverageRating);  //get

module.exports = router;
