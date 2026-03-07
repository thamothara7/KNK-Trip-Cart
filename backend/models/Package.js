const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ['South India Tours', 'North India Tours', 'Hills Trip', 'One Day Trip', 'Char Dham Yatra'],
        required: true
    },
    images: [{ type: String }],
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
