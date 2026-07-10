const express = require('express');
const router = express.Router();

const {auth} = require('../middlewares/auth');
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails
    // updateDisplayPicture,
    // getEnrolledCourses
} = require('../controllers/Profile');

// delete user account
router.delete("/deleteProfile",auth, deleteAccount);
router.put("/updateProfile", auth,  updateProfile);
router.get("/getAllUserDetails",auth, getAllUserDetails);

// router.get("/getEnrolledCourses", getEnrolledCourses);
// router.put("/updateDisplayPicture", updateDisplayPicture);

module.exports = router;