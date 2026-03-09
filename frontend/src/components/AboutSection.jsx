"use client";
/* eslint-disable no-unused-vars */
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CountUp = ({ end, duration = 2, label, suffix = "+" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const stepTime = Math.abs(Math.floor((duration * 1000) / end));
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, stepTime);
        }
    }, [isInView, end, duration]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-serif font-bold text-saffron mb-2">
                {count}{suffix}
            </div>
            <div className="text-maroon/70 uppercase tracking-widest text-xs font-semibold">
                {label}
            </div>
        </div>
    );
};

const AboutSection = () => {
    return (
        <section className="py-24 bg-cream transition-colors duration-300 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-10 left-10 text-gold/10 text-[200px] pointer-events-none">
                
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gold tracking-[0.3em] uppercase text-sm font-semibold mb-3">About Us</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">
                        Your Trusted Spiritual Partner
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-base text-maroon/80 mb-6 leading-relaxed">
                            Welcome to KNK Trip Cart, your trusted partner in spiritual and enjoyable travel for more than a decade. With over a decade of expertise, we specialise in providing comprehensive travel options that combine luxury, convenience, and unforgettable experiences. Our services provide a wide range of travel needs, such as lodging, one-day excursions, hill station tours, South and North India tours, and spiritual retreat packages.
                        </p>
                        <p className="text-base text-maroon/80 mb-8 leading-relaxed">
                            At KNK Trip Cart, we understand the special needs of our customers, particularly seniors. Our special care services ensure that senior citizens have a safe, comfortable, and hassle-free voyage.
                        </p>

                        {/* Vision & Mission */}
                        <div className="space-y-6 pt-6 border-t border-gold/30">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/50 p-6 rounded-xl border border-gold/20"
                            >
                                <h4 className="text-xl font-serif font-bold text-saffron mb-2"> Our Vision</h4>
                                <p className="text-sm text-maroon/70 leading-relaxed">To become a leading travel service provider recognised for providing amazing, safe, and rewarding travel experiences. We strive to combine spiritual and leisure experiences with outstanding care and comfort.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/50 p-6 rounded-xl border border-gold/20"
                            >
                                <h4 className="text-xl font-serif font-bold text-saffron mb-2"> Our Mission</h4>
                                <p className="text-sm text-maroon/70 leading-relaxed">To deliver personalised, reasonable, and high-quality travel services that meet a variety of demands. We prioritise client safety, comfort, and happiness, with a specific focus on older individuals.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Images Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <motion.img whileHover={{ scale: 1.03 }} src="https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Temple Architecture" className="w-full h-64 object-cover rounded-2xl shadow-xl" />
                        <motion.img whileHover={{ scale: 1.03 }} src="https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Varanasi Ghat" className="w-full h-80 object-cover rounded-2xl shadow-xl mt-8" />
                        <motion.img whileHover={{ scale: 1.03 }} src="https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Sacred Temple" className="w-full h-80 object-cover rounded-2xl shadow-xl -mt-8" />
                        <motion.img whileHover={{ scale: 1.03 }} src="https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Indian Heritage" className="w-full h-64 object-cover rounded-2xl shadow-xl" />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 grid grid-cols-3 gap-8 pt-12 border-t border-gold/30"
                    >
                        <CountUp end={10} label="Years Experience" />
                        <CountUp end={50} label="Destinations" />
                        <CountUp end={1000} label="Happy Pilgrims" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
