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
        role: "Family Pilgrimage"
    },
    {
        id: 2,
        name: "Ravi Krishnan",
        rating: 5,
        content: "Our Kasi Vishwanath Yatra was a life-changing experience. The Ganga Aarti arrangements were perfect. Sai Shiva Tours made everything seamless.",
        role: "Spiritual Yatra"
    },
    {
        id: 3,
        name: "Sundaram & Family",
        rating: 5,
        content: "The Ooty hills trip was wonderful! Clean transport, good food, and excellent guides. Best travel agency we've ever used. Highly recommended!",
        role: "Hills Trip"
    },
    {
        id: 4,
        name: "Meenakshi Ammal",
        rating: 5,
        content: "As a senior citizen, I was worried about the long journey. But Sai Shiva Tours took exceptional care. They are truly like family. Om Sai Ram!",
        role: "Senior Traveler"
    }
];

const TestimonialCarousel = () => {
    return (
        <section className="py-24 bg-white/50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-saffron to-gold" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-gold tracking-[0.3em] uppercase text-sm font-semibold mb-3">Testimonials</p>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-maroon dark:text-gold">
                        Blessed Traveler Voices
                    </h3>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
                </motion.div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    className="pb-16"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <div className="bg-cream dark:bg-gray-900 p-8 rounded-2xl border border-gold/20 h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
                                <FaQuoteLeft className="text-3xl text-gold/40 mb-6" />
                                <p className="text-maroon/80 dark:text-cream/80 mb-8 flex-grow italic leading-relaxed">
                                    "{testimonial.content}"
                                </p>
                                <div className="mt-auto pt-4 border-t border-gold/20">
                                    <div className="flex text-saffron mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-maroon dark:text-gold">{testimonial.name}</h4>
                                        <span className="text-sm text-gold/70">{testimonial.role}</span>
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
