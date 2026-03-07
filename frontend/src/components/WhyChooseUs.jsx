import { motion } from 'framer-motion';

const features = [
    {
        emoji: '🚌',
        title: 'Comfortable Travel',
        description: 'AC buses, private vehicles, and train arrangements for a relaxed journey to every destination.',
        color: '#d97706',
        bg: 'rgba(251,191,36,0.12)',
    },
    {
        emoji: '🧭',
        title: 'Experienced Guides',
        description: 'Knowledgeable guides who know the temple rituals, timings, and best practices at each pilgrimage site.',
        color: '#7c2d12',
        bg: 'rgba(124,45,18,0.07)',
    },
    {
        emoji: '👴',
        title: 'Senior Citizen Friendly',
        description: 'Special attention, minimal walking arrangements, wheelchair assistance, and medical support for elderly devotees.',
        color: '#db2777',
        bg: 'rgba(219,39,119,0.07)',
    },
    {
        emoji: '🙏',
        title: 'Spiritual Experience',
        description: 'Meaningful darshans, puja arrangements, Ganga aarti experiences, and guided temple visits for inner peace.',
        color: '#059669',
        bg: 'rgba(5,150,105,0.07)',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #7c2d12 100%)' }}>

            {/* Decorative watermarks */}
            <div className="absolute top-0 right-0 text-white/5 text-[300px] pointer-events-none leading-none select-none">
                <span className="apple-emoji">🙏</span>
            </div>
            <div className="absolute bottom-0 left-0 text-white/5 text-[200px] pointer-events-none leading-none select-none">
                <span className="apple-emoji">🙏</span>
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
                    <p className="text-amber-400 tracking-[0.3em] uppercase text-sm font-bold mb-3 font-display"><span className="apple-emoji">✨</span> Why Choose Us</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-5">
                        Your Trusted Spiritual Partner
                    </h2>
                    <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-6">
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
                        <span className="text-amber-400 text-xl apple-emoji">🌸</span>
                        <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                    <p className="text-amber-100/80 text-lg max-w-2xl mx-auto">
                        KNK Trip Cart has been serving devotees with love and care for over a decade.
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{ y: -6 }}
                            className="rounded-2xl p-8 text-center transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(251,191,36,0.2)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                                e.currentTarget.style.borderColor = 'rgba(251,191,36,0.5)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(251,191,36,0.2)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Icon */}
                            <div className="text-6xl mb-5 apple-emoji">{feat.emoji}</div>

                            <h3 className="text-xl font-serif font-bold text-amber-300 mb-4">
                                {feat.title}
                            </h3>
                            <p className="text-amber-100/75 leading-relaxed text-base">
                                {feat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom stat strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 grid grid-cols-3 gap-6 pt-12 border-t border-white/10"
                >
                    {[
                        { num: '10+', label: 'Years of Service' },
                        { num: '50+', label: 'Destinations Covered' },
                        { num: '1000+', label: 'Happy Pilgrims' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-4xl md:text-5xl font-serif font-bold text-amber-300 mb-2">
                                {stat.num}
                            </div>
                            <div className="text-amber-100/70 text-sm uppercase tracking-widest font-semibold">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
