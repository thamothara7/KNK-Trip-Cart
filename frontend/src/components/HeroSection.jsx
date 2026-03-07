import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const HeroSection = () => {
    const whatsappUrl = "https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20booking%20a%20devotional%20trip.%20Please%20share%20details.";

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(120,53,15,0.6) 0%, rgba(180,83,9,0.35) 40%, rgba(120,53,15,0.75) 100%)'
                    }}
                />
                {/* Golden shimmer overlay */}
                <div className="absolute inset-0 z-10 opacity-35"
                    style={{
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.35) 0%, transparent 50%, rgba(217,119,6,0.25) 100%)'
                    }}
                />
                <img
                    src="https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="Sacred Indian Temple"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Floating decorative emojis */}
            <motion.div
                className="absolute top-24 right-8 md:right-20 text-7xl md:text-8xl animate-float z-10 pointer-events-none opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ delay: 1.5, duration: 2 }}
            >
                <span className="apple-emoji">🙏</span>
            </motion.div>
            <motion.div
                className="absolute bottom-32 left-8 md:left-20 text-5xl md:text-7xl animate-float z-10 pointer-events-none opacity-15"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ delay: 2, duration: 2 }}
                style={{ animationDelay: '1.5s' }}
            >
                <span className="apple-emoji">🙏</span>
            </motion.div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto py-20">

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    className="w-28 h-0.5 mx-auto mb-8"
                    style={{ background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }}
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-amber-300 tracking-[0.3em] uppercase text-base md:text-lg font-semibold mb-6"
                >
                    <span className="apple-emoji">🙏</span> Om Sai Ram <span className="apple-emoji">🙏</span>
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl"
                >
                    Begin Your <br />
                    <span style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fde68a, #fbbf24)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Sacred Journey
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="text-xl md:text-2xl text-amber-50/95 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
                >
                    Comfortable and well-organized devotional travel packages for devotees.
                    Special care and attention for senior citizens.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                >
                    <a
                        href="/packages"
                        className="px-10 py-5 font-bold rounded-full text-white text-lg tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            boxShadow: '0 6px 28px rgba(245,158,11,0.5)',
                        }}
                    >
                        <span className="apple-emoji">🙏</span> View Packages
                    </a>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-10 py-5 border-2 border-amber-400 font-bold rounded-full text-amber-300 hover:text-white text-lg tracking-wide uppercase transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 justify-center"
                        style={{ backdropFilter: 'blur(8px)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,197,94,0.85)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <FaWhatsapp className="text-2xl" />
                        Chat on WhatsApp
                    </a>
                </motion.div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                    className="w-28 h-0.5 mx-auto mt-14"
                    style={{ background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }}
                />

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="flex flex-col sm:flex-row justify-center gap-6 mt-10 text-amber-200/80 text-base"
                >
                    <span><span className="apple-emoji">✅</span> 10+ Years Experience</span>
                    <span className="hidden sm:block">•</span>
                    <span><span className="apple-emoji">✅</span> 1000+ Happy Pilgrims</span>
                    <span className="hidden sm:block">•</span>
                    <span><span className="apple-emoji">✅</span> Senior Citizen Friendly</span>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-amber-50 to-transparent z-20" />
        </section>
    );
};

export default HeroSection;
