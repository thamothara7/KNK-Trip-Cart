const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String, required: true }, // e.g., "5 Days / 4 Nights"
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Domestic', 'International'], required: true },
    images: [{ type: String }], // Array of image URLs
    itinerary: [
        {
            day: { type: Number, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true }
        }
    ],
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Package', PackageSchema);
