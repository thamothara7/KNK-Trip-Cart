import { Link } from 'react-router-dom';
import { FaOm, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-maroon text-cream relative overflow-hidden">
            {/* Decorative top border */}
            <div className="h-1 bg-gradient-to-r from-gold via-saffron to-gold" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <FaOm className="text-3xl text-gold" />
                            <h3 className="text-2xl font-serif font-bold text-gold">Sai Shiva Tours</h3>
                        </div>
                        <p className="text-cream/70 text-sm leading-relaxed">
                            Your trusted partner in spiritual and enjoyable travel for more than a decade. Combining luxury, convenience, and unforgettable experiences.
                        </p>
                    </div>

                    {/* Packages */}
                    <div>
                        <h4 className="text-lg font-serif font-bold text-gold mb-4 tracking-wide">Our Packages</h4>
                        <ul className="space-y-2 text-cream/70 text-sm">
                            <li><Link to="/packages" className="hover:text-gold transition-colors">South India Tours</Link></li>
                            <li><Link to="/packages" className="hover:text-gold transition-colors">North India Tours</Link></li>
                            <li><Link to="/packages" className="hover:text-gold transition-colors">One Day Trip</Link></li>
                            <li><Link to="/packages" className="hover:text-gold transition-colors">Hills Trip</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-serif font-bold text-gold mb-4 tracking-wide">Quick Links</h4>
                        <ul className="space-y-2 text-cream/70 text-sm">
                            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
                            <li><Link to="/packages" className="hover:text-gold transition-colors">Packages</Link></li>
                            <li><Link to="/contact" className="hover:text-gold transition-colors">Enquiry</Link></li>
                            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-serif font-bold text-gold mb-4 tracking-wide">Contact Info</h4>
                        <div className="space-y-3 text-cream/70 text-sm">
                            <p className="flex items-start gap-2"><FaPhoneAlt className="text-gold mt-1 shrink-0" /> +91 96292 02940</p>
                            <p className="flex items-start gap-2"><FaEnvelope className="text-gold mt-1 shrink-0" /> saishivatours@gmail.com</p>
                            <p className="flex items-start gap-2"><FaMapMarkerAlt className="text-gold mt-1 shrink-0" /> Shop no 2, Saraswathi Complex, C.T.H.Road, (Jaya Arts College Opp) Devi Nagar, Thiruninravur – 602024.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-cream/10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-cream/50 text-xs">
                    <p>&copy; {new Date().getFullYear()} Sai Shiva Tours. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
