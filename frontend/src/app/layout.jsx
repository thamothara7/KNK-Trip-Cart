import { Outfit, Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaWhatsapp } from 'react-icons/fa';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-serif' });

export const metadata = {
    title: 'KNK Trip Cart',
    description: 'Devotional trips and tour packages',
};

const WHATSAPP_URL = 'https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20a%20devotional%20trip.%20Please%20share%20details.';

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${outfit.variable} ${poppins.variable} ${playfair.variable}`}>
            <body className="flex flex-col min-h-screen antialiased bg-cream text-[#3b1a00]">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                {/* Global Floating WhatsApp Button */}
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    style={{
                        width: '60px',
                        height: '60px',
                        background: '#25D366',
                        boxShadow: '0 4px 24px rgba(37,211,102,0.5)',
                    }}
                >
                    <FaWhatsapp className="text-3xl" />
                </a>
            </body>
        </html>
    );
}
