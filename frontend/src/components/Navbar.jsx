/* eslint-disable no-unused-vars */
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import knkLogo from '../assets/file_000000009b94720784d2ef29a08ad1c8.png';

const navLinks = [
    { to: '/',        label: 'Home' },
    { to: '/#about',  label: 'About' },
    { to: '/packages',label: 'Packages' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/enquiry', label: 'Enquiry' },
    { to: '/contact', label: 'Contact' },
];

const NAV_BG_SCROLLED   = 'linear-gradient(135deg,rgba(78,30,5,0.98) 0%,rgba(110,45,8,0.98) 50%,rgba(78,30,5,0.98) 100%)';
const NAV_BG_TOP        = 'linear-gradient(135deg,rgba(60,22,3,0.92) 0%,rgba(95,38,6,0.92) 50%,rgba(60,22,3,0.92) 100%)';

const Navbar = () => {
    const [scrolled,   setScrolled]   = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isDesktop,  setIsDesktop]  = useState(window.innerWidth >= 1024);
    const location = useLocation();

    useEffect(() => {
        const onResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const isActive = (link) =>
        link.to.includes('#')
            ? location.pathname + location.hash === link.to
            : location.pathname === link.to;

    /* ─── Desktop link renderer ─── */
    const renderDesktopLink = (link, i) => {
        const active  = isActive(link);
        const isHash  = link.to.includes('#');
        const style   = {
            position: 'relative',
            padding: '8px 13px',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: active ? 700 : 600,
            fontSize: '0.82rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: active ? '#fbbf24' : 'rgba(254,243,199,0.88)',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'color 0.2s',
            display: 'inline-block',
        };
        const hover = {
            onMouseEnter: e => (e.currentTarget.style.color = '#fbbf24'),
            onMouseLeave: e => (e.currentTarget.style.color = active ? '#fbbf24' : 'rgba(254,243,199,0.88)'),
        };
        const inner = (
            <>
                {link.label}
                {active && (
                    <motion.span
                        layoutId="nav-underline"
                        style={{
                            position: 'absolute', bottom: '2px', left: '8px', right: '8px',
                            height: '2px', borderRadius: '999px',
                            background: 'linear-gradient(90deg,#fbbf24,#f59e0b)',
                        }}
                    />
                )}
            </>
        );
        if (isHash) return <a key={i} href={link.to} style={style} {...hover} onClick={() => setMobileOpen(false)}>{inner}</a>;
        return <Link key={i} to={link.to} style={style} {...hover} onClick={() => setMobileOpen(false)}>{inner}</Link>;
    };

    /* ─── Mobile link renderer ─── */
    const renderMobileLink = (link, i) => {
        const active = isActive(link);
        const isHash = link.to.includes('#');
        const style  = {
            display: 'block',
            padding: '12px 18px',
            borderRadius: '10px',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: active ? 700 : 500,
            fontSize: '0.95rem',
            letterSpacing: '0.03em',
            color: active ? '#fbbf24' : 'rgba(254,243,199,0.90)',
            background: active ? 'rgba(251,191,36,0.10)' : 'transparent',
            textDecoration: 'none',
            borderLeft: active ? '3px solid #fbbf24' : '3px solid transparent',
            transition: 'all 0.2s',
        };
        const inner = <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>{link.label}</motion.div>;
        if (isHash) return <a key={i} href={link.to} style={style} onClick={() => setMobileOpen(false)}>{inner}</a>;
        return <Link key={i} to={link.to} style={style} onClick={() => setMobileOpen(false)}>{inner}</Link>;
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                background:    scrolled ? NAV_BG_SCROLLED : NAV_BG_TOP,
                backdropFilter: 'blur(20px)',
                borderBottom:  scrolled ? '1px solid rgba(251,191,36,0.35)' : '1px solid rgba(251,191,36,0.12)',
                boxShadow:     scrolled ? '0 4px 40px rgba(0,0,0,0.5),0 1px 0 rgba(251,191,36,0.18)' : 'none',
            }}
        >
            {/* Top gold shimmer */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24 30%,#fde68a 50%,#fbbf24 70%,transparent)' }} />

            <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
                <div className="flex items-center justify-between" style={{ height: '70px' }}>

                    {/* ══ LOGO + BRAND ══ */}
                    <Link to="/" className="flex-shrink-0 flex items-center" style={{ gap: '2px', textDecoration: 'none' }}>
                        {/* Logo */}
                        <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <img
                                src={knkLogo}
                                alt="KNK Trip Cart"
                                style={{ width: '58px', height: '58px', objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.45))' }}
                            />
                        </div>

                        {/* Company name + decorative line */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '2px' }}>
                            <span style={{
                                fontFamily: "'Cinzel', 'Playfair Display', serif",
                                fontWeight: 700,
                                fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)',
                                letterSpacing: '0.06em',
                                color: '#fbbf24',
                                textTransform: 'uppercase',
                                lineHeight: 1.15,
                                whiteSpace: 'nowrap',
                                textShadow: '0 0 20px rgba(251,191,36,0.4)',
                            }}>
                                KNK Trip Cart
                            </span>

                            {/* Gold gradient line below name */}
                            <div style={{
                                marginTop: '3px',
                                height: '2px',
                                borderRadius: '999px',
                                background: 'linear-gradient(90deg,#f59e0b,#fde68a,#f59e0b)',
                                boxShadow: '0 0 6px rgba(251,191,36,0.5)',
                            }} />

                            <span style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 500,
                                fontSize: '0.58rem',
                                letterSpacing: '0.18em',
                                color: 'rgba(253,230,138,0.80)',
                                textTransform: 'uppercase',
                                marginTop: '2px',
                            }}>
                                Spiritual Travels
                            </span>
                        </div>
                    </Link>

                    {/* ══ DESKTOP NAV ══ */}
                    <nav className="items-center gap-0.5" style={{ display: isDesktop ? 'flex' : 'none' }}>
                        {navLinks.map((link, i) => renderDesktopLink(link, i))}
                    </nav>

                    {/* ══ PHONE CTA (desktop) ══ */}
                    <a
                        href="tel:+919629202940"
                        style={{
                            display: isDesktop ? 'flex' : 'none',
                            alignItems: 'center', gap: '7px',
                            padding: '9px 17px',
                            borderRadius: '999px',
                            background: 'linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%)',
                            color: '#7c2d12',
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            letterSpacing: '0.03em',
                            textDecoration: 'none',
                            boxShadow: '0 4px 18px rgba(251,191,36,0.35)',
                            transition: 'box-shadow 0.25s, transform 0.25s',
                            flexShrink: 0,
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(251,191,36,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 18px rgba(251,191,36,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <FaPhone size={12} />
                        +91 96292 02940
                    </a>

                    {/* ══ MOBILE BURGER ══ */}
                    <button
                        style={{
                            display: isDesktop ? 'none' : 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            width: '42px', height: '42px',
                            borderRadius: '10px',
                            background: 'rgba(251,191,36,0.12)',
                            color: '#fbbf24',
                            border: '1.5px solid rgba(251,191,36,0.3)',
                            cursor: 'pointer',
                            flexShrink: 0,
                        }}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* Bottom gold shimmer */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(251,191,36,0.3),transparent)' }} />

            {/* ══ MOBILE DROPDOWN ══ */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'linear-gradient(135deg,rgba(60,22,3,0.99),rgba(95,38,6,0.99))',
                            borderBottom: '1px solid rgba(251,191,36,0.22)',
                            backdropFilter: 'blur(20px)',
                            overflow: 'hidden',
                        }}
                    >
                        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {navLinks.map((link, i) => renderMobileLink(link, i))}

                            {/* Phone CTA in mobile */}
                            <a
                                href="tel:+919629202940"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    margin: '10px 0 4px',
                                    padding: '13px 24px',
                                    borderRadius: '999px',
                                    background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
                                    color: '#7c2d12',
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 700, fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 18px rgba(251,191,36,0.3)',
                                }}
                            >
                                <FaPhone size={14} />
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
