"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import knkLogo from '../assets/Gemini_Generated_Image_vvyvj2vvyvj2vvyv-Photoroom.png';

const navLinks = [
    { to: '/',         label: 'Home' },
    { to: '/#about',   label: 'About' },
    { to: '/packages', label: 'Packages' },
    { to: '/gallery',  label: 'Gallery' },
    { to: '/contact',  label: 'Contact' },
];

const NAV_BG_SCROLLED = 'linear-gradient(135deg,rgba(78,30,5,0.98) 0%,rgba(110,45,8,0.98) 50%,rgba(78,30,5,0.98) 100%)';
const NAV_BG_TOP      = 'linear-gradient(135deg,rgba(60,22,3,0.95) 0%,rgba(95,38,6,0.95) 50%,rgba(60,22,3,0.95) 100%)';

export default function Navbar() {
    const [scrolled,    setScrolled]    = useState(false);
    const [mobileOpen,  setMobileOpen]  = useState(false);
    const [isMounted,   setIsMounted]   = useState(false);
    const [currentHash, setCurrentHash] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        setCurrentHash(window.location.hash);

        const onScroll     = () => setScrolled(window.scrollY > 40);
        const onHashChange = () => setCurrentHash(window.location.hash);
        window.addEventListener('scroll', onScroll);
        window.addEventListener('hashchange', onHashChange);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    // ✅ FIX: Reset hash whenever the pathname changes (e.g. /#about → /)
    // Without this, currentHash stays as '#about' and Home never gets the underline.
    useEffect(() => {
        setCurrentHash(window.location.hash);
    }, [pathname]);

    // Close menu on route/hash change
    useEffect(() => { setMobileOpen(false); }, [pathname, currentHash]);

    // Lock body scroll when menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isActive = (link) => {
        if (!isMounted) return false;
        if (link.to === '/') {
            return pathname === '/' && (!currentHash || currentHash === '');
        }
        if (link.to.includes('#')) {
            const [base, hash] = link.to.split('#');
            return pathname === base && currentHash === `#${hash}`;
        }
        return pathname.startsWith(link.to);
    };

    // Don't show navbar on admin pages
    if (pathname?.startsWith('/admin')) return null;

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background: scrolled ? NAV_BG_SCROLLED : NAV_BG_TOP,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(251,191,36,0.15)',
                boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
            }}
        >
            {/* Gold accent line */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24 30%,#fde68a 50%,#fbbf24 70%,transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between" style={{ height: '62px' }}>

                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => {
                        setCurrentHash('');
                        setMobileOpen(false);
                        if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                        <Image
                            src={knkLogo}
                            alt="KNK Trip Cart"
                            height={40}
                            priority
                            style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.4))' }}
                        />
                        <div className="flex flex-col leading-none">
                            <span style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(0.7rem, 2.8vw, 1rem)',
                                color: '#fbbf24',
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                whiteSpace: 'nowrap',
                            }}>
                                KNK Trip Cart
                            </span>
                            <span className="hidden sm:block" style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: '0.5rem',
                                color: 'rgba(253,230,138,0.7)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                fontWeight: 500,
                            }}>
                                Spiritual Travels
                            </span>
                        </div>
                    </Link>

                    {/* ── Desktop nav links (lg+) ── */}
                    {/*
                        UNDERLINE APPROACH:
                        Each nav item is a flex column that fills the full 62px navbar height.
                        The link sits at centre, and the underline bar is a div pinned to
                        the bottom of the 62px container — this guarantees it always sits
                        at the exact bottom edge of the navbar regardless of content.
                    */}
                    <nav className="hidden lg:flex items-stretch h-full gap-0.5" style={{ height: '62px' }}>
                        {navLinks.map((link) => {
                            const active = isActive(link);
                            return (
                                <div key={link.to} className="relative flex flex-col justify-center">
                                    {/* The link text */}
                                    <Link
                                        href={link.to}
                                        onClick={() => {
                                            if (link.to.includes('#')) {
                                                setCurrentHash(link.to.substring(link.to.indexOf('#')));
                                            } else {
                                                setCurrentHash('');
                                                if (pathname === link.to) window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                        className="px-3 text-sm font-bold uppercase tracking-wider transition-colors duration-200"
                                        style={{ color: active ? '#fbbf24' : 'rgba(253,230,138,0.85)' }}
                                    >
                                        {link.label}
                                    </Link>
                                    {/* Underline — lifted slightly up from the bottom */}
                                    {active && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute left-1 right-1 rounded-full"
                                            style={{
                                                bottom: '12px',
                                                height: '3px',
                                                background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                                                boxShadow: '0 0 8px rgba(251,191,36,0.7)',
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}


                        <a
                            href="tel:+919384301588"
                            className="ml-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-[13px] text-amber-400 transition-colors whitespace-nowrap"
                        >
                            <FaPhone size={12} />
                            <span className="tracking-wide">+91 93843 01588</span>
                        </a>
                    </nav>

                    {/* ── Mobile: Call + Hamburger (visible below lg) ── */}
                    <div className="flex lg:hidden items-center gap-2">

                        {/* Call button — always visible */}
                        <a
                            href="tel:+919384301588"
                            aria-label="Call us"
                            className="flex items-center justify-center gap-1.5 px-2 py-1 rounded-full font-semibold text-xs text-amber-400 hover:bg-amber-400/10 transition-colors"
                        >
                            <FaPhone size={12} />
                            <span className="hidden sm:inline">+91 93843 01588</span>
                        </a>

                        {/* Hamburger button */}
                        <button
                            onClick={() => setMobileOpen(prev => !prev)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                            style={{
                                width: '40px',
                                height: '40px',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                background: 'rgba(251,191,36,0.12)',
                                border: '1px solid rgba(251,191,36,0.35)',
                                color: '#fbbf24',
                                cursor: 'pointer',
                            }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {mobileOpen
                                    ? <motion.span
                                        key="x"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                      >
                                        <FaTimes size={18} />
                                      </motion.span>
                                    : <motion.span
                                        key="bars"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                      >
                                        <FaBars size={18} />
                                      </motion.span>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile Dropdown Menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="lg:hidden overflow-hidden"
                        style={{
                            borderTop: '1px solid rgba(251,191,36,0.12)',
                            background: 'linear-gradient(160deg,rgba(50,16,2,0.99),rgba(85,32,4,0.99))',
                        }}
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link, i) => {
                                const active = isActive(link);
                                const linkStyle = {
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '0.95rem',
                                    color: active ? '#fbbf24' : 'rgba(253,230,138,0.85)',
                                    background: active ? 'rgba(251,191,36,0.10)' : 'transparent',
                                    borderLeft: `3px solid ${active ? '#fbbf24' : 'transparent'}`,
                                    textDecoration: 'none',
                                    transition: 'background 0.15s, color 0.15s',
                                };
                                return (
                                    <motion.div
                                        key={link.to}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                    >
                                        <Link
                                            href={link.to}
                                            onClick={() => {
                                                if (link.to.includes('#')) {
                                                    setCurrentHash(link.to.substring(link.to.indexOf('#')));
                                                } else {
                                                    setCurrentHash('');
                                                    if (pathname === link.to) window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }
                                                setMobileOpen(false);
                                            }}
                                            style={linkStyle}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <div style={{ paddingTop: '12px', marginTop: '4px', borderTop: '1px solid rgba(251,191,36,0.12)' }}>
                                <a
                                    href="tel:+919384301588"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-3 w-full font-semibold transition-colors hover:bg-amber-400/10 text-amber-400"
                                    style={{
                                        padding: '12px 0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <FaPhone size={14} />
                                    +91 93843 01588
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
