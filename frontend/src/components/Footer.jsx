import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: FaWhatsapp, href: 'https://wa.me/919629202940', label: 'WhatsApp', color: '#25D366' },
        { icon: FaInstagram, href: 'https://www.instagram.com/knktripcart/', label: 'Instagram', color: '#E1306C' },
        { icon: FaFacebookF, href: 'https://www.facebook.com/knktripcart/', label: 'Facebook', color: '#1877F2' },
        { icon: FaTwitter, href: 'https://twitter.com/knktripcart', label: 'X / Twitter', color: '#fff' },
        { icon: FaPhoneAlt, href: 'tel:+919629202940', label: 'Call', color: '#fbbf24' },
        { icon: FaEnvelope, href: 'mailto:saishivatours@gmail.com', label: 'Email', color: '#fbbf24' },
    ];

    return (
        <footer className="bg-maroon text-amber-100 relative overflow-hidden">
            {/* Decorative top border */}
            <div className="h-1"
                style={{ background: 'linear-gradient(to right, transparent, #fbbf24, #f59e0b, #fbbf24, transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-4xl apple-emoji">🙏</span>
                            <h3 className="text-2xl font-serif font-bold text-amber-300">KNK Trip Cart</h3>
                        </div>
                        <p className="text-amber-100/70 text-base leading-relaxed mb-6">
                            Your trusted partner in spiritual and enjoyable travel for more than a decade. Combining comfort, care, and divine experiences.
                        </p>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                    style={{ background: 'rgba(255,255,255,0.1)', color: s.color }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                >
                                    <s.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Packages */}
                    <div>
                        <h4 className="text-xl font-serif font-bold text-amber-300 mb-5 tracking-wide">Our Packages</h4>
                        <ul className="space-y-3 text-amber-100/70 text-base">
                            {['South India Tours', 'North India Tours', 'One Day Trip', 'Hills Trip', 'Char Dham Yatra'].map((p) => (
                                <li key={p}>
                                    <Link to="/packages" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                                        <span className="text-amber-500 text-xs">›</span> {p}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-serif font-bold text-amber-300 mb-5 tracking-wide">Quick Links</h4>
                        <ul className="space-y-3 text-amber-100/70 text-base">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/packages', label: 'Packages' },
                                { to: '/#about', label: 'About Us' },
                                { to: '/contact', label: 'Contact' },
                                { to: '/admin', label: 'Admin' },
                            ].map((lnk) => (
                                <li key={lnk.label}>
                                    <Link to={lnk.to} className="hover:text-amber-300 transition-colors flex items-center gap-2">
                                        <span className="text-amber-500 text-xs">›</span> {lnk.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-serif font-bold text-amber-300 mb-5 tracking-wide">Contact Info</h4>
                        <div className="space-y-4 text-amber-100/70 text-base">
                            <a href="tel:+919629202940" className="flex items-start gap-3 hover:text-amber-300 transition-colors">
                                <FaPhoneAlt className="text-amber-400 mt-1 shrink-0 text-lg" />
                                +91 96292 02940
                            </a>
                            <a href="mailto:saishivatours@gmail.com" className="flex items-start gap-3 hover:text-amber-300 transition-colors">
                                <FaEnvelope className="text-amber-400 mt-1 shrink-0 text-lg" />
                                saishivatours@gmail.com
                            </a>
                            <p className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0 text-lg" />
                                Shop no 2, Saraswathi Complex, C.T.H.Road, Devi Nagar, Thiruninravur – 602024.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-amber-100/10">
                <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center text-amber-100/50 text-sm gap-3">
                    <p>© {new Date().getFullYear()} KNK Trip Cart. All rights reserved. <span className="apple-emoji">🙏</span></p>
                    <p className="text-amber-100/30 text-xs">Designed with love for devotees</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
