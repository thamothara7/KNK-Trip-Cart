'use server';

import { connectToDatabase } from './mongodb';
import Package from './models/Package';
import Gallery from './models/Gallery';
import Testimonial from './models/Testimonial';
import { revalidatePath } from 'next/cache';

// Package Actions
export async function getPackages() {
    await connectToDatabase();
    const packages = await Package.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(packages));
}

export async function getPackageById(id) {
    await connectToDatabase();
    const pkg = await Package.findById(id).lean();
    return JSON.parse(JSON.stringify(pkg));
}

export async function createPackage(data) {
    await connectToDatabase();
    const newPackage = await Package.create(data);
    revalidatePath('/admin');
    revalidatePath('/packages');
    return JSON.parse(JSON.stringify(newPackage));
}

export async function updatePackage(id, data) {
    await connectToDatabase();
    const updated = await Package.findByIdAndUpdate(id, data, { new: true }).lean();
    revalidatePath('/admin');
    revalidatePath('/packages');
    return JSON.parse(JSON.stringify(updated));
}

export async function deletePackage(id) {
    await connectToDatabase();
    await Package.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/packages');
    return { success: true };
}

// Gallery Actions
export async function getGallery() {
    await connectToDatabase();
    const gallery = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(gallery));
}

export async function createGalleryItem(data) {
    await connectToDatabase();
    const newItem = await Gallery.create(data);
    revalidatePath('/admin');
    revalidatePath('/gallery');
    return JSON.parse(JSON.stringify(newItem));
}

export async function deleteGalleryItem(id) {
    await connectToDatabase();
    await Gallery.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/gallery');
    return { success: true };
}

// Testimonial Actions
export async function getTestimonials() {
    await connectToDatabase();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(testimonials));
}

export async function createTestimonial(data) {
    try {
        console.log("Saving Testimonial Data:", { ...data, imageUrl: data.imageUrl ? data.imageUrl.substring(0, 50) + '...' : 'none' });
        await connectToDatabase();
        const newTestimonial = await Testimonial.create(data);
        revalidatePath('/admin');
        revalidatePath('/'); // assuming testimonials are shown on home page
        return JSON.parse(JSON.stringify(newTestimonial));
    } catch (error) {
        console.error("Error creating testimonial:", error);
        throw new Error(error.message || "Failed to create testimonial");
    }
}

export async function deleteTestimonial(id) {
    await connectToDatabase();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
}
