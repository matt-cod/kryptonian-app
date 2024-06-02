const express = require('express');
const { register, login, verifyOtp, generateApiKey } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/generate-api-key', generateApiKey);

module.exports = router;
