"use client";
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaWhatsapp, FaPhone, FaInstagram, FaFacebookF, FaEnvelope, FaTimes, FaArrowRight } from 'react-icons/fa';

const WHATSAPP = `https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20this%20package.%20Please%20share%20more%20details.`;
const PHONE   = 'tel:+919629202940';
const EMAIL   = 'mailto:saishivatours@gmail.com';
const IG      = 'https://www.instagram.com/knktripcart/';
const FB      = 'https://www.facebook.com/knktripcart/';

const contactOptions = [
    { icon: FaWhatsapp,  label: 'WhatsApp',  href: WHATSAPP, bg: '#25D366', color: '#fff' },
    { icon: FaPhone,     label: 'Call Us',   href: PHONE,    bg: '#7c2d12', color: '#fbbf24' },
    { icon: FaInstagram, label: 'Instagram', href: IG,       bg: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)', color: '#fff' },
    { icon: FaFacebookF, label: 'Facebook',  href: FB,       bg: '#1877F2', color: '#fff' },
    { icon: FaEnvelope,  label: 'Email',     href: EMAIL,    bg: '#f59e0b', color: '#7c2d12' },
];

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=800';

const PackageCard = ({ pkg }) => {
    const [showContact, setShowContact] = useState(false);
    const [imgError, setImgError] = useState(false);
    const popupRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        if (!showContact) return;
        const handler = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) setShowContact(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showContact]);

    // Prevent body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = showContact ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [showContact]);

    const imgSrc = imgError
        ? FALLBACK_IMAGE
        : (pkg.images?.[0] || FALLBACK_IMAGE);

    return (
        <>
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl overflow-hidden group flex flex-col"
            style={{
                boxShadow: '0 4px 30px rgba(120,53,15,0.10)',
                border: '1.5px solid rgba(251,191,36,0.2)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 56px rgba(120,53,15,0.18)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 30px rgba(120,53,15,0.10)'}
        >
            {/* ── Image area — clicking image navigates to detail page */}
            <Link href={`/packages/${pkg._id}`} className="block relative overflow-hidden rounded-t-3xl h-56 sm:h-60 group/img">
                <img
                    src={imgSrc}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    loading="lazy"
                    onError={() => setImgError(true)}
                />
                {/* Category badge */}
                {pkg.category && (
                    <div className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
                        style={{ background: 'rgba(78,30,5,0.90)', color: '#fbbf24', backdropFilter: 'blur(4px)' }}>
                        {pkg.category}
                    </div>
                )}
                {/* View Details hover label */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(78,30,5,0.55)' }}>
                    <span className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-amber-950"
                        style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}>
                        View Details <FaArrowRight size={12} />
                    </span>
                </div>
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-20"
                    style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.55),transparent)' }} />
            </Link>

            {/* ── Card Body */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                {/* Title — also a link */}
                <Link href={`/packages/${pkg._id}`}>
                    <h3 className="font-serif font-bold text-base sm:text-lg leading-snug mb-2 hover:text-amber-700 transition-colors"
                        style={{ color: '#7c2d12' }}>
                        {pkg.title}
                    </h3>
                </Link>

                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm mb-2" style={{ color: 'rgba(120,53,15,0.65)' }}>
                    <span className="flex items-center gap-1">
                        <FaMapMarkerAlt style={{ color: '#f59e0b', flexShrink: 0 }} />
                        {pkg.destination}
                    </span>
                    <span className="flex items-center gap-1">
                        <FaClock style={{ color: '#f59e0b', flexShrink: 0 }} />
                        {pkg.duration}
                    </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 flex-1" style={{ color: 'rgba(120,53,15,0.7)' }}>
                    {pkg.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-1 py-2 border-t border-amber-100 mb-3">
                    <FaRupeeSign style={{ color: '#f59e0b', fontSize: '13px' }} />
                    <span className="font-bold text-base sm:text-lg" style={{ color: '#f59e0b' }}>
                        {pkg.price?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(120,53,15,0.5)' }}>/ person</span>
                </div>

                {/* ── Action buttons */}
                <div className="flex gap-2">
                    {/* View Details */}
                    <Link
                        href={`/packages/${pkg._id}`}
                        className="flex-1 text-center py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all hover:opacity-90 active:scale-95"
                        style={{ background: 'linear-gradient(135deg,#7c2d12,#b45309)', color: '#fde68a' }}
                    >
                        View Details
                    </Link>
                    {/* Contact Us */}
                    <button
                        onClick={() => setShowContact(true)}
                        className="flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all hover:opacity-90 active:scale-95"
                        style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#7c2d12' }}
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </motion.div>

        {/* ─── Contact Drawer ─────────────────────────── */}
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

                    {/* Drawer */}
                    <motion.div
                        ref={popupRef}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 80 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed z-50 bg-white"
                        style={{
                            bottom: 0, left: 0, right: 0,
                            borderRadius: '24px 24px 0 0',
                            padding: '24px 20px 36px',
                            boxShadow: '0 -8px 60px rgba(0,0,0,0.25)',
                        }}
                    >
                        {/* Handle */}
                        <div className="w-10 h-1.5 rounded-full mx-auto mb-5" style={{ background: '#e5e7eb' }} />

                        {/* Header */}
                        <div className="flex justify-between items-start mb-5">
                            <div>
                                <h3 className="font-serif font-bold text-lg sm:text-xl" style={{ color: '#7c2d12' }}>
                                    {pkg.title}
                                </h3>
                                <p className="text-sm mt-0.5" style={{ color: 'rgba(120,53,15,0.6)' }}>
                                    Choose how to reach us
                                </p>
                            </div>
                            <button
                                onClick={() => setShowContact(false)}
                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}
                            >
                                <FaTimes size={15} />
                            </button>
                        </div>

                        {/* Contact options — 2 cols on phone, more on wider */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {contactOptions.map((opt, i) => (
                                <motion.a
                                    key={opt.label}
                                    href={opt.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.94 }}
                                    className="flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl font-bold"
                                    style={{
                                        background: opt.bg,
                                        color: opt.color,
                                        minHeight: '76px',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    <opt.icon size={22} />
                                    <span>{opt.label}</span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Also view full details link */}
                        <Link
                            href={`/packages/${pkg._id}`}
                            onClick={() => setShowContact(false)}
                            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm"
                            style={{ background: 'rgba(124,45,18,0.06)', color: '#7c2d12', border: '1.5px solid rgba(124,45,18,0.15)' }}
                        >
                            View Full Package Details →
                        </Link>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        </>
    );
};

export default PackageCard;
