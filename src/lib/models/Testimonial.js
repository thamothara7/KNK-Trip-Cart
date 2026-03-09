import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the testimonial'],
        trim: true,
    },
    review: {
        type: String,
        required: [true, 'Please provide the review text'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL (or Base64 string)'],
    },
    rating: {
        type: Number,
        required: false,
        default: 5,
        min: 1,
        max: 5
    }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
