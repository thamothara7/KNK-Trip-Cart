"use client";
/* eslint-disable no-unused-vars */
import HeroSection from '../components/HeroSection';
import PilgrimageDestinations from '../components/PilgrimageDestinations';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutSection from '../components/AboutSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import GalleryMasonry from '../components/GalleryMasonry';

const Home = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />

            <PilgrimageDestinations />
            <WhyChooseUs />
            <div id="about">
                <AboutSection />
            </div>
            <TestimonialCarousel />
            <GalleryMasonry />
        </div>
    );
};
export default Home;
