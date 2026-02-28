import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import GalleryMasonry from '../components/GalleryMasonry';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <HeroSection />
            <AboutSection />
            <TestimonialCarousel />
            <GalleryMasonry />
        </div>
    );
};
export default Home;
