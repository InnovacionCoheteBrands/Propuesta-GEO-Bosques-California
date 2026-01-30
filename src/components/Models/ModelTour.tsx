import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ModelGalleryImage } from '../../types';

interface ModelTourProps {
    gallery: ModelGalleryImage[];
}

const ModelTour: React.FC<ModelTourProps> = ({ gallery }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000); // Auto-advance every 7 seconds
        return () => clearInterval(timer);
    }, [gallery.length]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-navy group">
            {/* Immersive Gallery */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    initial={{ opacity: 0, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(20px)' }}
                    transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                >
                    {/* Ken Burns Animation Container */}
                    <motion.div
                        initial={{ scale: 1, x: '0%', y: '0%' }}
                        animate={{
                            scale: 1.15,
                            x: direction > 0 ? '-2%' : '2%',
                            y: '-2%'
                        }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="w-full h-full"
                    >
                        <img
                            src={gallery[currentIndex].src}
                            alt={gallery[currentIndex].label}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />
                </motion.div>
            </AnimatePresence>

            {/* Contextual Label */}
            <div className="absolute bottom-12 left-12 z-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-white font-serif text-3xl md:text-4xl leading-tight">
                            {gallery[currentIndex].label}
                        </h3>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
                <motion.div
                    key={currentIndex}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 7, ease: "linear" }}
                    className="h-full bg-gold origin-left"
                />
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 right-12 flex gap-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all duration-300 backdrop-blur-sm"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all duration-300 backdrop-blur-sm"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute top-12 left-12 flex gap-2 z-30">
                {gallery.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 transition-all duration-500 rounded-full ${index === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ModelTour;
