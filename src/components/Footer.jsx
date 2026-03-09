"use client";
/* eslint-disable no-unused-vars */
import Link from 'next/link';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';
import knkLogo from '../assets/Gemini_Generated_Image_vvyvj2vvyvj2vvyv-Photoroom.png';

const Footer = () => {
    return (
        <footer style={{ background: 'linear-gradient(180deg,#3b1206 0%,#1e0903 100%)' }} className="text-amber-100 mt-12 pb-24 md:pb-0">
            {/* Gold top border */}
            <div style={{ height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24,#fde68a,#fbbf24,transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-5">
                            <Image
                                src={knkLogo}
                                alt="KNK Trip Cart"
                                height={56}
                                style={{
                                    height: '56px',
                                    width: 'auto',
                                    filter: 'drop-shadow(0px 0px 8px rgba(251,191,36,0.5))',
                                    objectFit: 'contain',
                                }}
                            />
                            <span className="text-2xl font-bold tracking-wider text-amber-300 uppercase" style={{ fontFamily: 'Outfit, Poppins, sans-serif' }}>
                                KNK Trip Cart
                            </span>
                        </div>
                        <p className="text-amber-100/65 text-sm leading-relaxed mb-5">
                            Your trusted partner in spiritual and enjoyable travel. Combining comfort, care, and divine experiences for devotees across India.
                        </p>

                        {/* Social */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: FaWhatsapp, href: 'https://wa.me/919629202940', color: '#25D366', label: 'WhatsApp' },
                                { icon: FaInstagram, href: 'https://www.instagram.com/knktripcart/', color: '#E1306C', label: 'Instagram' },
                                { icon: FaFacebookF, href: 'https://www.facebook.com/knktripcart/', color: '#1877F2', label: 'Facebook' },
                            ].map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                    style={{ background: 'rgba(255,255,255,0.08)', color: s.color, border: '1px solid rgba(255,255,255,0.12)' }}>
                                    <s.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Packages */}
                    <div>
                        <h4 className="text-base font-serif font-bold text-amber-300 mb-4 tracking-widest uppercase">Our Packages</h4>
                        <ul className="space-y-2.5">
                            {['South India Tours', 'North India Tours', 'One Day Trip', 'Hills Trip', 'Char Dham Yatra'].map(p => (
                                <li key={p}>
                                    <Link href="/packages" className="text-amber-100/60 hover:text-amber-300 transition-colors text-sm flex items-center gap-2">
                                        <span className="text-amber-500">›</span> {p}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base font-serif font-bold text-amber-300 mb-4 tracking-widest uppercase">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/packages', label: 'Packages' },
                                { to: '/gallery', label: 'Gallery' },
                                { to: '/#about', label: 'About Us' },
                                { to: '/contact', label: 'Contact' },
                            ].map(lnk => (
                                <li key={lnk.label}>
                                    {lnk.to.includes('#') ? (
                                        <a href={lnk.to} className="text-amber-100/60 hover:text-amber-300 transition-colors text-sm flex items-center gap-2">
                                            <span className="text-amber-500">›</span> {lnk.label}
                                        </a>
                                    ) : (
                                        <Link href={lnk.to} className="text-amber-100/60 hover:text-amber-300 transition-colors text-sm flex items-center gap-2">
                                            <span className="text-amber-500">›</span> {lnk.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-base font-serif font-bold text-amber-300 mb-4 tracking-widest uppercase">Contact</h4>
                        <div className="space-y-3">
                            <a href="tel:+919629202940"
                                className="flex items-start gap-3 text-amber-100/65 hover:text-amber-300 transition-colors text-sm">
                                <FaPhoneAlt className="text-amber-400 mt-0.5 shrink-0" />
                                +91 96292 02940
                            </a>
                            <a href="mailto:saishivatours@gmail.com"
                                className="flex items-start gap-3 text-amber-100/65 hover:text-amber-300 transition-colors text-sm break-all">
                                <FaEnvelope className="text-amber-400 mt-0.5 shrink-0" />
                                saishivatours@gmail.com
                            </a>
                            <p className="flex items-start gap-3 text-amber-100/65 text-sm">
                                <FaMapMarkerAlt className="text-amber-400 mt-0.5 shrink-0" />
                                Shop no 2, Saraswathi Complex, C.T.H.Road, Devi Nagar, Thiruninravur – 602024.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div style={{ borderTop: '1px solid rgba(251,191,36,0.12)' }}>
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-amber-100/40 text-xs text-center">
                    <p>© {new Date().getFullYear()} KNK Trip Cart. All rights reserved.</p>
                    <p>Designed with love for devotees</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
