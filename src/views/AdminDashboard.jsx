"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaTrash, FaEdit, FaPlus, FaTimes, FaCheck, FaLink,
    FaBox, FaImage, FaSignOutAlt, FaStar,
    FaBoxOpen, FaExclamationTriangle
} from 'react-icons/fa';
import GalleryManager from './GalleryManager';
import TestimonialManager from './TestimonialManager';
import {
    getPackages, createPackage, updatePackage, deletePackage,
    getCategories, createCategory, deleteCategory,
} from '../lib/actions';
import { adminLogin, adminLogout, checkAuth } from '../lib/auth';

// ─── empty form default ───────────────────────────────────────────────────────
const emptyForm = {
    title: '', destination: '', duration: '',
    category: '', price: '', description: '',
    imageUrl: '', imagePreview: '', inventory: 10,
};

// ─── sub‑component: CategoryManager ──────────────────────────────────────────
function CategoryManager({ categories, onRefresh }) {
    const [newCat, setNewCat] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newCat.trim()) return;
        setSaving(true);
        setError('');
        try {
            await createCategory(newCat.trim());
            setNewCat('');
            onRefresh();
        } catch (err) {
            setError(err.message || 'Failed to add category');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete category "${name}"? Packages using it will keep their category name but it won't appear in filters.`)) return;
        await deleteCategory(id);
        onRefresh();
    };

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/40 shadow-xl">
            <h3 className="text-2xl font-serif font-bold text-maroon mb-6 flex items-center gap-2">
                <FaTags className="text-amber-500" /> Manage Categories
            </h3>

            {/* Add form */}
            <form onSubmit={handleAdd} className="flex gap-3 mb-6">
                <input
                    type="text"
                    value={newCat}
                    onChange={e => setNewCat(e.target.value)}
                    placeholder="e.g. Char Dham Yatra"
                    className="flex-1 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all text-sm"
                />
                <motion.button
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-maroon disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                >
                    <FaPlus /> Add
                </motion.button>
            </form>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Category list */}
            {categories.length === 0 ? (
                <p className="text-maroon/50 text-center py-8">No categories yet. Add your first one above.</p>
            ) : (
                <div className="space-y-2">
                    {categories.map(cat => (
                        <div key={cat._id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-amber-50/60 border border-amber-100">
                            <span className="font-semibold text-maroon">{cat.name}</span>
                            <button
                                onClick={() => handleDelete(cat._id, cat.name)}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                aria-label="Delete category"
                            >
                                <FaTrash size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main AdminDashboard ──────────────────────────────────────────────────────
const AdminDashboard = () => {
    const [authed, setAuthed] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    const [packages, setPackages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('packages');

    const [form, setForm] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [saved, setSaved] = useState(false);

    // ── fetch helpers
    const fetchPackages = useCallback(async () => {
        setLoading(true);
        try { setPackages((await getPackages()) || []); }
        catch { setPackages([]); }
        finally { setLoading(false); }
    }, []);

    const fetchCategories = useCallback(async () => {
        try { setCategories((await getCategories()) || []); }
        catch { setCategories([]); }
    }, []);

    // ── auth check on mount
    useEffect(() => {
        (async () => {
            const ok = await checkAuth();
            setAuthed(ok);
            setCheckingAuth(false);
            if (ok) { fetchPackages(); fetchCategories(); }
        })();
    }, [fetchPackages, fetchCategories]);

    // ── login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        const res = await adminLogin(loginData.username, loginData.password);
        if (res.success) {
            setAuthed(true);
            fetchPackages();
            fetchCategories();
        } else {
            setLoginError(res.error || 'Wrong credentials.');
        }
    };

    // ── logout
    const handleLogout = async () => {
        await adminLogout();
        setAuthed(false);
    };

    // ── image handlers
    const handleImageUrl = (e) => {
        const val = e.target.value;
        setForm(f => ({ ...f, imageUrl: val, imagePreview: val }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('File too large! Please select an image under 2 MB.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const b64 = reader.result;
            setForm(f => ({ ...f, imageUrl: b64, imagePreview: b64 }));
        };
        reader.readAsDataURL(file);
    };

    // ── save / update package
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
            inventory: Number(form.inventory) || 0,
        };
        if (!pkgData.title || !pkgData.destination || !pkgData.duration || !pkgData.price || !pkgData.description) {
            alert('Please fill all required fields.');
            return;
        }
        try {
            if (editId) { await updatePackage(editId, pkgData); }
            else { await createPackage(pkgData); }
            await fetchPackages();
            setForm(emptyForm); setShowForm(false); setEditId(null);
            setSaved(true); setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            alert('Failed to save: ' + err.message);
        }
    };

    const startEdit = (pkg) => {
        setForm({
            title: pkg.title, destination: pkg.destination,
            duration: pkg.duration, category: pkg.category,
            price: pkg.price, description: pkg.description,
            imageUrl: pkg.images?.[0] || '',
            imagePreview: pkg.images?.[0] || '',
            inventory: pkg.inventory ?? 0,
        });
        setEditId(pkg._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (pkg) => {
        if (!window.confirm(`Delete "${pkg.title}"? This cannot be undone.`)) return;
        try { await deletePackage(pkg._id); await fetchPackages(); }
        catch { alert('Failed to delete.'); }
    };

    // ── loading spinner ───────────────────────────────────────────────────────
    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-50">
                <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            </div>
        );
    }

    // ── login screen ──────────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-amber-50">
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-md border-2 border-amber-300/40 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: 'linear-gradient(135deg,#7c2d12,#b45309)' }}>
                            <FaSignOutAlt className="text-amber-300 text-xl rotate-180" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-maroon">Admin Access</h2>
                        <p className="text-sm mt-2 text-maroon/60">KNK Trip Cart — Secured Dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1.5 text-maroon/70">Username</label>
                            <input
                                type="text" required autoComplete="username"
                                value={loginData.username}
                                onChange={e => setLoginData(d => ({ ...d, username: e.target.value }))}
                                className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1.5 text-maroon/70">Password</label>
                            <input
                                type="password" required autoComplete="current-password"
                                value={loginData.password}
                                onChange={e => setLoginData(d => ({ ...d, password: e.target.value }))}
                                className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all"
                            />
                        </div>
                        {loginError && (
                            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
                                <FaExclamationTriangle /> {loginError}
                            </div>
                        )}
                        <motion.button
                            type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="w-full py-4 mt-2 font-bold text-lg rounded-xl text-maroon"
                            style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', boxShadow: '0 4px 20px rgba(251,191,36,0.35)' }}
                        >
                            Log In
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // ── CATEGORY NAMES (for dropdown) ─────────────────────────────────────────
    const categoryNames = categories.map(c => c.name);

    // ── main dashboard ────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen pb-16 pt-6 sm:pt-10 px-3 sm:px-6 lg:px-8 bg-amber-50/50">
            <div className="max-w-6xl mx-auto w-full">

                {/* ── Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 sm:mb-10">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-maroon">Dashboard</h1>
                        <p className="text-xs sm:text-sm mt-1 text-maroon/60">Manage packages, gallery &amp; testimonials.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <AnimatePresence>
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-bold text-xs sm:text-sm"
                                >
                                    <FaCheck /> Saved!
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {activeTab === 'packages' && (
                            <motion.button
                                onClick={() => { setShowForm(s => !s); setEditId(null); setForm({ ...emptyForm, category: categoryNames[0] || '' }); }}
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-maroon"
                                style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow: '0 4px 14px rgba(251,191,36,0.3)' }}
                            >
                                {showForm ? <><FaTimes /> Close</> : <><FaPlus /> Add Package</>}
                            </motion.button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-maroon/70 border-2 border-maroon/10 hover:bg-maroon/5 transition-all"
                        >
                            <FaSignOutAlt /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* ── Tabs */}
                <div className="flex items-center gap-1 sm:gap-2 border-b-2 border-amber-500/20 mb-6 sm:mb-8 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    {[
                        { key: 'packages', icon: FaBox, label: 'Packages' },
                        { key: 'gallery', icon: FaImage, label: 'Gallery' },
                        { key: 'testimonials', icon: FaStar, label: 'Reviews' },
                    ].map(t => (
                        <button key={t.key} onClick={() => setActiveTab(t.key)}
                            className={`pb-3 px-3 sm:px-4 font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all border-b-4 -mb-0.5 ${activeTab === t.key ? 'border-amber-500 text-amber-600' : 'border-transparent text-maroon/50 hover:text-maroon/70'}`}>
                            <t.icon size={14} /> {t.label}
                        </button>
                    ))}
                </div>



                {/* ── Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl border border-amber-200/40 overflow-hidden">
                        <GalleryManager />
                    </div>
                )}

                {/* ── Testimonials Tab */}
                {activeTab === 'testimonials' && (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-6 lg:p-8 shadow-xl border border-amber-200/40 overflow-hidden">
                        <TestimonialManager />
                    </div>
                )}

                {/* ── Packages Tab */}
                {activeTab === 'packages' && (
                    <>
                        {/* Package Form */}
                        <AnimatePresence>
                            {showForm && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    onSubmit={handleSave}
                                    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-10 border-2 border-amber-200/60 shadow-xl overflow-hidden"
                                >
                                    <h3 className="text-2xl font-serif font-bold mb-6 text-maroon">
                                        {editId ? '✏️ Edit Package' : '✨ New Package'}
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                        {[
                                            { label: 'Package Title *', key: 'title', ph: 'e.g. Tirupati Balaji Darshan' },
                                            { label: 'Destination *', key: 'destination', ph: 'e.g. Tirupati, Andhra Pradesh' },
                                            { label: 'Duration *', key: 'duration', ph: 'e.g. 2 Days / 1 Night' },
                                            { label: 'Price (₹) *', key: 'price', ph: 'e.g. 3500', type: 'number' },
                                        ].map(f => (
                                            <div key={f.key}>
                                                <label className="block text-xs font-bold mb-1.5 text-maroon/60 uppercase tracking-wide">{f.label}</label>
                                                <input
                                                    type={f.type || 'text'} required placeholder={f.ph}
                                                    value={form[f.key]}
                                                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                                    className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all text-sm"
                                                />
                                            </div>
                                        ))}

                                        {/* Category */}
                                        <div>
                                            <label className="block text-xs font-bold mb-1.5 text-maroon/60 uppercase tracking-wide">Category</label>
                                            {categoryNames.length > 0 ? (
                                                <select
                                                    value={form.category}
                                                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                                                    className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all font-semibold"
                                                >
                                                    {categoryNames.map(c => <option key={c}>{c}</option>)}
                                                </select>
                                            ) : (
                                                <div className="px-4 py-3.5 rounded-xl border border-amber-200 bg-amber-50 text-maroon/60 text-sm">
                                                    No categories yet — add some in the <strong>Categories</strong> tab first.
                                                </div>
                                            )}
                                        </div>

                                        {/* Inventory */}
                                        <div>
                                            <label className="block text-xs font-bold mb-1.5 text-maroon/60 uppercase tracking-wide">
                                                <FaBoxOpen className="inline mr-1" /> Available Seats / Inventory *
                                            </label>
                                            <input
                                                type="number" min="0" required
                                                value={form.inventory}
                                                onChange={e => setForm(p => ({ ...p, inventory: e.target.value }))}
                                                className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-6">
                                        <label className="block text-xs font-bold mb-1.5 text-maroon/60 uppercase tracking-wide">Description *</label>
                                        <textarea
                                            required rows={4} placeholder="Describe this tour..."
                                            value={form.description}
                                            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                            className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-amber-50/30 text-maroon outline-none focus:border-amber-400 focus:bg-white transition-all resize-none text-sm"
                                        />
                                    </div>

                                    {/* Image Section */}
                                    <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                                        <h4 className="font-serif font-bold text-lg text-maroon mb-4 flex items-center gap-2">
                                            <FaImage className="text-amber-500" /> Display Image
                                        </h4>
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold mb-1.5 text-maroon/60 uppercase tracking-wide">Upload from Computer (max 2 MB)</label>
                                                    <input
                                                        type="file" accept="image/jpeg,image/png,image/webp"
                                                        onChange={handleFileUpload}
                                                        className="w-full text-sm text-maroon file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer border border-amber-200 bg-white rounded-xl h-12 flex items-center px-1"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-px bg-amber-200/60 flex-1" />
                                                    <span className="text-xs font-bold text-maroon/40 uppercase tracking-widest">OR</span>
                                                    <div className="h-px bg-amber-200/60 flex-1" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold mb-1.5 text-maroon/60 uppercase tracking-wide">
                                                        <FaLink className="inline mr-1" /> Image URL
                                                    </label>
                                                    <input
                                                        type="url" placeholder="https://images.pexels.com/..."
                                                        value={form.imageUrl?.startsWith('http') ? form.imageUrl : ''}
                                                        onChange={handleImageUrl}
                                                        className="w-full px-4 py-3.5 rounded-xl border border-amber-200 bg-white text-maroon outline-none focus:border-amber-400 transition-all text-sm"
                                                    />
                                                </div>
                                            </div>
                                            {form.imagePreview && (
                                                <div className="relative w-full lg:w-48 shrink-0 rounded-2xl overflow-hidden border border-black/5 aspect-video lg:aspect-square bg-gray-100">
                                                    <img src={form.imagePreview} alt="Preview" className="w-full h-full object-cover"
                                                        onError={e => { e.target.style.display = 'none'; }} />
                                                    <div className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded bg-black/60 text-white font-bold tracking-wider uppercase">Preview</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form actions */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-amber-100">
                                        <motion.button
                                            type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-4 font-bold text-lg rounded-xl text-maroon"
                                            style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow: '0 4px 20px rgba(251,191,36,0.35)' }}
                                        >
                                            {editId ? 'Save Changes' : 'Create Package'}
                                        </motion.button>
                                        <button type="button"
                                            onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); }}
                                            className="sm:w-36 py-4 rounded-xl font-bold bg-gray-50 text-maroon/60 border border-gray-200 hover:bg-gray-100 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* Package Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                            {loading ? (
                                <div className="col-span-full py-20 flex flex-col items-center">
                                    <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
                                    <p className="text-maroon/50 font-serif">Loading packages…</p>
                                </div>
                            ) : packages.length === 0 ? (
                                <div className="col-span-full bg-white rounded-3xl p-16 text-center border-2 border-dashed border-amber-300/50">
                                    <p className="text-xl font-serif font-bold text-maroon/40 mb-2">No packages yet</p>
                                    <p className="text-maroon/40 text-sm">Click "Add Package" to get started.</p>
                                </div>
                            ) : packages.map((pkg, i) => (
                                <motion.div
                                    key={pkg._id}
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="bg-white rounded-3xl overflow-hidden flex flex-col border border-amber-200/40 shadow-xl hover:shadow-2xl hover:shadow-amber-900/10 transition-shadow duration-300"
                                >
                                    {/* Card Image */}
                                    <div className="w-full h-44 relative bg-gray-100 overflow-hidden">
                                        <img
                                            src={pkg.images?.[0] || 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg'}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover"
                                            onError={e => e.target.src = 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg'}
                                        />
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                            {pkg.category}
                                        </div>
                                        {/* Inventory badge */}
                                        <div className={`absolute top-2 left-2 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${pkg.inventory > 0 ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                                            <FaBoxOpen size={10} />
                                            {pkg.inventory > 0 ? `${pkg.inventory} seats` : 'Sold Out'}
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <h4 className="font-serif font-bold text-lg text-maroon mb-1 line-clamp-2 leading-tight">{pkg.title}</h4>
                                            <p className="text-sm text-amber-700/80 font-semibold mb-2">{pkg.destination}</p>
                                            <div className="flex items-center gap-2 text-xs text-maroon/60 mb-2 bg-amber-50/50 py-1.5 px-3 rounded-lg border border-amber-100">
                                                <span className="font-bold text-maroon">Duration:</span> {pkg.duration}
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between pt-3 border-t border-gray-100 mt-2">
                                            <div>
                                                <p className="text-xs font-bold text-maroon/40 uppercase tracking-wider mb-0.5">Price</p>
                                                <p className="font-bold text-xl text-amber-500">₹{pkg.price?.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <motion.button onClick={() => startEdit(pkg)}
                                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                    className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                    aria-label="Edit">
                                                    <FaEdit size={14} />
                                                </motion.button>
                                                <motion.button onClick={() => handleDelete(pkg)}
                                                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                    className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100"
                                                    aria-label="Delete">
                                                    <FaTrash size={14} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
