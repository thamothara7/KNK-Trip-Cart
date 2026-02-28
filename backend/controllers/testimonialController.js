const Testimonial = require('../models/Testimonial');

// @desc    Get approved testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ isApproved: true });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        const createdTestimonial = await testimonial.save();
        res.status(201).json(createdTestimonial);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Approve a testimonial
// @route   PUT /api/testimonials/:id/approve
// @access  Private/Admin
const approveTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (testimonial) {
            testimonial.isApproved = true;
            const updatedTestimonial = await testimonial.save();
            res.json(updatedTestimonial);
        } else {
            res.status(404).json({ message: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// @desc    Get all testimonials (including unapproved)
// @route   GET /api/testimonials/all
// @access  Private/Admin
const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getTestimonials, createTestimonial, approveTestimonial, getAllTestimonials };
