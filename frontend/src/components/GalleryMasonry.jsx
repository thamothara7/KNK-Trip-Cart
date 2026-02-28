import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';

const images = [
    { src: "https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Meenakshi Temple" },
    { src: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Varanasi Ghats" },
    { src: "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Kanchipuram Temple" },
    { src: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Taj Mahal" },
    { src: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Temple Gateway" },
    { src: "https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=1200", label: "Ooty Hills" },
];

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
};

const GalleryMasonry = () => {
    return (
        <section className="py-24 bg-cream dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-gold tracking-[0.3em] uppercase text-sm font-semibold mb-3">Gallery</p>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-maroon dark:text-gold">
                        Divine Destinations
                    </h3>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
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
                            transition={{ delay: index * 0.1 }}
                            className="mb-4 overflow-hidden rounded-2xl cursor-pointer group relative border-2 border-gold/10 hover:border-gold/40 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                                <span className="text-gold font-serif font-bold text-lg tracking-wide">
                                    {img.label}
                                </span>
                            </div>
                            <img
                                src={img.src}
                                alt={img.label}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </motion.div>
                    ))}
                </Masonry>
            </div>
        </section>
    );
};

export default GalleryMasonry;
