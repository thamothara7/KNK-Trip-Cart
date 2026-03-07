import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import PackageCard from '../components/PackageCard';

const BACKEND = 'http://localhost:5000';

const dummyPackages = [
    {
        _id: "1",
        title: "Tirupati Balaji Darshan",
        destination: "Tirupati, Andhra Pradesh",
        duration: "2 Days / 1 Night",
        category: "South India Tours",
        price: 3500,
        description: "Experience a divine and peaceful darshan of Lord Venkateshwara with our special VIP access package, including comfortable AC transport and special care for seniors.",
        images: ["https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "2",
        title: "Kasi Vishwanath Yatra",
        destination: "Varanasi, Uttar Pradesh",
        duration: "4 Days / 3 Nights",
        category: "North India Tours",
        price: 15000,
        description: "A profound spiritual journey to the oldest living city. Includes Ganga Aarti viewing, temple darshans, and comfortable lodging with authentic vegetarian meals.",
        images: ["https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "3",
        title: "Ooty Mountain Retreat",
        destination: "Ooty, Tamil Nadu",
        duration: "3 Days / 2 Nights",
        category: "Hills Trip",
        price: 8500,
        description: "Escape to the Queen of Hill Stations. Enjoy the botanical gardens, serene lakes, and the cool mountain breeze in luxury with special elderly care.",
        images: ["https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "4",
        title: "Kanchipuram Temple Tour",
        destination: "Kanchipuram, Tamil Nadu",
        duration: "One Day Trip",
        category: "One Day Trip",
        price: 1500,
        description: "Explore the city of thousand temples in a single day. Perfect for families looking for a quick and culturally rich weekend getaway with divine blessings.",
        images: ["https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "5",
        title: "Rameshwaram & Dhanushkodi",
        destination: "Rameshwaram, Tamil Nadu",
        duration: "3 Days / 2 Nights",
        category: "South India Tours",
        price: 6000,
        description: "Visit the sacred Ramanathaswamy Temple and explore the ghostly beauty of Dhanushkodi. A complete spiritual experience with comfortable stay.",
        images: ["https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    },
    {
        _id: "6",
        title: "Char Dham Yatra",
        destination: "Uttarakhand",
        duration: "12 Days / 11 Nights",
        category: "North India Tours",
        price: 35000,
        description: "The ultimate spiritual journey covering Yamunotri, Gangotri, Kedarnath, and Badrinath. Complete with comfortable transport and experienced guides.",
        images: ["https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1200"]
    }
];

const categories = ['All', 'South India Tours', 'North India Tours', 'Hills Trip', 'One Day Trip'];

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get(`${BACKEND}/api/packages`);
                if (res.data && res.data.length > 0) {
                    setPackages(res.data);
                } else {
                    setPackages(dummyPackages);
                }
            } catch {
                // Fallback to dummy packages if backend is offline
                setPackages(dummyPackages);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const filteredPackages = filter === 'All'
        ? packages
        : packages.filter(pkg => pkg.category === filter);

    return (
        <div className="min-h-screen bg-cream pt-8 pb-16 transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-maroon via-maroon/90 to-maroon py-20 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src="https://images.pexels.com/photos/3522880/pexels-photo-3522880.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold tracking-[0.3em] uppercase text-sm font-semibold mb-4"
                    >
                        Our Offerings
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-gold mb-4"
                    >
                        Tour Packages
                    </motion.h1>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-cream/80 max-w-2xl mx-auto text-lg mt-4"
                    >
                        Find the perfect spiritual journey for your soul.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center flex-wrap gap-3 mb-12"
                >
                    {categories.map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 tracking-wide ${filter === type
                                ? 'bg-saffron text-white shadow-lg shadow-saffron/30'
                                : 'bg-white text-maroon hover:bg-gold/10 border border-gold/30'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </motion.div>

                {/* Loading */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4 apple-emoji">🙏</div>
                        <p className="text-xl font-serif text-maroon/50">Loading packages...</p>
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredPackages.map((pkg) => (
                                <PackageCard key={pkg._id} pkg={pkg} />
                            ))}
                        </motion.div>

                        {filteredPackages.length === 0 && (
                            <div className="text-center py-16 text-maroon/50">
                                <p className="text-xl font-serif">No packages found for this category.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Packages;
