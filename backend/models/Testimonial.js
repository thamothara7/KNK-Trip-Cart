const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    authorName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
