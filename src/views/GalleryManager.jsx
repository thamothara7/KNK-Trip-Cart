"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaTimes, FaLink, FaImage } from 'react-icons/fa';
import { getGallery, createGalleryItem, deleteGalleryItem } from '../lib/actions';

export default function GalleryManager() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');

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

    const handleImageUrl = (e) => {
        const val = e.target.value;
        setImageUrl(val);
        setImagePreview(val);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert("File is too large! Please select an image under 2MB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setImageUrl(base64String);
            setImagePreview(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!imageUrl) return alert('Please provide an image URL');

        try {
            await createGalleryItem({ title: title.trim(), imageUrl: imageUrl.trim() });
            await fetchImages();

            setTitle('');
            setImageUrl('');
            setImagePreview('');
        } catch (err) {
            alert('Failed to save image. Server connection error.');
        }
    };

    const handleDelete = async (imgId) => {
        if (!window.confirm('Remove this image from the gallery?')) return;
        try {
            await deleteGalleryItem(imgId);
            await fetchImages();
        } catch {
            alert('Failed to delete image.');
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-serif font-bold mb-6 text-maroon">Manage Gallery</h2>

            <form
                onSubmit={handleSave}
                className="bg-amber-50/40 rounded-3xl p-6 sm:p-8 mb-10 border border-amber-200/60 shadow-lg shadow-maroon/5"
            >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Inputs */}
                    <div className="flex-1 space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                Image Title/Caption (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Kedarnath Temple View"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                    <FaImage className="inline mr-1" /> Upload from Computer (Max 2MB)
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleFileUpload}
                                    className="w-full text-sm text-maroon file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 transition-all cursor-pointer border border-amber-200 bg-white rounded-xl h-12 flex items-center px-1"
                                />
                            </div>

                            <div className="hidden md:flex flex-col items-center justify-center px-2">
                                <div className="w-px bg-amber-200/50 flex-1"></div>
                                <span className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest my-2">OR</span>
                                <div className="w-px bg-amber-200/50 flex-1"></div>
                            </div>

                            <div className="flex md:hidden items-center justify-center py-2">
                                <div className="h-px bg-amber-200/50 flex-1"></div>
                                <span className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest mx-4">OR</span>
                                <div className="h-px bg-amber-200/50 flex-1"></div>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                    <FaLink className="inline mr-1" /> Image URL Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://images.pexels.com/..."
                                    value={imageUrl && imageUrl.startsWith('http') ? imageUrl : ''}
                                    onChange={handleImageUrl}
                                    className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto px-8 py-3.5 mt-2 font-bold text-base rounded-xl text-maroon bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/20"
                        >
                            Publish Image to Gallery
                        </motion.button>
                    </div>

                    {/* Preview Area */}
                    <div className="w-full lg:w-64 shrink-0">
                        <label className="block text-sm font-semibold mb-2 text-maroon/70 invisible hidden lg:block">
                            Preview
                        </label>
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-inner border border-amber-200/40 bg-gray-100 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {imagePreview ? (
                                    <motion.div
                                        key="preview"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={e => e.target.style.display = 'none'}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => { setImageUrl(''); setImagePreview(''); }}
                                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-colors"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                        <div className="absolute bottom-2 left-2 text-[10px] px-2 py-1 rounded-md bg-black/60 text-white font-bold tracking-wider uppercase">
                                            Preview
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center p-4"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2 text-amber-500">
                                            <FaLink size={20} />
                                        </div>
                                        <p className="text-xs font-semibold text-maroon/40 uppercase tracking-widest">No Image</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </form>

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold text-maroon">Published Gallery ({images.length})</h3>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-3" />
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-16 bg-white border-2 border-dashed border-amber-200/60 rounded-3xl">
                    <p className="text-lg font-serif font-bold text-maroon/40 mb-1">Your gallery is empty</p>
                    <p className="text-sm text-maroon/40">Paste an image link above to add photos.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {images.map((img, i) => (
                        <motion.div
                            key={img._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="relative group rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 shadow-xl shadow-stone-200/50 border border-amber-900/5"
                        >
                            <img
                                src={img.imageUrl}
                                alt={img.title || 'Gallery image'}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={e => e.target.src = 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=400'}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Hover Content */}
                            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(img._id)}
                                        className="w-8 h-8 rounded-full bg-red-500/90 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-sm shadow-lg transition-transform hover:scale-110"
                                        title="Delete Image"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>

                                {img.title && (
                                    <div>
                                        <p className="text-white text-sm font-bold truncate tracking-wide drop-shadow-md pb-1">
                                            {img.title}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
