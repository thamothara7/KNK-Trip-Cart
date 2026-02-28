const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContactStatus } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(submitContact).get(protect, getContacts);
router.route('/:id/status').put(protect, updateContactStatus);

module.exports = router;
