"use client";
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import Link from 'next/link';

const destinations = [
    {
        name: 'Tirupati',
        description: 'Lord Venkateshwara – Andhra Pradesh',
        img: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        name: 'Rameswaram',
        description: 'Ramanathaswamy Temple – Tamil Nadu',
        img: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        name: 'Kasi',
        description: 'Kashi Vishwanath – Varanasi, UP',
        img: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        name: 'Kedarnath',
        description: 'Kedarnath Dham – Uttarakhand',
        img: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
        name: 'Shirdi',
        description: 'Sai Baba Temple – Maharashtra',
        img: 'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
];

const PilgrimageDestinations = () => {
    return (
        <section className="py-24 mandala-bg relative overflow-hidden">
            {/* Decorative top golden bar */}
            <div className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(to right, transparent, #f59e0b, transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-3"> Sacred Destinations</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-5">
                        Popular Pilgrimage Destinations
                    </h2>
                    <div className="golden-divider">

                    </div>
                    <p className="text-lg text-maroon/70 mt-6 max-w-2xl mx-auto">
                        Visit the holiest temples across India with our comfortable, specially curated spiritual tour packages.
                    </p>
                </motion.div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={dest.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="relative overflow-hidden rounded-2xl group cursor-pointer"
                            style={{
                                boxShadow: '0 4px 24px rgba(124,45,18,0.12)',
                                border: '2px solid rgba(251,191,36,0.2)',
                                transition: 'box-shadow 0.3s, border-color 0.3s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = '0 16px 48px rgba(124,45,18,0.25)';
                                e.currentTarget.style.borderColor = 'rgba(251,191,36,0.6)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,45,18,0.12)';
                                e.currentTarget.style.borderColor = 'rgba(251,191,36,0.2)';
                            }}
                        >
                            {/* Image */}
                            <div className="h-64 overflow-hidden">
                                <img
                                    src={dest.img}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-5"
                                style={{ background: 'linear-gradient(to top, rgba(124,45,18,0.95) 0%, rgba(124,45,18,0.4) 55%, transparent 100%)' }}>
                                <h3 className="text-2xl font-serif font-bold text-amber-300 mb-1">
                                    {dest.name}
                                </h3>
                                <p className="text-amber-100/80 text-sm mb-4">{dest.description}</p>
                                <Link
                                    href="/packages"
                                    className="block text-center py-3 px-4 rounded-xl font-bold text-base text-maroon transition-all duration-300 hover:scale-105"
                                    style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                                >
                                    View Packages →
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PilgrimageDestinations;
