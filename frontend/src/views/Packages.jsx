"use client";
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PackageCard from '../components/PackageCard';
import { getPackages } from '../lib/actions';

const dummyPackages = [
    {
        _id: "1",
        title: "Tirupati Balaji Darshan",
        destination: "Tirupati, Andhra Pradesh",
        duration: "2 Days / 1 Night",
        category: "South India Tours",
        price: 3500,
        description: "Experience a divine and peaceful darshan of Lord Venkateshwara with our special VIP access package, including comfortable AC transport and special care for seniors.",
        images: ["https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "2",
        title: "Kasi Vishwanath Yatra",
        destination: "Varanasi, Uttar Pradesh",
        duration: "4 Days / 3 Nights",
        category: "North India Tours",
        price: 15000,
        description: "A profound spiritual journey to the oldest living city. Includes Ganga Aarti viewing, temple darshans, and comfortable lodging with authentic vegetarian meals.",
        images: ["https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "3",
        title: "Ooty Mountain Retreat",
        destination: "Ooty, Tamil Nadu",
        duration: "3 Days / 2 Nights",
        category: "Hills Trip",
        price: 8500,
        description: "Escape to the Queen of Hill Stations. Enjoy the botanical gardens, serene lakes, and the cool mountain breeze in luxury with special elderly care.",
        images: ["https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "4",
        title: "Kanchipuram Temple Tour",
        destination: "Kanchipuram, Tamil Nadu",
        duration: "One Day Trip",
        category: "One Day Trip",
        price: 1500,
        description: "Explore the city of thousand temples in a single day. Perfect for families looking for a quick and culturally rich weekend getaway with divine blessings.",
        images: ["https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "5",
        title: "Rameshwaram & Dhanushkodi",
        destination: "Rameshwaram, Tamil Nadu",
        duration: "3 Days / 2 Nights",
        category: "South India Tours",
        price: 6000,
        description: "Visit the sacred Ramanathaswamy Temple and explore the ghostly beauty of Dhanushkodi. A complete spiritual experience with comfortable stay.",
        images: ["https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "6",
        title: "Char Dham Yatra",
        destination: "Uttarakhand",
        duration: "12 Days / 11 Nights",
        category: "North India Tours",
        price: 35000,
        description: "The ultimate spiritual journey covering Yamunotri, Gangotri, Kedarnath, and Badrinath. Complete with comfortable transport and experienced guides.",
        images: ["https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    }
];

const categories = ['All', 'South India Tours', 'North India Tours', 'Hills Trip', 'One Day Trip'];

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
                setPackages(dummyPackages);
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

                {!loading && error && (
                    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛕</div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#7c2d12', fontSize: '1.5rem', marginBottom: '8px' }}>
                            Backend Offline
                        </h2>
                        <p style={{ color: 'rgba(124,45,18,0.6)', fontSize: '0.95rem' }}>
                            Could not connect to the server. Please check your database connection.
                        </p>
                    </div>
                )}

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
