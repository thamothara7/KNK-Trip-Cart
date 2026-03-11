'use server';

import { connectToDatabase } from './mongodb';
import Package   from './models/Package';
import Gallery   from './models/Gallery';
import Testimonial from './models/Testimonial';
import Category  from './models/Category';
import { revalidatePath } from 'next/cache';
import { checkAuth } from './auth';

// ─── Helper ──────────────────────────────────────────────────────────────────
async function requireAuth() {
    const ok = await checkAuth();
    if (!ok) throw new Error('Unauthorized: Admin login required.');
}

// ─── Package Actions ──────────────────────────────────────────────────────────
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
    await requireAuth();
    await connectToDatabase();
    const newPackage = await Package.create({
        ...data,
        inventory: Number(data.inventory) || 0,
    });
    revalidatePath('/admin');
    revalidatePath('/packages');
    return JSON.parse(JSON.stringify(newPackage));
}

export async function updatePackage(id, data) {
    await requireAuth();
    await connectToDatabase();
    const updated = await Package.findByIdAndUpdate(
        id,
        { ...data, inventory: Number(data.inventory) || 0 },
        { new: true }
    ).lean();
    revalidatePath('/admin');
    revalidatePath('/packages');
    return JSON.parse(JSON.stringify(updated));
}

export async function deletePackage(id) {
    await requireAuth();
    await connectToDatabase();
    await Package.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/packages');
    return { success: true };
}

// ─── Gallery Actions ──────────────────────────────────────────────────────────
export async function getGallery() {
    await connectToDatabase();
    const gallery = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(gallery));
}

export async function createGalleryItem(data) {
    await requireAuth();
    await connectToDatabase();
    const newItem = await Gallery.create(data);
    revalidatePath('/admin');
    revalidatePath('/gallery');
    return JSON.parse(JSON.stringify(newItem));
}

export async function deleteGalleryItem(id) {
    await requireAuth();
    await connectToDatabase();
    await Gallery.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/gallery');
    return { success: true };
}

// ─── Testimonial Actions ──────────────────────────────────────────────────────
export async function getTestimonials() {
    await connectToDatabase();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(testimonials));
}

export async function createTestimonial(data) {
    await requireAuth();
    try {
        await connectToDatabase();
        const newTestimonial = await Testimonial.create(data);
        revalidatePath('/admin');
        revalidatePath('/');
        return JSON.parse(JSON.stringify(newTestimonial));
    } catch (error) {
        console.error('Error creating testimonial:', error);
        throw new Error(error.message || 'Failed to create testimonial');
    }
}

export async function deleteTestimonial(id) {
    await requireAuth();
    await connectToDatabase();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
}

// ─── Category Actions ─────────────────────────────────────────────────────────
export async function getCategories() {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
}

export async function createCategory(name) {
    await requireAuth();
    await connectToDatabase();
    try {
        const cat = await Category.create({ name: name.trim() });
        revalidatePath('/admin');
        revalidatePath('/packages');
        return JSON.parse(JSON.stringify(cat));
    } catch (e) {
        if (e.code === 11000) throw new Error('Category already exists.');
        throw e;
    }
}

export async function deleteCategory(id) {
    await requireAuth();
    await connectToDatabase();
    await Category.findByIdAndDelete(id);
    revalidatePath('/admin');
    revalidatePath('/packages');
    return { success: true };
}
