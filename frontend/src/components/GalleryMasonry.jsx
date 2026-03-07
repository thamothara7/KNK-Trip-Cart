import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

const images = [
    { src: "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Meenakshi Temple" },
    { src: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Varanasi Ghats" },
    { src: "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Kanchipuram Temple" },
    { src: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Kedarnath" },
    { src: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Rameswaram Temple" },
    { src: "https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Ooty Hills" },
    { src: "https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Sacred Shrine" },
    { src: "https://images.pexels.com/photos/1007431/pexels-photo-1007431.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "River Ganga" },
];

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
};

const GalleryMasonry = () => {
    return (
        <section className="py-24 golden-bg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(to right, transparent, #f59e0b, transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-3"><span className="apple-emoji">📸</span> Photo Gallery</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-5">
                        Divine Destinations Gallery
                    </h2>
                    <div className="golden-divider">
                        <span className="text-amber-500 text-xl apple-emoji">🌼</span>
                    </div>
                </motion.div>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="mb-5 overflow-hidden rounded-2xl cursor-pointer group relative"
                            style={{ border: '2px solid rgba(251,191,36,0.15)', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(251,191,36,0.5)';
                                e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,45,18,0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(251,191,36,0.15)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6"
                                style={{ background: 'linear-gradient(to top, rgba(124,45,18,0.85), transparent)' }}>
                                <span className="text-amber-300 font-serif font-bold text-lg tracking-wide">
                                    {img.label}
                                </span>
                            </div>
                            <img
                                src={img.src}
                                alt={img.label}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </Masonry>
            </div>
        </section>
    );
};

export default GalleryMasonry;
