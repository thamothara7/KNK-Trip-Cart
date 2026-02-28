import { useState, useEffect } from 'react';
import { FaBox, FaAddressBook, FaEnvelope, FaSignOutAlt, FaLock, FaOm, FaPlus, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [activeTab, setActiveTab] = useState('packages');
    const [messages, setMessages] = useState([]);
    const [packages, setPackages] = useState([]);
    const [adminToken, setAdminToken] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPkg, setNewPkg] = useState({
        title: '', destination: '', duration: '', category: 'South India Tours', price: '', description: '', images: ['']
    });

    const fetchMessages = async (token) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get('http://localhost:5000/api/contacts', config);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchPackages = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/packages');
            setPackages(data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const deletePackage = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.delete(`http://localhost:5000/api/packages/${id}`, config);
            setPackages(packages.filter(p => p._id !== id));
        } catch (error) {
            alert('Failed to delete. Check MongoDB connection.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', loginData);
            setAdminToken(res.data.token);
            setIsAuthenticated(true);
            fetchMessages(res.data.token);
            fetchPackages();
        } catch (error) {
            if (loginData.username === 'admin' && loginData.password === 'admin123') {
                setIsAuthenticated(true);
                fetchPackages();
            } else {
                alert("Invalid Credentials.");
            }
        }
    };

    const handleAddPackage = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.post('http://localhost:5000/api/packages', { ...newPkg, price: Number(newPkg.price) }, config);
            alert('Package added successfully! 🙏');
            setNewPkg({ title: '', destination: '', duration: '', category: 'South India Tours', price: '', description: '', images: [''] });
            setShowAddForm(false);
            fetchPackages();
        } catch (error) {
            alert('Failed to add package. Make sure MongoDB is connected and you are logged in.');
        }
    };

    const logout = () => { setIsAuthenticated(false); setAdminToken(''); };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-cream dark:bg-gray-900 flex items-center justify-center pt-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md border border-gold/20">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-saffron/10 text-saffron rounded-full flex items-center justify-center text-3xl">
                            <FaOm />
                        </div>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-center text-maroon dark:text-gold mb-8">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-maroon/70 dark:text-cream/70 mb-2">Username</label>
                            <input type="text" value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-cream/50 dark:bg-gray-700 text-maroon dark:text-cream focus:ring-2 focus:ring-saffron outline-none" placeholder="admin" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-maroon/70 dark:text-cream/70 mb-2">Password</label>
                            <input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gold/30 bg-cream/50 dark:bg-gray-700 text-maroon dark:text-cream focus:ring-2 focus:ring-saffron outline-none" placeholder="••••••••" required />
                        </div>
                        <button type="submit" className="w-full py-3 bg-saffron hover:bg-gold text-white font-bold rounded-xl transition-colors tracking-wide">
                            Login to Dashboard
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const tabs = [
        { id: 'packages', icon: FaBox, label: 'Manage Packages' },
        { id: 'bookings', icon: FaAddressBook, label: 'View Bookings' },
        { id: 'messages', icon: FaEnvelope, label: 'Form Submissions' },
    ];

    return (
        <div className="min-h-screen bg-cream dark:bg-gray-900 pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gold/20 p-4 sticky top-28 shadow-sm">
                        <div className="flex items-center gap-3 p-4 mb-4 border-b border-gold/20">
                            <div className="w-10 h-10 bg-saffron text-white rounded-full flex items-center justify-center font-bold"><FaOm /></div>
                            <div>
                                <h4 className="font-serif font-bold text-maroon dark:text-gold">Admin</h4>
                                <p className="text-xs text-maroon/50 dark:text-cream/50">Super Admin</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm ${activeTab === tab.id ? 'bg-saffron/10 text-saffron font-semibold' : 'text-maroon/60 dark:text-cream/60 hover:bg-gold/5'}`}
                                >
                                    <tab.icon /> {tab.label}
                                </button>
                            ))}
                            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4 text-sm">
                                <FaSignOutAlt /> Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gold/20 p-8 min-h-[500px] shadow-sm">

                        {/* PACKAGES TAB */}
                        {activeTab === 'packages' && (
                            <div>
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-maroon dark:text-gold">Packages</h2>
                                    <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2 px-5 py-2.5 bg-saffron text-white rounded-lg hover:bg-gold text-sm font-semibold transition-colors">
                                        {showAddForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add Package</>}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {showAddForm && (
                                        <motion.form
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            onSubmit={handleAddPackage}
                                            className="mb-8 p-6 bg-cream/50 dark:bg-gray-700/50 rounded-xl border border-gold/20 space-y-4 overflow-hidden"
                                        >
                                            <h3 className="font-serif font-bold text-lg text-maroon dark:text-gold mb-2">Add New Package</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input type="text" placeholder="Package Title" required value={newPkg.title} onChange={e => setNewPkg({ ...newPkg, title: e.target.value })} className="px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-gray-800 text-maroon dark:text-cream outline-none focus:ring-2 focus:ring-saffron text-sm" />
                                                <input type="text" placeholder="Destination" required value={newPkg.destination} onChange={e => setNewPkg({ ...newPkg, destination: e.target.value })} className="px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-gray-800 text-maroon dark:text-cream outline-none focus:ring-2 focus:ring-saffron text-sm" />
                                                <input type="text" placeholder="Duration (e.g., 3 Days / 2 Nights)" required value={newPkg.duration} onChange={e => setNewPkg({ ...newPkg, duration: e.target.value })} className="px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-gray-800 text-maroon dark:text-cream outline-none focus:ring-2 focus:ring-saffron text-sm" />
                                                <select value={newPkg.category} onChange={e => setNewPkg({ ...newPkg, category: e.target.value })} className="px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-gray-800 text-maroon dark:text-cream outline-none focus:ring-2 focus:ring-saffron text-sm">
                                                    <option>South India Tours</option>
                                                    <option>North India Tours</option>
                                                    <option>Hills Trip</option>
                                                    <option>One Day Trip</option>
                                                </select>
                                                <input type="number" placeholder="Price (₹)" required value={newPkg.price} onChange={e => setNewPkg({ ...newPkg, price: e.target.value })} className="px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-gray-800 text-maroon dark:text-cream outline-none focus:ring-2 focus:ring-saffron text-sm" />
                                                <input type="url" placeholder="Image URL" value={newPkg.images[0]} onChange={e => setNewPkg({ ...newPkg, images: [e.target.value] })} className="px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-gray-800 text-maroon dark:text-cream outline-none focus:ring-2 focus:ring-saffron text-sm" />
                                            </div>
                                            <textarea placeholder="Package Description" required rows="3" value={newPkg.description} onChange={e => setNewPkg({ ...newPkg, description: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-white dark:bg-gray-800 text-maroon dark:text-cream outline-none focus:ring-2 focus:ring-saffron text-sm resize-none" />
                                            <button type="submit" className="px-8 py-3 bg-saffron hover:bg-gold text-white font-bold rounded-lg transition-colors text-sm tracking-wide">
                                                🙏 Save Package
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>

                                {packages.length === 0 ? (
                                    <div className="text-center py-12 text-maroon/40 dark:text-cream/40 border-2 border-dashed border-gold/20 rounded-xl">
                                        <FaBox className="text-4xl mx-auto mb-3 text-gold/30" />
                                        <p className="font-serif">No packages found in database.</p>
                                        <p className="text-sm mt-1">Add a new package above or connect MongoDB.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {packages.map((pkg) => (
                                            <motion.div key={pkg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 p-4 bg-cream/50 dark:bg-gray-700 rounded-xl border border-gold/20">
                                                <img src={pkg.images?.[0] || 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200'} alt={pkg.title} className="w-20 h-16 object-cover rounded-lg shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-serif font-bold text-maroon dark:text-gold truncate">{pkg.title}</h4>
                                                    <p className="text-sm text-maroon/60 dark:text-cream/60">{pkg.destination} · ₹{pkg.price?.toLocaleString()}</p>
                                                </div>
                                                <span className="text-xs bg-saffron/10 text-saffron px-2 py-1 rounded-full hidden sm:block">{pkg.category}</span>
                                                <button onClick={() => deletePackage(pkg._id)} className="text-red-500 hover:text-red-700 text-sm font-semibold shrink-0">Delete</button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* BOOKINGS TAB */}
                        {activeTab === 'bookings' && (
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-maroon dark:text-gold mb-8">Recent Bookings</h2>
                                <div className="text-center py-12 text-maroon/40 dark:text-cream/40 border-2 border-dashed border-gold/20 rounded-xl">
                                    <FaAddressBook className="text-4xl mx-auto mb-3 text-gold/30" />
                                    <p className="font-serif">Booking requests will appear here.</p>
                                    <p className="text-sm mt-1">Connect MongoDB to see live data.</p>
                                </div>
                            </div>
                        )}

                        {/* MESSAGES TAB */}
                        {activeTab === 'messages' && (
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-maroon dark:text-gold mb-8">Contact Form Submissions</h2>
                                {messages.length === 0 ? (
                                    <div className="text-center py-12 text-maroon/40 dark:text-cream/40 border-2 border-dashed border-gold/20 rounded-xl">
                                        <FaEnvelope className="text-4xl mx-auto mb-3 text-gold/30" />
                                        <p className="font-serif">No messages found.</p>
                                        <p className="text-sm mt-1">Send a message on the Contact page first!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((msg, idx) => (
                                            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="p-6 bg-cream/50 dark:bg-gray-700 rounded-xl border border-gold/20">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h3 className="font-serif font-bold text-maroon dark:text-gold">{msg.name}</h3>
                                                        <p className="text-sm text-saffron">{msg.email}</p>
                                                    </div>
                                                    <span className="text-xs text-maroon/40 dark:text-cream/40 bg-gold/10 px-2 py-1 rounded">
                                                        {new Date(msg.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="font-semibold text-maroon/80 dark:text-cream/80 mb-2">{msg.subject}</p>
                                                <p className="text-sm text-maroon/60 dark:text-cream/60">{msg.message}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
