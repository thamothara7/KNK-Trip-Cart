import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes, FaOm } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) setIsDark(true);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location]);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        setIsDark(!isDark);
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/packages', label: 'Packages' },
        { to: '/contact', label: 'Enquiry' },
        { to: '/contact', label: 'Contact Us' },
    ];

    return (
        <>
            {/* Top decorative bar */}
            <div className="bg-maroon text-cream text-xs text-center py-1.5 tracking-widest font-semibold">
                🙏 OM SAI RAM — Your Trusted Spiritual Travel Partner Since 2010 🙏
            </div>

            <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-cream/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-md'
                : 'bg-cream dark:bg-gray-900'}`}>

                {/* Vintage border */}
                <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-18 items-center py-3">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                                <FaOm className="text-3xl text-saffron group-hover:text-gold transition-colors" />
                            </motion.div>
                            <div>
                                <span className="text-2xl font-serif font-bold text-maroon dark:text-gold tracking-wide">
                                    Sai Shiva Tours
                                </span>
                                <p className="text-[10px] text-gold tracking-[0.2em] uppercase -mt-1">Spiritual Journey Experts</p>
                            </div>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.to}
                                    className={`relative px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-300
                                        ${location.pathname === link.to
                                            ? 'text-saffron'
                                            : 'text-maroon dark:text-cream hover:text-saffron dark:hover:text-gold'}`}
                                >
                                    {link.label}
                                    {location.pathname === link.to && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-saffron rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="ml-4 p-2.5 rounded-full bg-maroon/10 dark:bg-gold/20 text-maroon dark:text-gold hover:bg-maroon/20 dark:hover:bg-gold/30 transition-all"
                            >
                                {isDark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-maroon dark:text-gold text-2xl"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-cream dark:bg-gray-900 border-t border-gold/30 overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link, i) => (
                                    <Link
                                        key={i}
                                        to={link.to}
                                        className="block px-4 py-3 rounded-lg text-maroon dark:text-cream font-semibold hover:bg-saffron/10 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <button
                                    onClick={toggleTheme}
                                    className="w-full text-left px-4 py-3 rounded-lg text-maroon dark:text-cream font-semibold hover:bg-saffron/10 transition-colors flex items-center gap-2"
                                >
                                    {isDark ? <FaSun /> : <FaMoon />} {isDark ? 'Light Mode' : 'Dark Mode'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};
export default Navbar;
