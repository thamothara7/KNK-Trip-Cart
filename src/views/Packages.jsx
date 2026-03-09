"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import { getPackages } from '../lib/actions';

const categories = ['All', 'South India Tours', 'North India Tours', 'Hills Trip', 'One Day Trip', 'Char Dham Yatra'];

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();
                if (data && data.length > 0) {
                    setPackages(data);
                } else {
                    setPackages([]);
                }
            } catch (error) {
                console.error("Failed to load packages via Server Action:", error);
                setError(true);
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
            {/* Hero Banner Area */}
            <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#4e1e05 0%,#6e2d08 50%,#4e1e05 100%)', padding: '100px 16px 64px' }}>
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
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
                        style={{ fontFamily: "var(--font-serif, 'Playfair Display')", fontWeight: 700, color: '#fde68a', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.2, marginBottom: '12px' }}
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
                {/* Filters */}
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
                                fontFamily: "var(--font-sans, 'Poppins')",
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

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin mb-4" />
                        <p className="font-serif text-maroon/60 text-lg">Fetching divine destinations...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                        <div className="text-5xl mb-4">🛕</div>
                        <h2 className="font-serif text-maroon text-2xl font-bold mb-2">Backend Connection Error</h2>
                        <p className="text-maroon/70">Our servers are currently resting. Please try again later or check MongoDB configuration.</p>
                    </div>
                )}

                {/* Grid */}
                {!loading && !error && (
                    <>
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {filteredPackages.map(pkg => (
                                <PackageCard key={pkg._id} pkg={pkg} />
                            ))}
                        </motion.div>

                        {/* Empty State */}
                        {filteredPackages.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-24 text-center px-4"
                            >
                                <div className="text-5xl mb-4">🙏</div>
                                <h3 className="font-serif text-maroon font-bold text-2xl mb-2">No Packages Available</h3>
                                <p className="text-maroon/60 max-w-md">
                                    {packages.length === 0
                                        ? "There are currently no tour packages in the database. Please visit the Admin Dashboard to add new divine trips."
                                        : `We couldn't find any packages under "${filter}".`}
                                </p>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Packages;
