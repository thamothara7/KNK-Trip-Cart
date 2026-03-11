"use client";
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import TextPressure from './TextPressure';
import heroBg from '../assets/architecture-color-holy-beautiful-detail.jpg';

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const whatsappUrl = "https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20booking%20a%20devotional%20trip.%20Please%20share%20details.";

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBg}
                    alt="Sacred Indian Temple"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(60, 24, 6, 0.72) 0%, rgba(80,32,8,0.55) 50%, rgba(30,12,3,0.82) 100%)' }}
                />
            </div>

            {/* Content */}
            <div
                className="relative z-20 text-center w-full max-w-5xl mx-auto"
                style={{ padding: isMobile ? '100px 16px 60px' : '130px 24px 80px' }}
            >
                {/* Om Sai Ram badge */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="tracking-[0.4em] uppercase font-bold mb-4 sm:mb-6"
                    style={{ color: '#fbbf24', textShadow: '0 0 20px rgba(251,191,36,0.6)', fontSize: isMobile ? '0.7rem' : '0.9rem' }}
                >
                    ✦ Om Sai Ram ✦
                </motion.p>

                {/* TextPressure headline */}
                <div className="relative z-30 mb-6" style={{ height: isMobile ? '100px' : '150px' }}>
                    <TextPressure
                        text="Your Path To Divine Destinations"
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={true}
                        weight={true}
                        italic={true}
                        textColor="#fef3c7"
                        strokeColor="#fbbf24"
                        minFontSize={isMobile ? 32 : 52}
                        fontFamily="Playfair Display"
                    />
                </div>

                {/* Gold divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: 0.6 }}
                    className="w-42 mx-auto mb-8"
                    style={{ height: '1px', background: 'linear-gradient(to right, transparent, #fbbf24, transparent)' }}
                />

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
                    style={{ color: 'rgba(254,243,199,0.85)', textShadow: '0 1px 8px rgba(0,0,0,0.5)', fontSize: isMobile ? '0.95rem' : '1.1rem' }}
                >
                    Comfortable and well-organized devotional travel packages for devotees.
                    Special care and attention for senior citizens.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
                >
                    <a
                        href="/packages"
                        className="px-8 sm:px-10 py-3 sm:py-4 font-bold rounded-full tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base text-center"
                        style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', color: '#7c2d12', boxShadow: '0 6px 28px rgba(251,191,36,0.5)' }}
                    >
                        View Packages
                    </a>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 sm:px-10 py-3 sm:py-4 border-2 font-bold rounded-full tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 justify-center text-sm sm:text-base"
                        style={{ borderColor: '#fbbf24', color: '#fef3c7', backdropFilter: 'blur(8px)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.85)'; e.currentTarget.style.borderColor = '#16a34a'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#fbbf24'; }}
                    >
                        <FaWhatsapp className="text-lg sm:text-xl" /> Chat on WhatsApp
                    </a>
                </motion.div>

                {/* Trust line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8 sm:mt-10 text-xs sm:text-sm font-semibold"
                    style={{ color: 'rgba(251,191,36,0.75)' }}
                >
                    <span>5+ Years Experience</span>
                    <span>•</span>
                    <span>500+ Happy Pilgrims</span>
                    <span>•</span>
                    <span>Senior Citizen Friendly</span>
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 z-20 opacity-30"
                style={{ background: 'linear-gradient(to top, rgba(241, 206, 119, 0.3), transparent)' }}
            />
        </section>
    );
};

export default HeroSection;
