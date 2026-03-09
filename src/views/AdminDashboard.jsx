"use client";
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaEdit, FaPlus, FaTimes, FaCheck, FaCloudUploadAlt, FaLink, FaImage, FaBox } from 'react-icons/fa';
import GalleryManager from './GalleryManager';

import { getPackages, createPackage, updatePackage, deletePackage } from '../lib/actions';
const CATEGORIES = ['South India Tours', 'North India Tours', 'Hills Trip', 'One Day Trip', 'Char Dham Yatra'];

const emptyForm = {
    title: '', destination: '', duration: '',
    category: 'South India Tours', price: '', description: '',
    imageUrl: '', imagePreview: '', uploadedFilename: '',
};

/* ─ tiny upload status component ─ */
const UploadStatus = ({ state }) => {
    if (!state) return null;
    const map = {
        uploading: { text: 'Uploading…', color: '#f59e0b', bg: 'rgba(251,191,36,0.1)' },
        success: { text: ' Upload complete', color: '#16a34a', bg: 'rgba(22,163,74,0.1)' },
        error: { text: ' Upload failed. Using URL mode.', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
        offline: { text: ' Backend offline — using URL link instead.', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
    };
    const s = map[state] || {};
    return (
        <div className="mt-2 px-3 py-2 rounded-xl text-sm font-semibold" style={{ color: s.color, background: s.bg }}>
            {s.text}
        </div>
    );
};

const AdminDashboard = () => {
    const [authed, setAuthed] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [packages, setPackages] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [saved, setSaved] = useState(false);
    const [uploadState, setUploadState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'gallery'
    const fileInputRef = useRef(null);

    /* ── Fetch packages from MongoDB ──────────────── */
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

    /* ── Auth ─────────────────────────────────────────── */
    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.username === 'admin' && loginData.password === 'knk@2024') setAuthed(true);
        else alert(' Wrong credentials.\nUse: admin / knk@2024');
    };

    /* ── Image: upload file to backend ───────────────── */
    const handleImageFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, imagePreview: ev.target.result }));
        reader.readAsDataURL(file);

        setUploadState('uploading');
        const data = new FormData();
        data.append('image', file);
        try {
            const res = await fetch(`/api/upload`, { method: 'POST', body: data });
            if (!res.ok) throw new Error('Server error');
            const json = await res.json();
            setForm(f => ({ ...f, imageUrl: json.url, imagePreview: json.url, uploadedFilename: json.filename }));
            setUploadState('success');
        } catch (err) {
            if (err.message?.includes('fetch') || err.name === 'TypeError') setUploadState('offline');
            else setUploadState('error');
        }
    };

    const handleImageUrl = (e) => {
        const val = e.target.value;
        setForm(f => ({ ...f, imageUrl: val, imagePreview: val, uploadedFilename: '' }));
        setUploadState(null);
    };

    /* ── Save package (MongoDB) ──────────────────────── */
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

        // Frontend validation
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
            setForm(emptyForm); setShowForm(false); setEditId(null);
            setUploadState(null);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error('Save error:', err);
            if (err?.code === 'ERR_NETWORK' || err?.message === 'Network Error') {
                alert('Cannot reach the backend server.\n\nPlease open a terminal and run:\n  cd "/Users/Thamothara/Sai Shiva Tours/backend"\n  node server.js');
            } else {
                const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Unknown error';
                alert(`Failed to save package.\n\nServer said: ${msg}`);
            }
        }
    };

    /* ── Edit ─────────────────────────────────────────── */
    const startEdit = (pkg) => {
        setForm({
            title: pkg.title, destination: pkg.destination,
            duration: pkg.duration, category: pkg.category,
            price: pkg.price, description: pkg.description,
            imageUrl: pkg.images?.[0] || '', imagePreview: pkg.images?.[0] || '',
            uploadedFilename: '',
        });
        setEditId(pkg._id); setShowForm(true); setUploadState(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /* ── Delete ───────────────────────────────────────── */
    const handleDelete = async (pkg) => {
        if (!window.confirm(` Delete "${pkg.title}"?`)) return;
        try {
            // Delete image from server if hosted locally
            if (pkg.images?.[0]?.includes('/uploads/')) {
                // Ignore API delete
            }
            await deletePackage(pkg._id);
            await fetchPackages();
        } catch {
            alert(' Failed to delete. Make sure the backend server is running.');
        }
    };

    /* ── Login screen ─────────────────────────────────── */
    if (!authed) return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#fffdf5' }}>
            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white rounded-3xl p-10 w-full max-w-md"
                style={{ boxShadow: '0 8px 48px rgba(120,53,15,0.15)', border: '2px solid rgba(251,191,36,0.25)' }}
            >
                <div className="text-center mb-8">

                    <h2 className="text-3xl font-serif font-bold" style={{ color: '#7c2d12' }}>Admin Access</h2>
                    <p className="text-sm mt-1" style={{ color: 'rgba(120,53,15,0.55)' }}>KNK Trip Cart Dashboard</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
                    {[{ label: 'Username', key: 'username', type: 'text', ph: 'admin' },
                    { label: 'Password', key: 'password', type: 'password', ph: '••••••••' }].map(f => (
                        <div key={f.key}>
                            <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>{f.label}</label>
                            <input type={f.type} placeholder={f.ph} required
                                value={loginData[f.key]}
                                onChange={e => setLoginData(d => ({ ...d, [f.key]: e.target.value }))}
                                className="w-full px-5 py-4 rounded-xl border text-lg outline-none transition-all"
                                style={{ borderColor: 'rgba(251,191,36,0.4)', background: '#fffdf5', color: '#7c2d12' }}
                            />
                        </div>
                    ))}
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="w-full py-4 font-bold text-lg rounded-xl"
                        style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#7c2d12', boxShadow: '0 4px 20px rgba(251,191,36,0.4)' }}>
                        Login to Dashboard
                    </motion.button>
                    <p className="text-center text-xs" style={{ color: 'rgba(120,53,15,0.45)' }}>Default: admin / knk@2024</p>
                </form>
            </motion.div>
        </div>
    );

    /* ── Dashboard ────────────────────────────────────── */
    return (
        <div className="min-h-screen pb-16 pt-4 px-4" style={{ background: '#fffdf5' }}>
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-6">
                    <div>
                        <h1 className="text-3xl font-serif font-bold" style={{ color: '#7c2d12' }}>
                            Admin Dashboard
                        </h1>
                        <p className="text-sm mt-1" style={{ color: 'rgba(120,53,15,0.55)' }}>
                            Manage Packages and Gallery Images
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <AnimatePresence>
                            {saved && (
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-green-800 font-semibold text-sm"
                                    style={{ background: '#dcfce7' }}>
                                    <FaCheck /> Saved!
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.button
                            onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); setUploadState(null); }}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base"
                            style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#7c2d12', boxShadow: '0 4px 16px rgba(251,191,36,0.4)' }}>
                            {showForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add Package</>}
                        </motion.button>
                        <button onClick={() => setAuthed(false)}
                            className="px-4 py-3 rounded-full font-semibold text-sm border transition-all"
                            style={{ color: 'rgba(120,53,15,0.6)', borderColor: 'rgba(251,191,36,0.4)' }}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Backend info */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex items-center gap-4 border-b-2" style={{ borderColor: 'rgba(251,191,36,0.3)' }}>
                        <button onClick={() => setActiveTab('packages')} className={`pb-2 px-4 font-bold text-lg flex items-center gap-2 ${activeTab === 'packages' ? 'border-b-4 border-amber-500 text-amber-600' : 'text-stone-500'}`}>
                            <FaBox /> Packages
                        </button>
                        <button onClick={() => setActiveTab('gallery')} className={`pb-2 px-4 font-bold text-lg flex items-center gap-2 ${activeTab === 'gallery' ? 'border-b-4 border-amber-500 text-amber-600' : 'text-stone-500'}`}>
                            <FaImage /> Gallery
                        </button>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm"
                        style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)' }}>
                        <span style={{ color: 'rgba(120,53,15,0.7)' }}>
                            Images upload to <strong style={{ color: '#7c2d12' }}>localhost:5000/uploads</strong>
                        </span>
                    </div>
                </div>

                {activeTab === 'packages' ? (
                    <>
                        {/* ── Add / Edit Form ──────────────────────────── */}
                        <AnimatePresence>
                            {showForm && (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    onSubmit={handleSave}
                                    className="bg-white rounded-3xl p-8 mb-8 overflow-hidden"
                                    style={{ border: '2px solid rgba(251,191,36,0.35)', boxShadow: '0 4px 32px rgba(120,53,15,0.1)' }}
                                >
                                    <h3 className="text-2xl font-serif font-bold mb-6" style={{ color: '#7c2d12' }}>
                                        {editId ? (<> Edit Package</>) : (<> Add New Package</>)}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                        {[
                                            { label: ' Package Title', key: 'title', ph: 'e.g. Tirupati Balaji Darshan' },
                                            { label: ' Destination', key: 'destination', ph: 'e.g. Tirupati, Andhra Pradesh' },
                                            { label: ' Duration', key: 'duration', ph: 'e.g. 2 Days / 1 Night' },
                                            { label: ' Price (₹)', key: 'price', ph: 'e.g. 3500', type: 'number' },
                                        ].map(field => (
                                            <div key={field.key}>
                                                <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>
                                                    {field.label.split(' ').slice(1).join(' ')}
                                                </label>
                                                <input type={field.type || 'text'} required placeholder={field.ph}
                                                    value={form[field.key]}
                                                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                                    className="w-full px-4 py-3.5 rounded-xl border text-base outline-none transition-all"
                                                    style={{ borderColor: 'rgba(251,191,36,0.4)', background: '#fffdf5', color: '#7c2d12' }}
                                                />
                                            </div>
                                        ))}
                                        <div>
                                            <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>
                                                Category
                                            </label>
                                            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                                className="w-full px-4 py-3.5 rounded-xl border text-base outline-none transition-all"
                                                style={{ borderColor: 'rgba(251,191,36,0.4)', background: '#fffdf5', color: '#7c2d12' }}>
                                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>
                                            Description
                                        </label>
                                        <textarea required rows="3" placeholder="Short description of the package…"
                                            value={form.description}
                                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                            className="w-full px-4 py-3.5 rounded-xl border text-base outline-none transition-all resize-none"
                                            style={{ borderColor: 'rgba(251,191,36,0.4)', background: '#fffdf5', color: '#7c2d12' }}
                                        />
                                    </div>

                                    {/* ─── Image Section ─── */}
                                    <div className="mb-6 p-5 rounded-2xl"
                                        style={{ background: 'rgba(251,191,36,0.06)', border: '1.5px dashed rgba(251,191,36,0.5)' }}>
                                        <p className="font-serif font-bold text-lg mb-4" style={{ color: '#7c2d12' }}>
                                            Package Image
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            {/* File upload */}
                                            <div>
                                                <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>
                                                    Upload to Server (requires backend)
                                                </label>
                                                <label
                                                    className="flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition-all hover:bg-amber-50"
                                                    style={{ border: '2px dashed rgba(251,191,36,0.6)', minHeight: '96px' }}>
                                                    <FaCloudUploadAlt className="text-3xl mb-2" style={{ color: '#f59e0b' }} />
                                                    <span className="text-sm text-center" style={{ color: 'rgba(120,53,15,0.6)' }}>
                                                        Click to upload JPG / PNG (max 5 MB)
                                                    </span>
                                                    <input type="file" accept="image/*" ref={fileInputRef}
                                                        onChange={handleImageFile} className="hidden" />
                                                </label>
                                                <UploadStatus state={uploadState} />
                                            </div>

                                            {/* Or paste URL */}
                                            <div>
                                                <label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>
                                                    <FaLink className="inline mr-1" /> Or Paste Image URL
                                                </label>
                                                <input type="url" placeholder="https://example.com/temple.jpg"
                                                    value={form.imageUrl} onChange={handleImageUrl}
                                                    className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                                                    style={{ borderColor: 'rgba(251,191,36,0.4)', background: '#fffdf5', color: '#7c2d12', minHeight: '96px' }}
                                                />
                                            </div>
                                        </div>

                                        {/* Preview */}
                                        <AnimatePresence>
                                            {form.imagePreview && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                    className="relative rounded-2xl overflow-hidden">
                                                    <img src={form.imagePreview} alt="Preview"
                                                        className="w-full h-52 object-cover rounded-2xl"
                                                        onError={e => { e.target.style.display = 'none'; }} />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                                                    <motion.button type="button"
                                                        onClick={() => { setForm(f => ({ ...f, imagePreview: '', imageUrl: '', uploadedFilename: '' })); setUploadState(null); }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                                                        style={{ background: 'rgba(239,68,68,0.9)', color: '#fff' }}>
                                                        <FaTimes />
                                                    </motion.button>
                                                    <div className="absolute bottom-3 left-3 text-xs px-3 py-1 rounded-full font-semibold"
                                                        style={{ background: '#25D366', color: '#fff' }}>
                                                        Ready
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex gap-4">
                                        <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                            className="flex-1 py-4 font-bold text-lg rounded-xl"
                                            style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#7c2d12', boxShadow: '0 4px 20px rgba(251,191,36,0.4)' }}>
                                            {editId ? (<> Save Changes</>) : (<> Add Package</>)}
                                        </motion.button>
                                        <button type="button"
                                            onClick={() => { setShowForm(false); setEditId(null); setForm(emptyForm); setUploadState(null); }}
                                            className="px-8 py-4 rounded-xl font-semibold border transition-all"
                                            style={{ color: 'rgba(120,53,15,0.6)', borderColor: 'rgba(251,191,36,0.4)' }}>
                                            Cancel
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* ── Package List ─────────────────────────────── */}
                        <div className="space-y-3">
                            {loading ? (
                                <div className="text-center py-16">

                                    <p className="text-lg font-serif" style={{ color: 'rgba(120,53,15,0.4)' }}>Loading packages...</p>
                                </div>
                            ) : packages.length === 0 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="bg-white rounded-3xl p-16 text-center"
                                    style={{ border: '2px dashed rgba(251,191,36,0.35)' }}>

                                    <p className="text-lg font-serif font-bold" style={{ color: 'rgba(120,53,15,0.4)' }}>No packages yet</p>
                                    <p className="text-sm mt-1" style={{ color: 'rgba(120,53,15,0.35)' }}>Click "Add Package" to get started.</p>
                                </motion.div>
                            ) : packages.map((pkg, i) => (
                                <motion.div key={pkg._id}
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row"
                                    style={{ border: '1.5px solid rgba(251,191,36,0.2)', boxShadow: '0 2px 16px rgba(120,53,15,0.07)' }}>

                                    <div className="w-full sm:w-40 h-32 sm:h-auto shrink-0 overflow-hidden bg-amber-50">
                                        <img src={pkg.images?.[0] || 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=400'}
                                            alt={pkg.title} className="w-full h-full object-cover"
                                            onError={e => e.target.src = 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=400'} />
                                    </div>

                                    <div className="flex-1 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-serif font-bold text-lg truncate" style={{ color: '#7c2d12' }}>{pkg.title}</h4>
                                            <p className="text-sm mt-0.5" style={{ color: 'rgba(120,53,15,0.6)' }}>
                                                {pkg.destination} ·  {pkg.duration}
                                            </p>
                                            <p className="font-bold mt-1" style={{ color: '#f59e0b' }}>₹{pkg.price?.toLocaleString()} / person</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                                                style={{ background: 'rgba(251,191,36,0.12)', color: '#92400e' }}>{pkg.category}</span>
                                            <motion.button onClick={() => startEdit(pkg)}
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                                style={{ background: 'rgba(251,191,36,0.12)', color: '#b45309' }}>
                                                <FaEdit />
                                            </motion.button>
                                            <motion.button onClick={() => handleDelete(pkg)}
                                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                                style={{ background: 'rgba(239,68,68,0.09)', color: '#ef4444' }}>
                                                <FaTrash />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    <GalleryManager />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
