/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import DomeGallery from '../components/DomeGallery';

const FALLBACK_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1678468736044-21ec37e9c86a?w=800', alt: 'Kedarnath Temple' },
    { src: 'https://images.unsplash.com/photo-1706194054764-893df50c6dd7?w=800', alt: 'Varanasi Ghat' },
    { src: 'https://images.unsplash.com/photo-1580127893847-5a2e4e72af78?w=800', alt: 'Tirupati Balaji' },
    { src: 'https://images.unsplash.com/photo-1544015759-62a2fa4b3d7a?w=800', alt: 'Rameshwaram Temple' },
    { src: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800', alt: 'Shirdi Sai Baba' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', alt: 'Pilgrims Journey' },
    { src: 'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800', alt: 'Venkateswara Temple' },
    { src: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800', alt: 'Holy River' },
];

export default function Gallery() {
    const [images,  setImages]  = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/gallery');
                let dbImages = [];
                if (res.data && res.data.length > 0) {
                    dbImages = res.data.map(img => ({ src: img.imageUrl, alt: img.title || 'Gallery Image' }));
                }
                setImages([...dbImages, ...FALLBACK_IMAGES]);
            } catch {
                setImages(FALLBACK_IMAGES);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    /* DomeGallery NEEDS a parent with a concrete pixel height — flex-1 alone is not enough
       because sphere-main is position:absolute inset:0 inside sphere-root (height:100%).
       We give it an explicit calc height so the 3-D sphere fills the space correctly.       */
    const galleryHeight = isMobile ? 'calc(100vh - 190px)' : 'calc(100vh - 210px)';

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: 'linear-gradient(180deg,#1e0903 0%,#2d0f05 100%)' }}
        >
            {/* Header */}
            <div style={{ padding: '100px 16px 20px', textAlign: 'center' }}>
                <p style={{ color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.35em', fontWeight: 700, fontSize: isMobile ? '0.65rem' : '0.75rem', marginBottom: '10px' }}>
                    Sacred Moments
                </p>
                <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fffbeb', fontSize: isMobile ? '2rem' : '3rem', marginBottom: '12px' }}>
                    Our Gallery
                </h1>
                <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24,transparent)', margin: '0 auto 12px' }} />
                <p style={{ color: 'rgba(253,230,138,0.55)', fontSize: isMobile ? '0.8rem' : '0.9rem', maxWidth: '380px', margin: '0 auto', lineHeight: 1.7 }}>
                    Drag to explore divine moments from our past yatras.&nbsp;Tap any image to view fully.
                </p>
            </div>

            {/* Dome Gallery — explicit height so sphere-main can use inset:0 */}
            {loading ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: '#fbbf24', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', letterSpacing: '0.15em', animation: 'pulse 1.5s ease-in-out infinite' }}>
                        Loading Gallery…
                    </p>
                    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
                </div>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: galleryHeight,
                        minHeight: isMobile ? '400px' : '520px',
                        position: 'relative',   /* ← required: sphere-root is height:100% of this */
                    }}
                >
                    <DomeGallery
                        images={images}
                        fit={isMobile ? 0.65 : 0.72}
                        minRadius={isMobile ? 280 : 520}
                        maxVerticalRotationDeg={8}
                        segments={isMobile ? 18 : 28}
                        dragDampening={2}
                        grayscale={false}
                        overlayBlurColor="#1e0903"
                    />
                </div>
            )}
        </div>
    );
}
