import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRupeeSign } from 'react-icons/fa';

const PackageCard = ({ pkg }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gold/10 hover:border-gold/30 group"
        >
            {/* Image */}
            <div className="relative overflow-hidden h-56">
                <img
                    src={pkg.images?.[0] || 'https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-maroon/90 text-gold text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    {pkg.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-serif font-bold text-xl text-maroon dark:text-gold mb-3 group-hover:text-saffron transition-colors">
                    {pkg.title}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-maroon/60 dark:text-cream/60 mb-4">
                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-saffron" /> {pkg.destination}</span>
                    <span className="flex items-center gap-1"><FaClock className="text-saffron" /> {pkg.duration}</span>
                </div>

                <p className="text-sm text-maroon/70 dark:text-cream/70 mb-6 line-clamp-2 leading-relaxed">
                    {pkg.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                    <div className="flex items-center text-saffron font-bold text-xl">
                        <FaRupeeSign className="text-base" />{pkg.price?.toLocaleString()}
                        <span className="text-xs text-maroon/50 dark:text-cream/50 font-normal ml-1">/ person</span>
                    </div>
                    <Link
                        to={`/packages/${pkg._id}`}
                        className="px-5 py-2 bg-maroon hover:bg-saffron text-gold hover:text-white text-sm font-bold rounded-full transition-all duration-300"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;
