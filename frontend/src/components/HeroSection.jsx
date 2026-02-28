import { motion } from 'framer-motion';
import { FaOm } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-maroon/50 z-10" />
                <img
                    src="https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Sacred Indian Temple"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Floating Om Symbol */}
            <motion.div
                className="absolute top-20 right-10 md:right-20 text-gold/30 text-8xl md:text-9xl animate-float z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 2 }}
            >
                <FaOm />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    className="w-24 h-0.5 bg-gold mx-auto mb-8"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gold tracking-[0.3em] uppercase text-sm md:text-base font-semibold mb-4"
                >
                    🙏 Om Sai Ram 🙏
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl"
                >
                    Embark on a <br />
                    <span className="text-gold">Sacred Journey</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="text-lg md:text-xl text-cream/90 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    Your trusted partner in spiritual and enjoyable travel for more than a decade.
                    Special care services for senior citizens.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a href="/packages" className="px-10 py-4 bg-saffron hover:bg-gold text-white font-bold rounded-full shadow-2xl hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-1 tracking-wide uppercase text-sm">
                        🙏 View Packages
                    </a>
                    <a href="/contact" className="px-10 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 tracking-wide uppercase text-sm">
                        Contact Us
                    </a>
                </motion.div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                    className="w-24 h-0.5 bg-gold mx-auto mt-12"
                />
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream dark:from-gray-900 to-transparent z-20" />
        </section>
    );
};

export default HeroSection;
