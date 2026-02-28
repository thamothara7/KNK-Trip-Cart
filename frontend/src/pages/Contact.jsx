import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaOm } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contacts', formData);
            setSubmitted(true);
            setError(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error('Failed to submit contact form:', err);
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-cream dark:bg-gray-900 pt-8 pb-16 transition-colors duration-300">

            {/* Header */}
            <div className="bg-gradient-to-r from-maroon via-maroon/90 to-maroon py-20 mb-16 relative overflow-hidden">
                <div className="absolute top-4 right-10 text-gold/10 text-9xl pointer-events-none"><FaOm /></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold tracking-[0.3em] uppercase text-sm font-semibold mb-4">Get In Touch</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold text-gold mb-4">Contact Us</motion.h1>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-cream/80 max-w-2xl mx-auto text-lg mt-4">
                        Have questions about our spiritual tours? We're here to help you plan your sacred journey.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Contact Info */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { icon: FaPhoneAlt, title: "Call Us", info: "+91 96292 02940" },
                            { icon: FaEnvelope, title: "Email Us", info: "saishivatours@gmail.com" },
                        ].map((item, i) => (
                            <motion.div key={i} whileHover={{ y: -4 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 bg-saffron/10 text-saffron rounded-full flex items-center justify-center text-xl mb-4">
                                    <item.icon />
                                </div>
                                <h3 className="font-serif font-bold text-lg mb-1 text-maroon dark:text-gold">{item.title}</h3>
                                <p className="text-maroon/60 dark:text-cream/60 text-sm">{item.info}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all shadow-sm">
                        <div className="w-12 h-12 bg-saffron/10 text-saffron rounded-full flex items-center justify-center text-xl mb-4">
                            <FaMapMarkerAlt />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-1 text-maroon dark:text-gold">Office Location</h3>
                        <p className="text-maroon/60 dark:text-cream/60 text-sm leading-relaxed mb-4">
                            Shop no 2, Saraswathi Complex, C.T.H.Road,<br />
                            (Jaya Arts College Opp) Devi Nagar,<br />
                            Thiruninravur – 602024.
                        </p>
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1096851044886!2d80.04986981482!3d13.117068990744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5289cd2b7c7b8f%3A0x4c14e3b22e1cceaf!2sThiruninravur!5e0!3m2!1sen!2sin!4v1609459200000"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Contact Form */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl border border-gold/20 shadow-lg">
                    <h2 className="text-3xl font-serif font-bold mb-2 text-maroon dark:text-gold">Send a Message</h2>
                    <div className="w-16 h-0.5 bg-gold mb-8" />

                    {submitted ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-maroon dark:text-gold mb-2">Message Sent! 🙏</h3>
                            <p className="text-maroon/60 dark:text-cream/60">Thank you for contacting us. We will get back to you shortly.</p>
                            <button
                                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                                className="mt-8 px-8 py-3 bg-saffron/10 text-saffron font-semibold rounded-full hover:bg-saffron/20 transition-colors"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-maroon/70 dark:text-cream/70 mb-2">Full Name</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-5 py-3 rounded-xl border border-gold/30 bg-cream/50 dark:bg-gray-700 text-maroon dark:text-cream focus:ring-2 focus:ring-saffron outline-none transition-all" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-maroon/70 dark:text-cream/70 mb-2">Email Address</label>
                                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-5 py-3 rounded-xl border border-gold/30 bg-cream/50 dark:bg-gray-700 text-maroon dark:text-cream focus:ring-2 focus:ring-saffron outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-maroon/70 dark:text-cream/70 mb-2">Subject</label>
                                    <input type="text" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full px-5 py-3 rounded-xl border border-gold/30 bg-cream/50 dark:bg-gray-700 text-maroon dark:text-cream focus:ring-2 focus:ring-saffron outline-none transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-maroon/70 dark:text-cream/70 mb-2">Message</label>
                                <textarea required rows="5" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-5 py-3 rounded-xl border border-gold/30 bg-cream/50 dark:bg-gray-700 text-maroon dark:text-cream focus:ring-2 focus:ring-saffron outline-none transition-all resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full py-4 bg-saffron hover:bg-gold text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 tracking-wide uppercase">
                                🙏 Send Message
                            </button>
                            {error && (
                                <p className="text-red-500 text-sm text-center mt-3">
                                    Something went wrong. Please check your connection and try again.
                                </p>
                            )}
                        </form>
                    )}
                </motion.div>
            </div>

            {/* Floating WhatsApp Button */}
            <a href="https://wa.me/919629202940" target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:-translate-y-2 transition-transform hover:bg-green-600 flex items-center justify-center" aria-label="Contact us on WhatsApp">
                <FaWhatsapp className="text-3xl" />
            </a>
        </div>
    );
};

export default Contact;
