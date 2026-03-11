"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import knkLogo from '../assets/Gemini_Generated_Image_vvyvj2vvyvj2vvyv-Photoroom.png';

const navLinks = [
    { to: '/',        label: 'Home' },
    { to: '/#about',  label: 'About' },
    { to: '/packages', label: 'Packages' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/contact', label: 'Contact' },
];

const NAV_BG_SCROLLED = 'linear-gradient(135deg,rgba(78,30,5,0.98) 0%,rgba(110,45,8,0.98) 50%,rgba(78,30,5,0.98) 100%)';
const NAV_BG_TOP      = 'linear-gradient(135deg,rgba(60,22,3,0.92) 0%,rgba(95,38,6,0.92) 50%,rgba(60,22,3,0.92) 100%)';

const Navbar = () => {
    const [scrolled,    setScrolled]    = useState(false);
    const [mobileOpen,  setMobileOpen]  = useState(false);
    const [isMounted,   setIsMounted]   = useState(false);
    const [currentHash, setCurrentHash] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        setCurrentHash(window.location.hash);

        const onScroll    = () => setScrolled(window.scrollY > 40);
        const onHashChange = () => setCurrentHash(window.location.hash);

        window.addEventListener('scroll', onScroll);
        window.addEventListener('hashchange', onHashChange);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    // Close mobile menu on navigation
    useEffect(() => { setMobileOpen(false); }, [pathname, currentHash]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isActive = (link) => {
        if (!isMounted) return false;
        if (link.to.includes('#')) {
            const [basePath, hash] = link.to.split('#');
            return pathname === basePath && currentHash === `#${hash}`;
        }
        return pathname === link.to && currentHash === '';
    };

    if (pathname?.startsWith('/admin')) return null;

    // ── Desktop link renderer
    const DesktopLink = ({ link, i }) => {
        const active = isActive(link);
        const cls = `px-3 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg ${active ? 'text-amber-300' : 'text-amber-100/90 hover:text-amber-300'}`;
        return (
            <div className="relative px-1">
                {link.to.includes('#')
                    ? <a href={link.to} className={cls}>{link.label}</a>
                    : <Link href={link.to} className={cls}>{link.label}</Link>
                }
                {active && (
                    <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg,#fbbf24,#f59e0b)' }}
                    />
                )}
            </div>
        );
    };

    // ── Mobile link renderer
    const MobileLink = ({ link, i }) => {
        const active = isActive(link);
        const cls = `flex items-center px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${active ? 'text-amber-300 bg-amber-400/10 border-l-4 border-amber-300' : 'text-amber-100/90 hover:bg-white/5'}`;
        return (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                {link.to.includes('#')
                    ? <a href={link.to} onClick={() => setMobileOpen(false)} className={cls}>{link.label}</a>
                    : <Link href={link.to} onClick={() => setMobileOpen(false)} className={cls}>{link.label}</Link>
                }
            </motion.div>
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
            {/* Gold accent line */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24 30%,#fde68a 50%,#fbbf24 70%,transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between" style={{ height: '62px' }}>

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 min-w-0">
                        <Image
                            src={knkLogo}
                            alt="KNK Trip Cart"
                            height={44}
                            priority
                            style={{ height: '44px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.45))' }}
                        />
                        <div className="flex flex-col min-w-0">
                            <span className="text-base sm:text-lg font-bold tracking-wider text-amber-300 uppercase leading-none truncate"
                                style={{ fontFamily: 'var(--font-display,Outfit)' }}>
                                KNK Trip Cart
                            </span>
                            <span className="text-[0.55rem] tracking-[0.18em] font-medium text-amber-100/70 uppercase">
                                Spiritual Travels
                            </span>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-0.5 ml-4">
                        {navLinks.map((link, i) => <DesktopLink key={link.to} link={link} i={i} />)}
                        <a
                            href="tel:+919384301588"
                            className="ml-3 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-amber-950 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                            style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', boxShadow: '0 4px 15px rgba(251,191,36,0.3)' }}
                        >
                            <FaPhone size={13} />
                            <span>Call Us</span>
                        </a>
                    </nav>

                    {/* Mobile: show phone + hamburger */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <a
                            href="tel:+919384301588"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full font-bold text-xs text-amber-950"
                            style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}
                            aria-label="Call"
                        >
                            <FaPhone size={12} />
                            <span className="hidden xs:inline">Call</span>
                        </a>
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-xl"
                            style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)' }}
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {mobileOpen
                                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><FaTimes size={20} /></motion.span>
                                    : <motion.span key="bars" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><FaBars size={20} /></motion.span>
                                }
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="lg:hidden overflow-hidden border-t border-amber-400/10"
                        style={{ background: 'linear-gradient(160deg,rgba(55,18,2,0.99),rgba(90,35,5,0.99))' }}
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link, i) => <MobileLink key={link.to} link={link} i={i} />)}
                            <div className="pt-3 mt-1 border-t border-amber-400/10">
                                <a
                                    href="tel:+919384301588"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-bold text-amber-950 text-sm"
                                    style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)' }}
                                >
                                    <FaPhone size={15} />
                                    +91 93843 01588
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
