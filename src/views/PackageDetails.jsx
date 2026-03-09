"use client";
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getPackageById } from '../lib/actions';

const fallbackPackage = {
    _id: "1",
    title: "Tirupati Balaji Darshan",
    destination: "Tirupati, Andhra Pradesh",
    duration: "2 Days / 1 Night",
    price: 3500,
    description: "Experience a divine and peaceful darshan of Lord Venkateshwara with our special VIP access package, including comfortable AC transport and special care for seniors.",
    images: ["https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    itinerary: [
        { day: 1, title: "Departure & Arrival", description: "Depart from Chennai, reach Tirupati. Check into the hotel, evening visit to nearby temples." },
        { day: 2, title: "VIP Darshan & Return", description: "Early morning VIP darshan at Tirumala, Laddu prasadam, lunch, and return journey." }
    ]
};

const PackageDetails = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const data = await getPackageById(id);
                setPkg(data);
            } catch (error) {
                console.error(error);
                setPkg(fallbackPackage);
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#fffdf5' }}>
                <div className="text-center">

                    <p className="text-xl font-serif" style={{ color: '#7c2d12' }}>Loading package details...</p>
                </div>
            </div>
        );
    }

    if (!pkg) return null;

    const whatsappUrl = `https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20the%20"${encodeURIComponent(pkg.title)}"%20package.%20Please%20share%20details.`;

    return (
        <div className="min-h-screen pt-8 pb-16 transition-colors duration-300" style={{ background: '#fffdf5' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Image */}
                <div className="relative h-[350px] md:h-[480px] rounded-3xl overflow-hidden mb-12"
                    style={{ boxShadow: '0 8px 48px rgba(124,45,18,0.15)', border: '2px solid rgba(251,191,36,0.25)' }}>
                    <img src={pkg.images?.[0] || fallbackPackage.images[0]} alt={pkg.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(124,45,18,0.85) 0%, rgba(124,45,18,0.2) 50%, transparent 100%)' }} />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 mb-3 font-semibold" style={{ color: '#fbbf24' }}>
                            <FaMapMarkerAlt /> {pkg.destination}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">{pkg.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base">
                            <span className="flex items-center gap-2 text-amber-200"><FaClock /> {pkg.duration}</span>
                            <span className="flex items-center gap-2 font-bold text-xl text-amber-300">₹{pkg.price?.toLocaleString()} / person</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Overview */}
                        <section className="bg-white p-8 rounded-2xl"
                            style={{ border: '1.5px solid rgba(251,191,36,0.25)', boxShadow: '0 4px 24px rgba(124,45,18,0.08)' }}>
                            <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: '#7c2d12' }}>
                                Overview
                            </h2>
                            <p className="leading-relaxed text-lg pb-4" style={{ color: 'rgba(120,53,15,0.75)' }}>
                                {pkg.description}
                            </p>
                        </section>

                        {/* Itinerary Timeline */}
                        {pkg.itinerary && pkg.itinerary.length > 0 && (
                            <section className="bg-white p-8 rounded-2xl"
                                style={{ border: '1.5px solid rgba(251,191,36,0.25)', boxShadow: '0 4px 24px rgba(124,45,18,0.08)' }}>
                                <h2 className="text-2xl font-serif font-bold mb-8" style={{ color: '#7c2d12' }}>
                                    Itinerary
                                </h2>
                                <div className="space-y-6">
                                    {pkg.itinerary.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0"
                                                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#7c2d12' }}>
                                                {item.day}
                                            </div>
                                            <div className="flex-1 p-5 rounded-2xl"
                                                style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
                                                <h4 className="font-bold text-lg mb-2" style={{ color: '#7c2d12' }}>{item.title}</h4>
                                                <p className="text-sm" style={{ color: 'rgba(120,53,15,0.7)' }}>{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar — Contact CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white p-8 rounded-2xl"
                            style={{ boxShadow: '0 8px 48px rgba(124,45,18,0.12)', border: '2px solid rgba(251,191,36,0.3)' }}>
                            <h3 className="text-2xl font-serif font-bold mb-2" style={{ color: '#7c2d12' }}>
                                Interested?
                            </h3>
                            <p className="text-sm mb-6" style={{ color: 'rgba(120,53,15,0.6)' }}>
                                Contact us to book this tour or customize it for your needs.
                            </p>

                            <div className="space-y-4">
                                {/* Price highlight */}
                                <div className="p-4 rounded-2xl text-center"
                                    style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.1))', border: '1px solid rgba(251,191,36,0.3)' }}>
                                    <p className="text-sm font-semibold" style={{ color: 'rgba(120,53,15,0.6)' }}>Starting from</p>
                                    <p className="text-3xl font-serif font-bold" style={{ color: '#f59e0b' }}>
                                        ₹{pkg.price?.toLocaleString()}
                                    </p>
                                    <p className="text-xs" style={{ color: 'rgba(120,53,15,0.5)' }}>per person</p>
                                </div>

                                {/* WhatsApp CTA */}
                                <motion.a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-lg"
                                    style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
                                >
                                    <FaWhatsapp className="text-2xl" />
                                    Book via WhatsApp
                                </motion.a>

                                {/* Call CTA */}
                                <motion.a
                                    href="tel:+919629202940"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-lg"
                                    style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#7c2d12', boxShadow: '0 4px 20px rgba(251,191,36,0.4)' }}
                                >
                                    Call Us Now
                                </motion.a>

                                {/* Back to packages */}
                                <Link
                                    href="/packages"
                                    className="block text-center py-3 rounded-2xl font-semibold text-sm transition-all hover:bg-amber-50"
                                    style={{ color: 'rgba(120,53,15,0.6)', border: '1.5px solid rgba(251,191,36,0.3)' }}
                                >
                                    ← Back to All Packages
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
