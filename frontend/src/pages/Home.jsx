import { Suspense, lazy } from 'react';
import HeroSection from '../components/HeroSection';
import PilgrimageDestinations from '../components/PilgrimageDestinations';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutSection from '../components/AboutSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import GalleryMasonry from '../components/GalleryMasonry';

const Lanyard = lazy(() => import('../components/lanyard/Lanyard'));

const Home = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />

            {/* ── Interactive 3D Lanyard Section ────────────────────────── */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)' }}>
                {/* Section header */}
                <div className="text-center pt-16 pb-4 relative z-10">
                    <p className="section-label mb-3"><span className="apple-emoji">🎫</span> Our Identity</p>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-maroon mb-3">
                        Grab Our Card!
                    </h2>
                    <p className="text-base text-maroon/60 max-w-lg mx-auto px-4">
                        Drag the card around — this is who we are <span className="apple-emoji">🙏</span>
                    </p>
                </div>

                {/* 3D Lanyard Canvas */}
                <Suspense fallback={
                    <div className="flex items-center justify-center h-[80vh]">
                        <div className="text-center">
                            <div className="text-5xl mb-4 apple-emoji animate-float">🙏</div>
                            <p className="text-lg font-serif text-maroon/50">Loading 3D experience...</p>
                        </div>
                    </div>
                }>
                    <Lanyard position={[0, 0, 28]} gravity={[0, -40, 0]} />
                </Suspense>

                {/* Bottom golden divider */}
                <div className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: 'linear-gradient(to right, transparent, #f59e0b, transparent)' }} />
            </section>

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
