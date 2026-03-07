import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import knkLogo from '../assets/file_000000009b94720784d2ef29a08ad1c8.png';

const E = (str) => <span className="apple-emoji">{str}</span>;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location]);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/packages', label: 'Packages' },
        { to: '/#about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Top announcement bar */}
            <div
                className="text-center py-2.5 tracking-wider font-semibold text-sm px-4"
                style={{ background: 'linear-gradient(90deg,#92400e,#b45309,#92400e)', color: '#fef3c7' }}
            >
                <span className="apple-emoji">🙏</span> Your Premium Spiritual Travel Partner — KNK Trip Cart <span className="apple-emoji">🙏</span>
            </div>

            <nav
                className="sticky top-0 z-50 transition-all duration-500"
                style={{
                    backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
                    borderBottom: scrolled ? '2px solid #fbbf24' : '1px solid rgba(251,191,36,0.25)',
                    boxShadow: scrolled ? '0 4px 32px rgba(251,191,36,0.18)' : 'none',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                }}
            >
                {/* Top thin gold rule */}
                <div style={{ height: '3px', background: 'linear-gradient(to right,transparent,#fbbf24,#f59e0b,#fbbf24,transparent)' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-1.5">

                        {/* ── Logo ─────────────────────────────────────────── */}
                        <Link to="/" className="flex items-center group">
                            <motion.img
                                src={knkLogo}
                                alt="KNK Trip Cart"
                                className="object-contain"
                                style={{
                                    height: '68px',
                                    width: 'auto',
                                    mixBlendMode: 'multiply',
                                    filter: 'drop-shadow(0 2px 4px rgba(124,45,18,0.15))',
                                }}
                                whileHover={{ scale: 1.04 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            />
                        </Link>

                        {/* ── Desktop Links ────────────────────────────────── */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.to}
                                    className="relative px-5 py-2.5 text-base font-semibold tracking-wide transition-all duration-300 rounded-xl hover:bg-amber-50"
                                    style={{ color: location.pathname === link.to ? '#b45309' : '#78350f' }}
                                >
                                    {link.label}
                                    {location.pathname === link.to && (
                                        <motion.div
                                            layoutId="navUnderline"
                                            className="absolute bottom-1.5 left-3 right-3 rounded-full"
                                            style={{ height: '3px', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}
                                        />
                                    )}
                                </Link>
                            ))}

                            {/* Contact CTA */}
                            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                                <Link
                                    to="/contact"
                                    className="ml-3 px-7 py-3 text-base font-bold rounded-full inline-flex items-center gap-2"
                                    style={{
                                        background: 'linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%)',
                                        color: '#7c2d12',
                                        boxShadow: '0 4px 20px rgba(251,191,36,0.45)',
                                        letterSpacing: '0.03em',
                                    }}
                                >
                                    <span className="apple-emoji">📞</span> Contact Us
                                </Link>
                            </motion.div>
                        </div>

                        {/* ── Mobile Burger ──────────────────────────────────── */}
                        <div className="flex items-center gap-3 md:hidden">
                            {/* Mobile Contact CTA */}
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Link
                                    to="/contact"
                                    className="px-4 py-2.5 text-sm font-bold rounded-full inline-flex items-center gap-1.5"
                                    style={{
                                        background: 'linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%)',
                                        color: '#7c2d12',
                                        boxShadow: '0 3px 12px rgba(251,191,36,0.4)',
                                    }}
                                >
                                    <span className="apple-emoji text-xs">📞</span> Contact
                                </Link>
                            </motion.div>
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-3 rounded-xl text-amber-900 text-xl"
                                style={{ background: 'rgba(251,191,36,0.12)' }}
                                whileTap={{ scale: 0.88 }}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <FaTimes /> : <FaBars />}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Bottom thin gold rule */}
                <div style={{ height: '2px', background: 'linear-gradient(to right,transparent,#fbbf24,transparent)' }} />

                {/* ── Mobile Menu ─────────────────────────────────────────────── */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                            style={{ background: '#ffffff', borderBottom: '2px solid rgba(251,191,36,0.3)' }}
                        >
                            <div className="px-5 py-4 space-y-1.5">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07 }}
                                    >
                                        <Link
                                            to={link.to}
                                            className="block px-5 py-4 rounded-2xl font-semibold text-lg transition-colors"
                                            style={{ color: '#78350f', background: location.pathname === link.to ? 'rgba(251,191,36,0.12)' : 'transparent' }}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Link
                                        to="/contact"
                                        className="block px-5 py-4 rounded-2xl font-bold text-lg text-center"
                                        style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#7c2d12' }}
                                    >
                                        <span className="apple-emoji">📞</span> Contact Us
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};
export default Navbar;
