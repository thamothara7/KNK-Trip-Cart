"use client";
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCloudUploadAlt, FaTimes, FaLink } from 'react-icons/fa';
import { getGallery, createGalleryItem, deleteGalleryItem } from '../lib/actions';
const UploadStatus = ({ state }) => {
    if (!state) return null;
    const map = {
        uploading: { text: 'Uploading…', color: '#f59e0b', bg: 'rgba(251,191,36,0.1)' },
        success: { text: ' Upload complete', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
        error: { text: ' Upload failed. Try URL mode.', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
        offline: { text: ' Backend offline.', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
    };
    const s = map[state] || {};
    return (
        <div className="mt-2 px-3 py-2 rounded-xl text-sm font-semibold" style={{ color: s.color, background: s.bg }}>
            {s.text}
        </div>
    );
};

export default function GalleryManager() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [uploadState, setUploadState] = useState(null);
    const fileInputRef = useRef(null);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const data = await getGallery();
            setImages(data || []);
        } catch (error) {
            console.error(error);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleImageFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target.result);
        reader.readAsDataURL(file);

        setUploadState('uploading');
        const data = new FormData();
        data.append('image', file);
        try {
            const res = await fetch(`/api/upload`, { method: 'POST', body: data });
            if (!res.ok) throw new Error('Server error');
            const json = await res.json();
            setImageUrl(json.url);
            setImagePreview(json.url);
            setUploadState('success');
        } catch (err) {
            if (err.message?.includes('fetch') || err.name === 'TypeError') setUploadState('offline');
            else setUploadState('error');
        }
    };

    const handleImageUrl = (e) => {
        const val = e.target.value;
        setImageUrl(val);
        setImagePreview(val);
        setUploadState(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!imageUrl) return alert('Please upload or provide an image URL');
        try {
            await createGalleryItem({ title, imageUrl });
            await fetchImages();
            setTitle('');
            setImageUrl('');
            setImagePreview('');
            setUploadState(null);
        } catch (err) {
            alert('Failed to save image. Server may be offline.');
        }
    };

    const handleDelete = async (img) => {
        if (!window.confirm('Delete this image?')) return;
        try {
            if (img.imageUrl?.includes('/uploads/')) {
                // Delete API if we implement it, ignore for now
            }
            await deleteGalleryItem(img._id);
            await fetchImages();
        } catch {
            alert('Failed to delete image.');
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#7c2d12' }}>Add to Gallery</h2>
            <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 mb-8" style={{ border: '2px solid rgba(251,191,36,0.3)' }}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>Image Title / Description (Optional)</label>
                    <input type="text" placeholder="e.g. Kedarnath Yatra 2023" value={title} onChange={e => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border outline-none" style={{ borderColor: 'rgba(251,191,36,0.4)', background: '#fffdf5' }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>Upload to Server</label>
                        <label className="flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer hover:bg-amber-50"
                            style={{ border: '2px dashed rgba(251,191,36,0.6)', minHeight: '80px' }}>
                            <FaCloudUploadAlt className="text-2xl mb-1" style={{ color: '#f59e0b' }} />
                            <span className="text-xs text-center" style={{ color: 'rgba(120,53,15,0.6)' }}>Click to upload JPG / PNG</span>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageFile} className="hidden" />
                        </label>
                        <UploadStatus state={uploadState} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}><FaLink className="inline mr-1" /> Or Paste URL</label>
                        <input type="url" placeholder="https://..." value={imageUrl} onChange={handleImageUrl}
                            className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: 'rgba(251,191,36,0.4)', background: '#fffdf5', minHeight: '80px' }} />
                    </div>
                </div>

                <AnimatePresence>
                    {imagePreview && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="relative mb-4 rounded-2xl overflow-hidden mt-4">
                            <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-2xl" onError={e => e.target.style.display = 'none'} />
                            <button type="button" onClick={() => { setImageUrl(''); setImagePreview(''); setUploadState(null); }}
                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">
                                <FaTimes />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button type="submit" className="w-full py-3 font-bold text-lg rounded-xl"
                    style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#7c2d12', boxShadow: '0 4px 15px rgba(251,191,36,0.4)' }}>
                    Add Gallery Image
                </button>
            </form>

            <h3 className="text-xl font-serif font-bold mb-4" style={{ color: '#7c2d12' }}>Current Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {loading ? <p>Loading...</p> : images.map(img => (
                    <div key={img._id} className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '1/1' }}>
                        <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                            <p className="text-white text-xs font-semibold truncate mb-1">{img.title}</p>
                            <button onClick={() => handleDelete(img)} className="bg-red-500 text-white p-2 rounded-lg text-sm flex items-center justify-center gap-1">
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
