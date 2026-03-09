/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import PackageCard from '../components/PackageCard';

const BACKEND = 'http://localhost:8080';

const categories = ['All', 'South India Tours', 'North India Tours', 'Hills Trip', 'One Day Trip'];

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [filter,   setFilter]   = useState('All');
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get(`${BACKEND}/api/packages`);
                if (res.data && res.data.length > 0) {
                    setPackages(res.data);
                } else {
                    setPackages([]);
                }
            } catch {
                setError(true);
                setPackages([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const filteredPackages = filter === 'All'
        ? packages
        : packages.filter(pkg => pkg.category === filter);

    return (
        <div className="min-h-screen bg-cream" style={{ paddingTop: '0', paddingBottom: '64px' }}>

            {/* ── Hero Header ── */}
            <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#4e1e05 0%,#6e2d08 50%,#4e1e05 100%)', padding: '100px 16px 64px' }}>
                {/* Background texture */}
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Gold shimmer line at top */}
                <div className="absolute top-0 left-0 right-0" style={{ height: '3px', background: 'linear-gradient(90deg,transparent,#fbbf24 30%,#fde68a 50%,#fbbf24 70%,transparent)' }} />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="uppercase tracking-[0.35em] font-bold mb-3"
                        style={{ color: '#fbbf24', fontSize: '0.75rem' }}
                    >
                        Our Offerings
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#fde68a', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.2, marginBottom: '12px' }}
                    >
                        Tour Packages
                    </motion.h1>
                    <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24,transparent)', margin: '0 auto 14px' }} />
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        style={{ color: 'rgba(254,243,199,0.72)', maxWidth: '520px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.65 }}
                    >
                        Find the perfect spiritual journey for your soul.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto" style={{ padding: '0 16px' }}>

                {/* ── Filter Pills ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="flex justify-center flex-wrap gap-2 sm:gap-3"
                    style={{ margin: '36px 0 32px' }}
                >
                    {categories.map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            style={{
                                padding: '8px 18px',
                                borderRadius: '999px',
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                letterSpacing: '0.03em',
                                cursor: 'pointer',
                                border: filter === type ? 'none' : '1.5px solid rgba(124,45,18,0.25)',
                                background: filter === type ? 'linear-gradient(135deg,#fbbf24,#f59e0b)' : '#fff',
                                color: filter === type ? '#7c2d12' : '#7c2d12',
                                boxShadow: filter === type ? '0 4px 14px rgba(251,191,36,0.4)' : '0 1px 4px rgba(0,0,0,0.06)',
                                transition: 'all 0.25s',
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </motion.div>

                {/* ── Loading ── */}
                {loading && (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '50%',
                            border: '3px solid rgba(251,191,36,0.2)',
                            borderTop: '3px solid #fbbf24',
                            margin: '0 auto 16px',
                            animation: 'spin 0.8s linear infinite',
                        }} />
                        <p style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(124,45,18,0.5)', fontSize: '1.1rem' }}>
                            Loading packages…
                        </p>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {/* ── Error / No packages from backend ── */}
                {!loading && error && (
                    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛕</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#7c2d12', fontSize: '1.5rem', marginBottom: '8px' }}>
                            Backend Offline
                        </h2>
                        <p style={{ color: 'rgba(124,45,18,0.6)', fontSize: '0.95rem' }}>
                            Could not connect to the server. Please start the backend and refresh.
                        </p>
                    </div>
                )}

                {/* ── Package Grid ── */}
                {!loading && !error && (
                    <>
                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
                            {filteredPackages.map(pkg => (
                                <PackageCard key={pkg._id} pkg={pkg} />
                            ))}
                        </motion.div>

                        {filteredPackages.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🙏</div>
                                <p style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(124,45,18,0.5)', fontSize: '1.2rem' }}>
                                    {packages.length === 0
                                        ? 'No packages have been added yet. Please add packages from the Admin Dashboard.'
                                        : 'No packages found for this category.'
                                    }
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Packages;
