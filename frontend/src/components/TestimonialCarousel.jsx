import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    {
        id: 1,
        name: "Lakshmi Devi",
        rating: 5,
        content: "The Tirupati darshan was beautifully arranged. They took special care of my elderly mother throughout the journey. Truly blessed experience!",
        role: "Family Pilgrimage",
        avatar: "LD",
    },
    {
        id: 2,
        name: "Ravi Krishnan",
        rating: 5,
        content: "Our Kasi Vishwanath Yatra was a life-changing experience. The Ganga Aarti arrangements were perfect. KNK Trip Cart made everything seamless.",
        role: "Spiritual Yatra",
        avatar: "RK",
    },
    {
        id: 3,
        name: "Sundaram & Family",
        rating: 5,
        content: "The Ooty hills trip was wonderful! Clean transport, good food, and excellent guides. Best travel agency we've ever used. Highly recommended!",
        role: "Hills Trip",
        avatar: "SF",
    },
    {
        id: 4,
        name: "Meenakshi Ammal",
        rating: 5,
        content: "As a senior citizen, I was worried about the long journey. But KNK Trip Cart took exceptional care. They are truly like family. Om Sai Ram!",
        role: "Senior Traveler",
        avatar: "MA",
    },
    {
        id: 5,
        name: "Ganesh Kumar",
        rating: 5,
        content: "The Rameswaram package was excellent. Very comfortable and well-organized. The holy bath arrangements were wonderful. Highly recommend!",
        role: "Pilgrimage",
        avatar: "GK",
    },
];

const TestimonialCarousel = () => {
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
                    <p className="section-label mb-3"><span className="apple-emoji">⭐</span> Testimonials</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-5">
                        Blessed Traveler Voices
                    </h2>
                    <div className="golden-divider">
                        <span className="text-amber-500 text-xl apple-emoji">🙏</span>
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
                        <SwiperSlide key={t.id}>
                            <div className="bg-white rounded-2xl p-8 h-full flex flex-col"
                                style={{
                                    border: '1px solid rgba(217,119,6,0.2)',
                                    boxShadow: '0 4px 24px rgba(124,45,18,0.08)',
                                }}>
                                {/* Stars */}
                                <div className="flex gap-1 text-amber-400 text-xl mb-4">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <FaQuoteLeft className="text-3xl text-amber-400/30 mb-4" />

                                <p className="text-maroon/80 flex-grow italic leading-relaxed text-lg mb-8">
                                    "{t.content}"
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-amber-100">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm font-serif shrink-0"
                                        style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-maroon text-lg">{t.name}</h4>
                                        <span className="text-sm text-amber-600 font-semibold">{t.role}</span>
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
