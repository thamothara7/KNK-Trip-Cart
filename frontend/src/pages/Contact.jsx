import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const PHONE    = '+91 96292 02940';
const EMAIL    = 'saishivatours@gmail.com';
const ADDRESS  = 'Shop No 2, Saraswathi Complex, C.T.H.Road, Devi Nagar, Thiruninravur – 602024';

const socialButtons = [
    {
        icon: FaWhatsapp,
        label: 'WhatsApp',
        sub: '+91 96292 02940',
        href: 'https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20a%20devotional%20trip.',
        bg: '#25D366', color: '#fff',
    },
    {
        icon: FaPhoneAlt,
        label: 'Call Us',
        sub: '+91 96292 02940',
        href: 'tel:+919629202940',
        bg: '#7c2d12', color: '#fbbf24',
    },
    {
        icon: FaInstagram,
        label: 'Instagram',
        sub: '@knktripcart',
        href: 'https://www.instagram.com/knktripcart/',
        bg: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)', color: '#fff',
    },
    {
        icon: FaFacebookF,
        label: 'Facebook',
        sub: 'KNK Trip Cart',
        href: 'https://www.facebook.com/knktripcart/',
        bg: '#1877F2', color: '#fff',
    },
    {
        icon: FaTwitter,
        label: 'X / Twitter',
        sub: '@knktripcart',
        href: 'https://twitter.com/knktripcart',
        bg: '#000', color: '#fff',
    },
    {
        icon: FaEnvelope,
        label: 'Email',
        sub: 'saishivatours@gmail.com',
        href: `mailto:${EMAIL}`,
        bg: '#f59e0b', color: '#fff',
    },
];

const InfoCard = ({ icon: Icon, title, value, href }) => (
    <motion.a
        href={href}
        whileHover={{ y: -4, boxShadow: '0 14px 40px rgba(120,53,15,0.16)' }}
        className="flex items-start gap-4 bg-white rounded-2xl p-5 transition-all"
        style={{ border: '1.5px solid rgba(251,191,36,0.25)', boxShadow: '0 4px 20px rgba(120,53,15,0.08)' }}
    >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
            style={{ background: 'rgba(251,191,36,0.15)', color: '#f59e0b' }}>
            <Icon />
        </div>
        <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: 'rgba(120,53,15,0.6)' }}>{title}</p>
            <p className="font-bold text-base" style={{ color: '#7c2d12' }}>{value}</p>
        </div>
    </motion.a>
);

const Contact = () => {
    return (
        <div className="min-h-screen" style={{ background: '#fffdf5' }}>

            {/* ── Hero banner ──────────────────────────────────── */}
            <div className="relative py-24 overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#7c2d12,#9a3412 40%,#7c2d12)' }}>
                <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-end pr-12 opacity-10 text-white text-[200px]">
                    <span className="apple-emoji">🙏</span>
                </div>
                {/* Top gold rule */}
                <div className="absolute top-0 inset-x-0 h-1"
                    style={{ background: 'linear-gradient(to right,transparent,#fbbf24,transparent)' }} />

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="uppercase tracking-[0.3em] text-sm font-bold mb-4"
                        style={{ color: '#fbbf24', fontFamily: '"Outfit",sans-serif' }}>
                        Get In Touch
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6"
                        style={{ color: '#fbbf24' }}>
                        Contact Us
                    </motion.h1>
                    <div className="w-24 h-0.5 mx-auto mb-6"
                        style={{ background: 'linear-gradient(to right,transparent,#fbbf24,transparent)' }} />
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
                        style={{ color: 'rgba(254,243,199,0.85)' }}>
                        Planning a pilgrimage? We are here to guide your sacred journey every step of the way.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

                {/* ── Connect Instantly ────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-10">
                        <p className="uppercase tracking-[0.25em] text-sm font-bold mb-3"
                            style={{ color: '#f59e0b', fontFamily: '"Outfit",sans-serif' }}>
                            Connect Instantly
                        </p>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: '#7c2d12' }}>
                            Reach Us on Any Platform
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {socialButtons.map((btn, i) => (
                            <motion.a
                                key={btn.label}
                                href={btn.href}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                whileHover={{ y: -6, scale: 1.04 }}
                                whileTap={{ scale: 0.94 }}
                                className="flex flex-col items-center justify-center gap-3 rounded-2xl font-bold text-center"
                                style={{
                                    background: btn.bg,
                                    color: btn.color,
                                    minHeight: '120px',
                                    padding: '20px 12px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                    fontSize: '0.82rem',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                <btn.icon style={{ fontSize: '2rem' }} />
                                <div>
                                    <div className="font-bold leading-tight">{btn.label}</div>
                                    <div className="text-xs mt-0.5 opacity-80 leading-tight break-all">{btn.sub}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* ── Contact Info cards + Map ──────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    {/* Left: info cards */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#7c2d12' }}>
                            Our Contact Details
                        </h2>
                        <InfoCard icon={FaPhoneAlt} title="Call Us" value={PHONE} href="tel:+919629202940" />
                        <InfoCard icon={FaEnvelope} title="Email Us" value={EMAIL} href={`mailto:${EMAIL}`} />
                        <InfoCard icon={FaMapMarkerAlt} title="Visit Us" value={ADDRESS} href="#map" />

                        {/* Opening hours */}
                        <div className="bg-white rounded-2xl p-5 mt-4"
                            style={{ border: '1.5px solid rgba(251,191,36,0.25)', boxShadow: '0 4px 20px rgba(120,53,15,0.08)' }}>
                            <h3 className="font-serif font-bold text-lg mb-3" style={{ color: '#7c2d12' }}>
                                <span className="apple-emoji">🕐</span> Office Hours
                            </h3>
                            <div className="space-y-1.5 text-sm" style={{ color: 'rgba(120,53,15,0.7)' }}>
                                <div className="flex justify-between">
                                    <span>Monday – Saturday</span>
                                    <span className="font-semibold" style={{ color: '#7c2d12' }}>9:00 AM – 7:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-semibold" style={{ color: '#7c2d12' }}>10:00 AM – 4:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Google Map */}
                    <div id="map">
                        <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: '#7c2d12' }}>
                            Find Us Here
                        </h2>
                        <div className="rounded-3xl overflow-hidden"
                            style={{ height: '380px', boxShadow: '0 8px 40px rgba(120,53,15,0.15)', border: '2px solid rgba(251,191,36,0.3)' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1096851044886!2d80.04986981482!3d13.117068990744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5289cd2b7c7b8f%3A0x4c14e3b22e1cceaf!2sThiruninravur!5e0!3m2!1sen!2sin!4v1609459200000"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                                title="KNK Trip Cart Location"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* ── WhatsApp CTA strip ────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl p-10 text-center"
                    style={{ background: 'linear-gradient(135deg,#7c2d12,#9a3412)', boxShadow: '0 8px 48px rgba(120,53,15,0.2)' }}
                >
                    <div className="text-5xl mb-4 apple-emoji">🙏</div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">
                        Ready to Plan Your Pilgrimage?
                    </h2>
                    <p className="text-lg mb-8" style={{ color: 'rgba(254,243,199,0.85)' }}>
                        Chat with us on WhatsApp — we'll respond within minutes!
                    </p>
                    <motion.a
                        href="https://wa.me/919629202940?text=Namaste!%20I%20want%20to%20plan%20a%20pilgrimage%20trip.%20Please%20help."
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-xl"
                        style={{ background: '#25D366', color: '#fff', boxShadow: '0 6px 28px rgba(37,211,102,0.4)' }}
                    >
                        <FaWhatsapp className="text-2xl" />
                        Chat on WhatsApp
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
