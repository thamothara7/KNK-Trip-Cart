"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import knkLogo from '../assets/Gemini_Generated_Image_vvyvj2vvyvj2vvyv-Photoroom.png';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/#about', label: 'About' },
    { to: '/packages', label: 'Packages' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
];

const NAV_BG_SCROLLED = 'linear-gradient(135deg,rgba(78,30,5,0.98) 0%,rgba(110,45,8,0.98) 50%,rgba(78,30,5,0.98) 100%)';
const NAV_BG_TOP = 'linear-gradient(135deg,rgba(60,22,3,0.92) 0%,rgba(95,38,6,0.92) 50%,rgba(60,22,3,0.92) 100%)';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [currentHash, setCurrentHash] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        setCurrentHash(window.location.hash);

        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);

        const onHashChange = () => setCurrentHash(window.location.hash);
        window.addEventListener('hashchange', onHashChange);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname, currentHash]);

    const isActive = (link) => {
        if (!isMounted) return false;
        if (link.to.includes('#')) {
            const [basePath, hash] = link.to.split('#');
            return pathname === basePath && currentHash === `#${hash}`;
        }
        return pathname === link.to && currentHash === '';
    };

    const renderNavLink = (link, i, mobile = false) => {
        const active = isActive(link);
        const isHash = link.to.includes('#');
        const activeClassStr = active ? 'text-amber-300' : 'text-amber-100/90 hover:text-amber-300';
        const mobileActiveClassStr = active ? 'text-amber-300 bg-amber-400/10 border-l-4 border-amber-300' : 'text-amber-100/90';

        if (mobile) {
            return (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    {isHash ? (
                        <a href={link.to} onClick={() => setMobileOpen(false)} className={`block px-5 py-3 rounded-xl font-bold transition-all duration-200 ${mobileActiveClassStr}`}>
                            {link.label}
                        </a>
                    ) : (
                        <Link href={link.to} onClick={() => setMobileOpen(false)} className={`block px-5 py-3 rounded-xl font-bold transition-all duration-200 ${mobileActiveClassStr}`}>
                            {link.label}
                        </Link>
                    )}
                </motion.div>
            );
        }

        return (
            <div key={i} className="relative px-2">
                {isHash ? (
                    <a href={link.to} className={`px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg ${activeClassStr}`}>
                        {link.label}
                    </a>
                ) : (
                    <Link href={link.to} className={`px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg ${activeClassStr}`}>
                        {link.label}
                    </Link>
                )}
                {active && (
                    <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg,#fbbf24,#f59e0b)' }}
                    />
                )}
            </div>
        );
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: scrolled ? NAV_BG_SCROLLED : NAV_BG_TOP,
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(251,191,36,0.15)',
                boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
            }}
        >
            <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24 30%,#fde68a 50%,#fbbf24 70%,transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between" style={{ height: '75px' }}>

                    {/* Logo area */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                        <Image
                            src={knkLogo}
                            alt="KNK Trip Cart Logo"
                            height={58}
                            priority
                            style={{
                                height: '58px',
                                width: 'auto',
                                filter: 'drop-shadow(0px 0px 8px rgba(251,191,36,0.45))',
                                objectFit: 'contain',
                            }}
                        />
                        <div className="flex flex-col">
                            <span
                                className="text-xl md:text-2xl font-bold tracking-wider text-amber-300 uppercase leading-none"
                                style={{ fontFamily: 'var(--font-display, Outfit)' }}
                            >
                                KNK Trip Cart
                            </span>
                            <span className="text-[0.6rem] tracking-[0.2em] font-medium text-amber-100/70 uppercase">
                                Spiritual Travels
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, i) => renderNavLink(link, i))}

                        <a
                            href="tel:+919629202940"
                            className="ml-4 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-maroon transition-all duration-300 hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', boxShadow: '0 4px 15px rgba(251,191,36,0.3)' }}
                        >
                            <FaPhone size={14} />
                            +91 96292 02940
                        </a>
                    </nav>

                    {/* Mobile Toggle Button */}
                    <button
                        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl"
                        style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden overflow-hidden"
                        style={{ background: 'linear-gradient(135deg,rgba(60,22,3,0.99),rgba(95,38,6,0.99))', backdropFilter: 'blur(20px)' }}
                    >
                        <div className="px-4 py-6 space-y-2">
                            {navLinks.map((link, i) => renderNavLink(link, i, true))}
                            <a
                                href="tel:+919629202940"
                                className="flex items-center justify-center gap-3 w-full py-4 mt-4 rounded-xl font-bold text-maroon"
                                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                            >
                                <FaPhone size={16} />
                                +91 96292 02940
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
