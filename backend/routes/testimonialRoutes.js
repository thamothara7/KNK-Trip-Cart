const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial, approveTestimonial, getAllTestimonials } = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getTestimonials).post(createTestimonial);
router.route('/all').get(protect, getAllTestimonials);
router.route('/:id/approve').put(protect, approveTestimonial);

module.exports = router;
