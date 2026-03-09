"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaTimes, FaLink, FaStar, FaImage } from 'react-icons/fa';
import { getTestimonials, createTestimonial, deleteTestimonial } from '../lib/actions';

export default function TestimonialManager() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [rating, setRating] = useState(5);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const data = await getTestimonials();
            setTestimonials(data || []);
        } catch (error) {
            console.error(error);
            setTestimonials([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
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
        if (!name || !review) return alert('Please fill in all details');

        try {
            await createTestimonial({
                name: name.trim(),
                review: review.trim(),
                imageUrl: imageUrl.trim(),
                rating: Number(rating)
            });
            await fetchTestimonials();

            setName('');
            setReview('');
            setImageUrl('');
            setImagePreview('');
            setRating(5);
        } catch (err) {
            alert('Failed to save testimonial. Server connection error.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this testimonial?')) return;
        try {
            await deleteTestimonial(id);
            await fetchTestimonials();
        } catch {
            alert('Failed to delete testimonial.');
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-serif font-bold mb-6 text-maroon">Manage Testimonials</h2>

            <form
                onSubmit={handleSave}
                className="bg-amber-50/40 rounded-3xl p-6 sm:p-8 mb-10 border border-amber-200/60 shadow-lg shadow-maroon/5"
            >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Inputs */}
                    <div className="flex-1 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Ramesh Kumar"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                    Rating (1-5)
                                </label>
                                <input
                                    type="number"
                                    min="1" max="5"
                                    required
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                Review Text
                            </label>
                            <textarea
                                required
                                rows="3"
                                placeholder="Describe the brilliant experience..."
                                value={review}
                                onChange={e => setReview(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm resize-none"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 border border-amber-200/50 p-4 rounded-2xl bg-white/50">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                    <FaImage className="inline mr-1" /> Customer Avatar (Local)
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleFileUpload}
                                    className="w-full text-sm text-maroon file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 transition-all cursor-pointer border border-amber-200 bg-white rounded-xl h-[50px] flex items-center px-1"
                                />
                            </div>

                            <div className="hidden md:flex flex-col items-center justify-center px-1">
                                <span className="text-[10px] font-bold text-maroon/40 uppercase tracking-widest my-2">OR</span>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                    <FaLink className="inline mr-1" /> Customer Avatar (URL)
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://randomuser.me/..."
                                    value={imageUrl && imageUrl.startsWith('http') ? imageUrl : ''}
                                    onChange={handleImageUrl}
                                    className="w-full px-4 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm h-[50px]"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full sm:w-auto px-8 py-3.5 mt-2 font-bold text-base rounded-xl text-maroon bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/20"
                        >
                            Publish Testimonial
                        </motion.button>
                    </div>

                    {/* Preview Area */}
                    <div className="w-full lg:w-48 shrink-0">
                        <label className="block text-sm font-semibold mb-2 text-maroon/70 invisible hidden lg:block">
                            Avatar
                        </label>
                        <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-inner border-4 border-amber-200/40 bg-gray-100 flex items-center justify-center">
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
                                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-colors"
                                        >
                                            <FaTimes size={10} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center p-4 flex flex-col items-center justify-center"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mb-1">
                                            <FaLink size={14} />
                                        </div>
                                        <p className="text-[10px] font-semibold text-maroon/40 uppercase tracking-widest text-center">Avatar</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </form>

            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif font-bold text-maroon">Published Testimonials ({testimonials.length})</h3>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-3" />
                </div>
            ) : testimonials.length === 0 ? (
                <div className="text-center py-16 bg-white border-2 border-dashed border-amber-200/60 rounded-3xl">
                    <p className="text-lg font-serif font-bold text-maroon/40 mb-1">No testimonials yet</p>
                    <p className="text-sm text-maroon/40">Add customer reviews above to showcase them.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testi, i) => (
                        <motion.div
                            key={testi._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="relative bg-white p-6 rounded-2xl shadow-xl shadow-stone-200/50 border border-amber-900/5 flex flex-col"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img src={testi.imageUrl} alt={testi.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-200" />
                                <div>
                                    <h4 className="font-bold text-maroon">{testi.name}</h4>
                                    <div className="flex text-amber-400 text-sm">
                                        {[...Array(testi.rating || 5)].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-maroon/70 italic flex-1 flex-grow mb-4 line-clamp-4">"{testi.review}"</p>

                            <div className="flex justify-end mt-auto pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => handleDelete(testi._id)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-semibold"
                                >
                                    <FaTrash size={12} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
