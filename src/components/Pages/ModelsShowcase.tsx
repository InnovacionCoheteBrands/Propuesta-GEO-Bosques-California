import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOUSE_MODELS } from '../../constants';
import { ArrowDown } from 'lucide-react';

interface ModelsShowcaseProps {
    onNavigate?: (page: string) => void;
}

const ModelsShowcase: React.FC<ModelsShowcaseProps> = ({ onNavigate }) => {
    const horizontalRef = useRef<HTMLDivElement>(null);

    // Helper to safely navigate
    const handleNavigate = (page: string) => {
        if (onNavigate) {
            onNavigate(page);
        } else {
            // Fallback for direct URL navigation if prop missing
            window.location.href = `/${page === 'home' ? '' : page}`;
        }
    };

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // --- DESKTOP ANIMATIONS ---
            mm.add("(min-width: 768px)", () => {
                if (horizontalRef.current) {
                    const sections = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
                    const totalSections = sections.length;

                    const tl = gsap.timeline({
                        id: "horizontalTween",
                        scrollTrigger: {
                            trigger: horizontalRef.current,
                            pin: true,
                            scrub: 1,
                            end: () => "+=" + (window.innerWidth * totalSections * 0.5)
                        }
                    });

                    sections.forEach((_, i) => {
                        if (i < totalSections - 1) {
                            tl.to(sections, {
                                xPercent: -100 * (i + 1),
                                ease: "power2.inOut",
                                duration: 2
                            });

                            tl.to({}, { duration: 0.5 });
                        }
                    });

                    // Card Scaling Effect
                    sections.forEach((section) => {
                        const card = section.querySelector(".model-card");
                        if (card) {
                            gsap.fromTo(card,
                                { scale: 0.9, opacity: 0.6 },
                                {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 1,
                                    ease: "power2.out",
                                    scrollTrigger: {
                                        trigger: section,
                                        containerAnimation: tl,
                                        start: "left center",
                                        end: "center center",
                                        scrub: true
                                    }
                                }
                            );
                        }
                    });
                }
            });
        }, horizontalRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={horizontalRef} className="bg-off-white overflow-hidden relative">
            <div
                className="flex flex-col md:flex-row h-auto md:h-screen"
                style={{ width: '100%' }} // On desktop maps to huge width via flex children
            >
                {/* Intro Panel */}
                <div
                    className="horizontal-panel w-full md:w-screen h-[50vh] md:h-screen flex items-center justify-center px-8 md:px-20 bg-off-white flex-shrink-0"
                    style={{ minWidth: '100vw' }} // Ensure pure CSS sizing backup
                >
                    <div className="max-w-2xl text-center">
                        <h2 className="font-serif text-4xl md:text-6xl text-navy mb-6">Modelos Disponibles</h2>
                        <p className="text-gray-600 text-lg md:text-xl font-light">
                            Nuestras residencias están diseñadas para mejorar tu calidad de vida con arquitectura de vanguardia y espacios inteligentes.
                        </p>
                    </div>
                </div>

                {/* Model Panels - Showcase all models */}
                {HOUSE_MODELS.map((model, index) => (
                    <div
                        key={model.id}
                        className="horizontal-panel w-full md:w-screen h-screen flex items-center justify-center px-4 md:px-20 bg-off-white relative flex-shrink-0 border-t md:border-t-0 border-gray-100"
                        style={{ minWidth: '100vw' }}
                    >
                        <span className="absolute text-[15vw] md:text-[20vw] font-serif text-navy/5 font-bold pointer-events-none z-0 select-none">
                            {model.bgText}
                        </span>
                        <div className="model-card relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl w-full">
                            <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-2xl">
                                <img src={model.image} alt={model.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="text-center md:text-left">
                                <span className="text-gold tracking-widest text-xs font-bold uppercase mb-2 block">{model.specs[0].label} {model.specs[0].value}</span>
                                <h2 className="font-serif text-4xl md:text-6xl text-navy mb-6">{model.name}</h2>
                                <p className="text-gray-500 mb-8 font-light">{model.description}</p>
                                <button onClick={() => handleNavigate('modelos')} className="border border-navy text-navy px-8 py-3 rounded-full uppercase text-xs tracking-widest hover:bg-navy hover:text-white transition-all">
                                    Ver Ficha
                                </button>
                            </div>
                        </div>

                        {/* Scroll Indicator - Right side */}
                        {index < HOUSE_MODELS.length - 1 && (
                            <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 text-navy/30 flex-col items-center gap-2 animate-pulse">
                                <span className="text-[10px] uppercase tracking-widest font-bold">Desliza</span>
                                <ArrowDown size={24} className="rotate-[-90deg]" />
                            </div>
                        )}

                        {/* Scroll Indicator - Bottom for mobile */}
                        <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 text-navy/30 flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-[10px] uppercase tracking-widest font-bold">Desliza</span>
                            <ArrowDown size={24} />
                        </div>
                    </div>
                ))}

                {/* CTA Panel */}
                <div
                    className="horizontal-panel w-full md:w-screen h-[50vh] md:h-screen flex items-center justify-center bg-off-white flex-shrink-0 relative"
                    style={{ minWidth: '100vw' }}
                >
                    <div className="text-center">
                        <h3 className="font-serif text-4xl text-navy mb-6">¿Quieres ver más?</h3>
                        <button onClick={() => handleNavigate('modelos')} className="bg-gold text-white px-12 py-4 rounded-full uppercase tracking-widest font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            Catálogo Completo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelsShowcase;
