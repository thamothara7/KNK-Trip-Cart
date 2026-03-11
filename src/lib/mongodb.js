import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/knktripcart';

if (!MONGODB_URI || (!process.env.MONGODB_URI && !process.env.MONGO_URI)) {
    console.warn('⚠️ No MONGODB_URI or MONGO_URI environment variable defined. Falling back to local MongoDB.');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            // Optimized settings for Severless environments (like Vercel)
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('✅ Connected to MongoDB');
            return mongoose;
        }).catch((error) => {
            console.error('❌ MongoDB connection error:', error);
            cached.promise = null; // Reset promise on failure so it can be retried
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    
    return cached.conn;
}
