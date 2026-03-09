"use client";
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaWhatsapp, FaPhone, FaInstagram, FaFacebookF, FaTwitter, FaEnvelope, FaTimes } from 'react-icons/fa';

const WHATSAPP = `https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20this%20package.%20Please%20share%20more%20details.`;
const PHONE   = 'tel:+919629202940';
const EMAIL   = 'mailto:saishivatours@gmail.com';
const IG      = 'https://www.instagram.com/knktripcart/';
const FB      = 'https://www.facebook.com/knktripcart/';
const TW      = 'https://twitter.com/knktripcart';

const contactOptions = [
    { icon: FaWhatsapp,  label: 'WhatsApp',  href: WHATSAPP, bg: '#25D366', color: '#fff' },
    { icon: FaPhone,     label: 'Call',      href: PHONE,    bg: '#7c2d12', color: '#fbbf24' },
    { icon: FaInstagram, label: 'Instagram', href: IG,       bg: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)', color: '#fff' },
    { icon: FaFacebookF, label: 'Facebook',  href: FB,       bg: '#1877F2', color: '#fff' },
    { icon: FaTwitter,   label: 'X',         href: TW,       bg: '#000',    color: '#fff' },
    { icon: FaEnvelope,  label: 'Email',     href: EMAIL,    bg: '#f59e0b', color: '#fff' },
];

const PackageCard = ({ pkg }) => {
    const [showContact, setShowContact] = useState(false);
    const popupRef = useRef(null);

    // Close on outside click (desktop)
    useEffect(() => {
        if (!showContact) return;
        const handler = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) setShowContact(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showContact]);

    // Prevent body scroll when mobile drawer open
    useEffect(() => {
        document.body.style.overflow = showContact ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showContact]);

    return (
        <>
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-white rounded-3xl overflow-visible group"
            style={{
                boxShadow: '0 4px 30px rgba(120,53,15,0.10)',
                border: '1.5px solid rgba(251,191,36,0.2)',
                transition: 'box-shadow 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 56px rgba(120,53,15,0.18)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 30px rgba(120,53,15,0.10)'}
        >
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-3xl h-60">
                <img
                    src={pkg.images?.[0] || 'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
                    style={{ background: 'rgba(124,45,18,0.92)', color: '#fbbf24', backdropFilter: 'blur(4px)' }}>
                    {pkg.category}
                </div>
                {/* Gradient overlay bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24"
                    style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.7),transparent)' }} />

                {/* Contact Us button — bottom of image */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4" ref={popupRef}>
                    <motion.button
                        onClick={() => setShowContact(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-sm w-full sm:w-auto justify-center"
                        style={{
                            background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
                            color: '#7c2d12',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            maxWidth: '280px',
                        }}
                    >
                         Contact Us
                    </motion.button>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-5">
                <h3 className="font-serif font-bold text-lg leading-snug mb-3 group-hover:text-amber-700 transition-colors"
                    style={{ color: '#7c2d12' }}>
                    {pkg.title}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm mb-3" style={{ color: 'rgba(120,53,15,0.65)' }}>
                    <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt style={{ color: '#f59e0b' }} />
                        {pkg.destination}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <FaClock style={{ color: '#f59e0b' }} />
                        {pkg.duration}
                    </span>
                </div>
                <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(120,53,15,0.7)' }}>
                    {pkg.description}
                </p>
                <div className="flex items-center gap-1.5 pt-3 border-t border-amber-100">
                    <FaRupeeSign style={{ color: '#f59e0b', fontSize: '14px' }} />
                    <span className="font-bold text-lg" style={{ color: '#f59e0b' }}>
                        {pkg.price?.toLocaleString()}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(120,53,15,0.5)' }}>/ person</span>
                </div>
            </div>
        </motion.div>

        {/* ─── Mobile: full-screen bottom drawer ──────────────────────────── */}
        <AnimatePresence>
            {showContact && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowContact(false)}
                        className="fixed inset-0 z-50"
                        style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
                    />

                    {/* Drawer / modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="fixed z-50 bg-white"
                        style={{
                            bottom: 0, left: 0, right: 0,
                            borderRadius: '28px 28px 0 0',
                            padding: '28px 24px 40px',
                            boxShadow: '0 -8px 60px rgba(0,0,0,0.25)',
                        }}
                    >
                        {/* Handle */}
                        <div className="w-12 h-1.5 rounded-full mx-auto mb-6" style={{ background: '#e5e7eb' }} />

                        {/* Header */}
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h3 className="font-serif font-bold text-xl" style={{ color: '#7c2d12' }}>
                                    {pkg.title}
                                </h3>
                                <p className="text-sm mt-0.5" style={{ color: 'rgba(120,53,15,0.6)' }}>
                                    Choose how to reach us
                                </p>
                            </div>
                            <motion.button
                                onClick={() => setShowContact(false)}
                                whileTap={{ scale: 0.88 }}
                                className="w-9 h-9 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                            >
                                <FaTimes />
                            </motion.button>
                        </div>

                        {/* Contact grid — 2 cols on mobile, 3 on wider */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {contactOptions.map((opt, i) => (
                                <motion.a
                                    key={opt.label}
                                    href={opt.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.94 }}
                                    className="flex flex-col items-center justify-center gap-2.5 py-4 px-3 rounded-2xl font-bold"
                                    style={{
                                        background: opt.bg,
                                        color: opt.color,
                                        minHeight: '80px',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                                        fontSize: '0.85rem',
                                    }}
                                >
                                    <opt.icon className="text-2xl" />
                                    <span>{opt.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        </>
    );
};

export default PackageCard;
