import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

const WHATSAPP_URL = 'https://wa.me/919629202940?text=Namaste!%20I%20am%20interested%20in%20a%20devotional%20trip.%20Please%20share%20details.';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />

        {/* Global Floating WhatsApp Button — visible on ALL pages */}
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
      </div>
    </Router>
  );
}

export default App;
