'use server';

import { connectToDatabase } from './mongodb';
import Package from './models/Package';
import Gallery from './models/Gallery';
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
