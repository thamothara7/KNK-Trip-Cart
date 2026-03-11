"use client";
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
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
    const [imgError, setImgError] = useState(false);

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
                    <div className="w-12 h-12 rounded-full border-4 border-amber-500/30 border-t-amber-500 animate-spin mx-auto mb-4" />
                    <p className="text-xl font-serif" style={{ color: '#7c2d12' }}>Loading package details...</p>
                </div>
            </div>
        );
    }

    if (!pkg) return null;

    const whatsappUrl = `https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20the%20%22${encodeURIComponent(pkg.title)}%22%20package.%20Please%20share%20details.`;
    const heroImage = imgError ? fallbackPackage.images[0] : (pkg.images?.[0] || fallbackPackage.images[0]);

    return (
        <div className="min-h-screen pt-[62px] transition-colors duration-300" style={{ background: '#fffdf5' }}>

            {/* ═══ HERO IMAGE — full width, tall, prominent ═══ */}
            <div className="relative w-full" style={{ height: 'clamp(260px, 50vw, 520px)' }}>
                <img
                    src={heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(78,30,5,0.92) 0%, rgba(78,30,5,0.35) 55%, transparent 100%)' }}
                />

                {/* Back button */}
                <div className="absolute top-4 left-4">
                    <Link
                        href="/packages"
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md"
                        style={{ background: 'rgba(0,0,0,0.45)', color: '#fde68a', border: '1px solid rgba(251,191,36,0.35)' }}
                    >
                        ← Packages
                    </Link>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6 sm:pb-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-2 mb-2 font-semibold text-sm" style={{ color: '#fbbf24' }}>
                            <FaMapMarkerAlt size={13} /> {pkg.destination}
                        </div>
                        <h1 className="font-serif font-bold text-white mb-3 leading-tight"
                            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.8rem)' }}>
                            {pkg.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                            <span className="flex items-center gap-2 text-sm text-amber-200">
                                <FaClock size={13} /> {pkg.duration}
                            </span>
                            <span className="font-bold text-lg sm:text-xl text-amber-300">
                                ₹{pkg.price?.toLocaleString('en-IN')} / person
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ CONTACT US STRIP — prominent CTA below hero ═══ */}
            <div style={{ background: 'linear-gradient(90deg,#7c2d12,#b45309)', padding: '14px 16px' }}>
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-amber-100 font-semibold text-sm text-center sm:text-left">
                        Interested in <span className="text-amber-300 font-bold">{pkg.title}</span>? We're here to help!
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white transition-transform hover:scale-105 active:scale-95"
                            style={{ background: '#25D366', boxShadow: '0 4px 14px rgba(37,211,102,0.4)' }}
                        >
                            <FaWhatsapp size={16} /> WhatsApp
                        </a>
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-amber-950 transition-transform hover:scale-105 active:scale-95"
                            style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow: '0 4px 14px rgba(251,191,36,0.4)' }}
                        >
                            <FaEnvelope size={14} /> Contact Us
                        </Link>
                        <a
                            href="tel:+919629202940"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-amber-950 transition-transform hover:scale-105 active:scale-95"
                            style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(251,191,36,0.6)', color: '#fde68a' }}
                        >
                            <FaPhone size={13} /> Call Now
                        </a>
                    </div>
                </div>
            </div>

            {/* ═══ CONTENT ═══ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Overview */}
                        <section className="bg-white p-6 sm:p-8 rounded-2xl"
                            style={{ border: '1.5px solid rgba(251,191,36,0.25)', boxShadow: '0 4px 24px rgba(124,45,18,0.08)' }}>
                            <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4" style={{ color: '#7c2d12' }}>
                                Overview
                            </h2>
                            <p className="leading-relaxed text-base sm:text-lg pb-2" style={{ color: 'rgba(120,53,15,0.75)' }}>
                                {pkg.description}
                            </p>
                        </section>

                        {/* Itinerary Timeline */}
                        {pkg.itinerary && pkg.itinerary.length > 0 && (
                            <section className="bg-white p-6 sm:p-8 rounded-2xl"
                                style={{ border: '1.5px solid rgba(251,191,36,0.25)', boxShadow: '0 4px 24px rgba(124,45,18,0.08)' }}>
                                <h2 className="text-xl sm:text-2xl font-serif font-bold mb-6" style={{ color: '#7c2d12' }}>
                                    Itinerary
                                </h2>
                                <div className="space-y-4">
                                    {pkg.itinerary.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base shrink-0"
                                                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#7c2d12' }}>
                                                {item.day}
                                            </div>
                                            <div className="flex-1 p-4 rounded-2xl"
                                                style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
                                                <h4 className="font-bold text-base mb-1" style={{ color: '#7c2d12' }}>{item.title}</h4>
                                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(120,53,15,0.7)' }}>{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar — Sticky CTA */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 bg-white rounded-2xl"
                            style={{ boxShadow: '0 8px 48px rgba(124,45,18,0.12)', border: '2px solid rgba(251,191,36,0.3)' }}>

                            {/* Package image thumbnail in sidebar */}
                            <div className="relative h-40 rounded-t-2xl overflow-hidden">
                                <img
                                    src={heroImage}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(78,30,5,0.6),transparent)' }} />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-serif font-bold mb-1" style={{ color: '#7c2d12' }}>
                                    Book This Tour
                                </h3>
                                <p className="text-sm mb-5" style={{ color: 'rgba(120,53,15,0.6)' }}>
                                    Contact us to reserve your spot or customize the package.
                                </p>

                                <div className="space-y-3">
                                    {/* Price */}
                                    <div className="p-4 rounded-2xl text-center"
                                        style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.1))', border: '1px solid rgba(251,191,36,0.3)' }}>
                                        <p className="text-xs font-semibold" style={{ color: 'rgba(120,53,15,0.6)' }}>Starting from</p>
                                        <p className="text-3xl font-serif font-bold" style={{ color: '#f59e0b' }}>
                                            ₹{pkg.price?.toLocaleString('en-IN')}
                                        </p>
                                        <p className="text-xs" style={{ color: 'rgba(120,53,15,0.5)' }}>per person</p>
                                    </div>

                                    {/* Contact Us CTA */}
                                    <Link
                                        href="/contact"
                                        className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-bold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                        style={{ background: 'linear-gradient(135deg,#7c2d12,#b45309)', color: '#fde68a', boxShadow: '0 4px 20px rgba(124,45,18,0.35)' }}
                                    >
                                        <FaEnvelope size={16} /> Contact Us
                                    </Link>

                                    {/* WhatsApp */}
                                    <motion.a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-bold text-base"
                                        style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
                                    >
                                        <FaWhatsapp className="text-xl" />
                                        WhatsApp Us
                                    </motion.a>

                                    {/* Call */}
                                    <motion.a
                                        href="tel:+919629202940"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-bold text-base"
                                        style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: '#7c2d12', boxShadow: '0 4px 20px rgba(251,191,36,0.4)' }}
                                    >
                                        <FaPhone size={15} /> Call Us Now
                                    </motion.a>

                                    {/* Back */}
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
        </div>
    );
};

export default PackageDetails;
