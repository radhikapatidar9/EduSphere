const express = require('express');
const router = express.Router();

const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth');

const {capturePayment, verifySignature} = require('../controllers/Payments');

router.post("/capturePayment", capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
