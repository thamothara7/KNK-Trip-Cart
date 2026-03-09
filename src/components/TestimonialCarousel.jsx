"use client";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar, FaQuoteLeft, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getTestimonials } from '../lib/actions';
import 'swiper/css';
import 'swiper/css/pagination';

const TestimonialCarousel = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await getTestimonials();
                if (data && data.length > 0) {
                    setTestimonials(data);
                }
            } catch (err) {
                console.error("Failed to load testimonials for home page", err);
            }
        };
        fetchTestimonials();
    }, []);

    if (testimonials.length === 0) return null;
    return (
        <section className="py-24 mandala-bg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(to right, transparent, #f59e0b, transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-3"> Testimonials</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-5">
                        Blessed Traveler Voices
                    </h2>
                    <div className="golden-divider">

                    </div>
                </motion.div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    className="pb-16"
                >
                    {testimonials.map((t) => (
                        <SwiperSlide key={t._id || t.id}>
                            <div className="bg-white rounded-2xl p-8 h-full flex flex-col"
                                style={{
                                    border: '1px solid rgba(217,119,6,0.2)',
                                    boxShadow: '0 4px 24px rgba(124,45,18,0.08)',
                                }}>
                                {/* Stars */}
                                <div className="flex gap-1 text-amber-400 text-xl mb-4">
                                    {[...Array(t.rating || 5)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <FaQuoteLeft className="text-3xl text-amber-400/30 mb-4" />

                                <p className="text-maroon/80 flex-grow italic leading-relaxed text-lg mb-8">
                                    "{t.review || t.content}"
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-amber-100">
                                    {t.imageUrl ? (
                                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-amber-400">
                                            <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm font-serif shrink-0 border-2 border-amber-400"
                                            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                                            {t.avatar || <FaUser />}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-serif font-bold text-maroon text-lg">{t.name}</h4>
                                        <span className="text-sm text-amber-600 font-semibold">{t.role || 'Blessed Traveler'}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialCarousel;
