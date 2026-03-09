"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaPlus, FaTimes, FaCheck, FaLink, FaBox, FaImage, FaSignOutAlt, FaStar } from 'react-icons/fa';
import GalleryManager from './GalleryManager';
import TestimonialManager from './TestimonialManager';
import { getPackages, createPackage, updatePackage, deletePackage } from '../lib/actions';

const CATEGORIES = ['South India Tours', 'North India Tours', 'Hills Trip', 'One Day Trip', 'Char Dham Yatra'];

const emptyForm = {
    title: '', destination: '', duration: '',
    category: 'South India Tours', price: '', description: '',
    imageUrl: '', imagePreview: ''
};

const AdminDashboard = () => {
    const [authed, setAuthed] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });

    // Core state
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('packages'); // packages | gallery

    // Form state
    const [form, setForm] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [saved, setSaved] = useState(false);

    // Initial Fetch
    const fetchPackages = async () => {
        setLoading(true);
        try {
            const data = await getPackages();
            setPackages(data || []);
        } catch (error) {
            console.error(error);
            setPackages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authed) fetchPackages();
    }, [authed]);

    // Auth
    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.username === 'admin' && loginData.password === 'knk@2024') setAuthed(true);
        else alert('Wrong credentials. Use: admin / knk@2024');
    };

    // Images (URL or Base64 strictly)
    const handleImageUrl = (e) => {
        const val = e.target.value;
        setForm(f => ({ ...f, imageUrl: val, imagePreview: val }));
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
            setForm(f => ({ ...f, imageUrl: base64String, imagePreview: base64String }));
        };
        reader.readAsDataURL(file);
    };

    // Form submission
    const handleSave = async (e) => {
        e.preventDefault();

        const pkgData = {
            title: form.title.trim(),
            destination: form.destination.trim(),
            duration: form.duration.trim(),
            category: form.category,
            price: Number(form.price),
            description: form.description.trim(),
            images: [form.imageUrl || form.imagePreview || ''],
        };

        if (!pkgData.title || !pkgData.destination || !pkgData.duration || !pkgData.price || !pkgData.description) {
            alert('Please fill all required fields: Title, Destination, Duration, Price, and Description.');
            return;
        }

        try {
            if (editId) {
                await updatePackage(editId, pkgData);
            } else {
                await createPackage(pkgData);
            }

            await fetchPackages();
            setForm(emptyForm);
            setShowForm(false);
            setEditId(null);

            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save package. Check server connection.');
        }
    };

    // Edit Initialization
    const startEdit = (pkg) => {
        setForm({
            title: pkg.title, destination: pkg.destination,
            duration: pkg.duration, category: pkg.category,
            price: pkg.price, description: pkg.description,
            imageUrl: pkg.images?.[0] || '', imagePreview: pkg.images?.[0] || ''
        });
        setEditId(pkg._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Deletion
    const handleDelete = async (pkg) => {
        if (!window.confirm(`Delete "${pkg.title}"? This cannot be undone.`)) return;
        try {
            await deletePackage(pkg._id);
            await fetchPackages();
        } catch {
            alert('Failed to delete package.');
        }
    };

    // --- Login Screen ---
    if (!authed) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-md border-2 border-amber-300/40 shadow-2xl shadow-maroon/5"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-serif font-bold text-maroon">Admin Access</h2>
                        <p className="text-sm mt-2 text-maroon/60">KNK Trip Cart secured dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">Username</label>
                                <input
                                    type="text"
                                    required
                                    value={loginData.username}
                                    onChange={e => setLoginData(d => ({ ...d, username: e.target.value }))}
                                    className="w-full px-5 py-4 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-maroon/70">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={loginData.password}
                                    onChange={e => setLoginData(d => ({ ...d, password: e.target.value }))}
                                    className="w-full px-5 py-4 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 mt-2 font-bold text-lg rounded-xl text-maroon bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/20"
                        >
                            Log In
                        </motion.button>
                        <p className="text-center text-xs text-maroon/40 pt-2">Default: admin / knk@2024</p>
                    </form>
                </motion.div>
            </div>
        );
    }

    // --- Main Dashboard ---
    return (
        <div className="min-h-screen pb-20 pt-10 px-4 sm:px-6 lg:px-8 bg-cream">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-maroon">Dashboard</h1>
                        <p className="text-sm sm:text-base mt-2 text-maroon/60">Manage your packages, tours, and gallery collections.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
                        <AnimatePresence>
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-100 text-green-700 font-bold text-sm"
                                >
                                    <FaCheck /> Saved
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {activeTab === 'packages' && (
                            <motion.button
                                onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm sm:text-base text-maroon bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/20"
                            >
                                {showForm ? <><FaTimes /> Close Form</> : <><FaPlus /> Add Package</>}
                            </motion.button>
                        )}

                        <button
                            onClick={() => setAuthed(false)}
                            className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-maroon/70 border-2 border-maroon/10 hover:bg-maroon/5 transition-all"
                        >
                            <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 sm:gap-6 border-b-2 border-amber-500/20 mb-8 overflow-x-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('packages')}
                        className={`pb-3 px-2 sm:px-4 font-bold text-base sm:text-lg flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'packages' ? 'border-b-4 border-amber-500 text-amber-600' : 'text-maroon/50 hover:text-maroon/70'}`}
                    >
                        <FaBox /> Manage Packages
                    </button>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`pb-3 px-2 sm:px-4 font-bold text-base sm:text-lg flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'gallery' ? 'border-b-4 border-amber-500 text-amber-600' : 'text-maroon/50 hover:text-maroon/70'}`}
                    >
                        <FaImage /> Photo Gallery
                    </button>
                    <button
                        onClick={() => setActiveTab('testimonials')}
                        className={`pb-3 px-2 sm:px-4 font-bold text-base sm:text-lg flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'testimonials' ? 'border-b-4 border-amber-500 text-amber-600' : 'text-maroon/50 hover:text-maroon/70'}`}
                    >
                        <FaStar /> Testimonials
                    </button>
                </div>

                {/* --- Packages Tab Content --- */}
                {activeTab === 'packages' ? (
                    <>
                        {/* Package Form */}
                        <AnimatePresence>
                            {showForm && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    onSubmit={handleSave}
                                    className="bg-white rounded-3xl p-6 sm:p-8 mb-10 border-2 border-amber-200/60 shadow-xl shadow-maroon/5 overflow-hidden"
                                >
                                    <h3 className="text-2xl font-serif font-bold mb-6 text-maroon">
                                        {editId ? 'Edit Tour Package' : 'Create New Package'}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                        {[
                                            { label: 'Package Title', key: 'title', ph: 'e.g. Tirupati Balaji Darshan' },
                                            { label: 'Destination', key: 'destination', ph: 'e.g. Tirupati, Andhra Pradesh' },
                                            { label: 'Duration', key: 'duration', ph: 'e.g. 2 Days / 1 Night' },
                                            { label: 'Price (₹)', key: 'price', ph: 'e.g. 3500', type: 'number' },
                                        ].map(field => (
                                            <div key={field.key}>
                                                <label className="block text-sm font-semibold mb-2 text-maroon/70">{field.label}</label>
                                                <input
                                                    type={field.type || 'text'}
                                                    required
                                                    placeholder={field.ph}
                                                    value={form[field.key]}
                                                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                                    className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-cream text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all text-sm sm:text-base"
                                                />
                                            </div>
                                        ))}

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold mb-2 text-maroon/70">Category Segment</label>
                                            <select
                                                value={form.category}
                                                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                                className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-cream text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all font-semibold"
                                            >
                                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-semibold mb-2 text-maroon/70">Detailed Description</label>
                                        <textarea
                                            required
                                            rows="4"
                                            placeholder="Write a descriptive summary of the tour..."
                                            value={form.description}
                                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                            className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-cream text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all resize-none text-sm sm:text-base"
                                        />
                                    </div>

                                    {/* Image URL Section */}
                                    <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                                        <h4 className="font-serif font-bold text-lg text-maroon mb-4">Display Image</h4>
                                        <div className="flex flex-col lg:flex-row gap-6">

                                            <div className="flex-1 space-y-4">
                                                <div>
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

                                                <div className="flex items-center gap-4">
                                                    <div className="h-px bg-amber-200/50 flex-1"></div>
                                                    <span className="text-xs font-bold text-maroon/40 uppercase tracking-widest">OR</span>
                                                    <div className="h-px bg-amber-200/50 flex-1"></div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold mb-2 text-maroon/70">
                                                        <FaLink className="inline mr-1" /> Image URL Link (Pexels, Unsplash, Google)
                                                    </label>
                                                    <input
                                                        type="url"
                                                        placeholder="https://images.pexels.com/..."
                                                        value={form.imageUrl && form.imageUrl.startsWith('http') ? form.imageUrl : ''}
                                                        onChange={handleImageUrl}
                                                        className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm"
                                                    />
                                                    <p className="text-xs text-maroon/50 mt-2 font-medium">Use Base64 file upload or external links. Avoid heavy direct static files.</p>
                                                </div>
                                            </div>

                                            {/* Preview */}
                                            {form.imagePreview && (
                                                <div className="relative w-full lg:w-48 shrink-0 rounded-2xl overflow-hidden shadow-inner border border-black/5 aspect-video lg:aspect-square bg-gray-100">
                                                    <img
                                                        src={form.imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={e => { e.target.style.display = 'none'; }}
                                                    />
                                                    <div className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded bg-black/60 text-white font-bold tracking-wider uppercase">
                                                        Preview
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-amber-100">
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-4 font-bold text-lg rounded-xl text-maroon bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/20"
                                        >
                                            {editId ? 'Save Changes' : 'Create Package'}
                                        </motion.button>
                                        <button
                                            type="button"
                                            onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}
                                            className="flex-1 sm:flex-none sm:px-10 py-4 rounded-xl font-bold bg-gray-50 text-maroon/60 border border-gray-200 hover:bg-gray-100 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Package List / Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full py-20 flex flex-col items-center">
                                    <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
                                    <p className="text-maroon/50 font-serif text-lg">Loading packages...</p>
                                </div>
                            ) : packages.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full bg-white rounded-3xl p-16 text-center border-2 border-dashed border-amber-300/50"
                                >
                                    <p className="text-2xl font-serif font-bold text-maroon/40 mb-2">No packages yet</p>
                                    <p className="text-maroon/40">Click "Add Package" to start building your tours.</p>
                                </motion.div>
                            ) : packages.map((pkg, i) => (
                                <motion.div
                                    key={pkg._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="bg-white rounded-3xl overflow-hidden flex flex-col border border-amber-200/40 shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:shadow-amber-900/10 transition-shadow duration-300"
                                >
                                    {/* Card Image */}
                                    <div className="w-full h-48 sm:h-56 relative bg-gray-100 overflow-hidden">
                                        <img
                                            src={pkg.images?.[0] || 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg'}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover"
                                            onError={e => e.target.src = 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg'}
                                        />
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            {pkg.category}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <h4 className="font-serif justify-between font-bold text-xl text-maroon mb-1 line-clamp-2 leading-tight">
                                                {pkg.title}
                                            </h4>
                                            <p className="text-sm font-semibold text-amber-700/80 mb-3">
                                                {pkg.destination}
                                            </p>

                                            <div className="flex items-center gap-2 text-sm text-maroon/60 mb-4 bg-amber-50/50 py-2 px-3 rounded-lg border border-amber-100">
                                                <span className="font-bold text-maroon">Duration:</span> {pkg.duration}
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="text-xs font-bold text-maroon/40 uppercase tracking-wider mb-1">Pricing</p>
                                                <p className="font-bold text-2xl text-amber-500 leading-none">
                                                    ₹{pkg.price?.toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    onClick={() => startEdit(pkg)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                    aria-label="Edit Package"
                                                >
                                                    <FaEdit />
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => handleDelete(pkg)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                                    aria-label="Delete Package"
                                                >
                                                    <FaTrash />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : activeTab === 'gallery' ? (
                    // Gallery Tab
                    <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-xl shadow-stone-200/50 border border-amber-200/40">
                        <GalleryManager />
                    </div>
                ) : (
                    // Testimonials Tab
                    <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-xl shadow-stone-200/50 border border-amber-200/40">
                        <TestimonialManager />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
