"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPackages } from '../lib/actions';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

// Fallback images so section never appears broken
const FALLBACK_IMGS = [
    'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const PilgrimageDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const pkgs = await getPackages();
                if (pkgs && pkgs.length > 0) {
                    setDestinations(pkgs.slice(0, 5));
                }
            } catch (err) {
                console.error("Failed to load packages for home page", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    // Show nothing while loading (avoids layout shift)
    if (loading) return null;
    if (destinations.length === 0) return null;

    return (
        <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg,#fffdf5 0%,#fef9ee 100%)' }}>
            {/* Decorative top golden bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(to right, transparent, #f59e0b, transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <p className="section-label mb-3">Sacred Destinations</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
                        Popular Pilgrimage Destinations
                    </h2>
                    <div className="golden-divider" />
                    <p className="text-base sm:text-lg text-maroon/70 mt-5 max-w-2xl mx-auto">
                        Visit the holiest temples across India with our comfortable, specially curated spiritual tour packages.
                    </p>
                </motion.div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
                    {destinations.map((dest, i) => {
                        // ✅ FIX: Use images[0] — that's the field name in the DB
                        const imgSrc = dest.images?.[0] || FALLBACK_IMGS[i] || FALLBACK_IMGS[0];

                        return (
                            <motion.div
                                key={dest._id || i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="relative overflow-hidden rounded-2xl group"
                                style={{
                                    boxShadow: '0 4px 24px rgba(124,45,18,0.12)',
                                    border: '2px solid rgba(251,191,36,0.2)',
                                }}
                            >
                                {/* Clickable link wrapping the whole card */}
                                <Link href={`/packages/${dest._id}`} className="block">
                                    {/* Image */}
                                    <div className="h-56 sm:h-64 overflow-hidden relative">
                                        <img
                                            src={imgSrc}
                                            alt={dest.title || dest.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = FALLBACK_IMGS[i % FALLBACK_IMGS.length];
                                            }}
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0"
                                            style={{ background: 'linear-gradient(to top, rgba(78,30,5,0.95) 0%, rgba(78,30,5,0.3) 55%, transparent 100%)' }} />

                                        {/* Card content overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                            <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold mb-1">
                                                <FaMapMarkerAlt size={10} /> {dest.destination}
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-300 mb-1 leading-tight">
                                                {dest.title || dest.name}
                                            </h3>
                                            <p className="text-amber-100/75 text-xs flex items-center gap-1 mb-4">
                                                <FaClock size={10} /> {dest.duration}
                                            </p>
                                            <div
                                                className="block text-center py-2.5 px-3 rounded-xl font-bold text-sm text-maroon transition-all duration-300 group-hover:scale-105"
                                                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                                            >
                                                View Package →
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All button */}
                <div className="text-center mt-10">
                    <Link
                        href="/packages"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm text-maroon transition-all hover:scale-105 hover:shadow-lg"
                        style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow: '0 4px 20px rgba(251,191,36,0.35)' }}
                    >
                        View All Packages →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PilgrimageDestinations;
