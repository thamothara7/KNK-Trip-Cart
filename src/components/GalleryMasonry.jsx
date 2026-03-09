"use client";
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { getGallery } from '../lib/actions';

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
};

const GalleryMasonry = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const data = await getGallery();
                if (data && data.length > 0) {
                    setImages(data);
                }
            } catch (err) {
                console.error("Failed to load gallery for home page", err);
            }
        };
        fetchGallery();
    }, []);

    if (images.length === 0) return null;
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
                    <p className="section-label mb-3"> Photo Gallery</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-5">
                        Divine Destinations Gallery
                    </h2>
                    <div className="golden-divider">

                    </div>
                </motion.div>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {images.map((img, index) => (
                        <motion.div
                            key={img._id || index}
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
                                    {img.title || img.category || img.label}
                                </span>
                            </div>
                            <img
                                src={img.imageUrl || img.src}
                                alt={img.title || img.label}
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
