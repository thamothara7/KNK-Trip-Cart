import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    category: { type: String, default: 'General' },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] }
}, {
    timestamps: true
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
