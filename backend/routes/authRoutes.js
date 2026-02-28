const express = require('express');
const router = express.Router();
const { authAdmin, setupInitialAdmin } = require('../controllers/authController');

router.post('/login', authAdmin);
router.post('/setup', setupInitialAdmin);

module.exports = router;
