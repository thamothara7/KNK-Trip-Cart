import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

// Using dummy data for now
const dummyPackage = {
    _id: "1",
    title: "Mesmerizing Kashmir",
    destination: "Srinagar, Gulmarg, Pahalgam",
    duration: "5 Days / 4 Nights",
    price: 25000,
    description: "Experience the paradise on earth with our carefully crafted Kashmir tour package including houseboat stays and gondola rides.",
    images: ["https://images.pexels.com/photos/774570/pexels-photo-774570.jpeg?auto=compress&cs=tinysrgb&w=1200"],
    itinerary: [
        { day: 1, title: "Arrival in Srinagar", description: "Arrive at Srinagar airport, transfer to Houseboat. Evening Shikara ride on Dal Lake." },
        { day: 2, title: "Srinagar to Gulmarg", description: "Full day excursion to Gulmarg. Enjoy the scenic beauty and Gondola ride (cable car)." },
        { day: 3, title: "Srinagar to Pahalgam", description: "Drive to Pahalgam (Valley of Shepherds). Enroute visit Saffron fields and Awantipura ruins." },
        { day: 4, title: "Srinagar Local Sightseeing", description: "Visit Mughal Gardens: Nishat Bagh, Shalimar Bagh, and Shankaracharya Temple." },
        { day: 5, title: "Departure", description: "Transfer to Srinagar airport for your onward journey with sweet memories." }
    ]
};

const PackageDetails = () => {
    const { id } = useParams();
    const pkg = dummyPackage; // In real app: fetch by ID
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', travelers: 1 });
    const [submitted, setSubmitted] = useState(false);

    const handleBooking = (e) => {
        e.preventDefault();
        // In real app: axios.post('/api/bookings', formData)
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Image */}
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                    <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                        <div className="flex items-center gap-2 mb-3 text-brand-400 font-semibold">
                            <FaMapMarkerAlt /> {pkg.destination}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{pkg.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base">
                            <span className="flex items-center gap-2"><FaClock /> {pkg.duration}</span>
                            <span className="flex items-center gap-2 font-bold text-xl">₹{pkg.price.toLocaleString()} / person</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Overview */}
                        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Overview</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg pb-4">
                                {pkg.description}
                            </p>
                        </section>

                        {/* Itinerary Timeline */}
                        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Itinerary</h2>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-600 before:to-transparent">
                                {pkg.itinerary.map((item, index) => (
                                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-brand-100 text-brand-600 font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                            {item.day}
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-sm">
                                            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sidebar Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Book This Tour</h3>

                            {submitted ? (
                                <div className="text-center py-8">
                                    <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Booking Requested!</h4>
                                    <p className="text-gray-600 dark:text-gray-400">Our team will contact you shortly to confirm dates and payment.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBooking} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                        <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                        <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                            <div className="relative">
                                                <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Travelers</label>
                                            <div className="relative">
                                                <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="number" min="1" required value={formData.travelers} onChange={e => setFormData({ ...formData, travelers: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center mb-6">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Total Price</span>
                                        <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">₹{(pkg.price * formData.travelers).toLocaleString()}</span>
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1">
                                        Request Booking
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
