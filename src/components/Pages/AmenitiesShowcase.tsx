import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AMENITIES } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

const AmenitiesShowcase: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.amenity-card');

            if (cards.length === 0) return;

            // Initial state: Stack all cards except the first one below the viewport
            cards.forEach((card, i) => {
                if (i > 0) {
                    gsap.set(card, { yPercent: 100 });
                }
            });

            // Create the stacking animation on scroll
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: () => `+=${cards.length * 100}%`,
                pin: true,
                scrub: 1,
                animation: gsap.timeline()
                    .to(cards.slice(1), {
                        yPercent: 0,
                        stagger: 1,
                        ease: 'none'
                    })
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="amenities-container relative bg-off-white min-h-screen"
        >
            <div className="flex flex-col md:flex-row h-screen px-6 md:px-12 gap-12 py-24 max-w-7xl mx-auto">
                {/* Sticky Header (Left Side) */}
                <div className="md:w-1/3 flex flex-col justify-center z-20">
                    <span className="text-gold uppercase tracking-widest text-sm font-bold block mb-4">
                        Amenidades Premium
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl text-navy leading-tight mb-6">
                        Espacios que<br />Trascienden
                    </h2>
                    <p className="text-gray-600 font-light text-lg leading-relaxed max-w-sm">
                        La mejor oferta de <strong>casas con alberca y seguridad en Tlajomulco</strong>. Un entorno diseñado para el bienestar de tu familia en el sur de la ciudad.
                    </p>
                </div>

                {/* Stacking Cards Container (Right Side) */}
                <div
                    ref={cardsContainerRef}
                    className="md:w-2/3 relative h-[60vh] md:h-[80vh]"
                >
                    {AMENITIES.map((item, index) => (
                        <div
                            key={item.id}
                            className="amenity-card absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-white"
                            style={{ zIndex: index + 1 }}
                        >
                            <img
                                src={item.image}
                                alt={`Amenidad Bosques California: ${item.title}`}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                                <h3 className="font-serif text-3xl md:text-5xl mb-4">{item.title}</h3>
                                <p className="font-light text-base md:text-lg opacity-90 leading-relaxed border-l-2 border-gold pl-4 max-w-xl">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AmenitiesShowcase;
