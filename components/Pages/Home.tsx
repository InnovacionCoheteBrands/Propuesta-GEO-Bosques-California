import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOUSE_MODELS, AMENITIES } from '../../constants';
import { Shield, Home as HomeIcon } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      
      // Hero Parallax Zoom
      gsap.to(heroImgRef.current, {
        scale: 1.5,
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Intro Fade
      gsap.fromTo(heroTextRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" }
      );

      // Horizontal Scroll (Desktop Only)
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      
      if (isDesktop && horizontalRef.current) {
        const sections = gsap.utils.toArray(".horizontal-panel");
        
        // Calculate the total width of horizontal scroll
        const totalWidth = horizontalRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1, 
            snap: 1 / (sections.length - 1),
            // The end value defines how long the scroll lasts. 
            // Using a multiplier of the viewport width creates the 'distance' to scroll.
            end: () => "+=" + horizontalRef.current!.offsetWidth * (sections.length - 1)
          }
        });

        // Card Scaling Effect on Scroll
        sections.forEach((section: any) => {
           const card = section.querySelector(".model-card");
           if(card) {
               gsap.fromTo(card, 
                 { scale: 0.8, opacity: 0.5 },
                 { 
                   scale: 1, opacity: 1, 
                   duration: 0.5,
                   scrollTrigger: {
                       trigger: section,
                       containerAnimation: gsap.getById("horizontalTween"), // Note: we need to assign id to tween if we use this
                       start: "left center",
                       end: "center center",
                       scrub: true
                   }
                 }
               )
           }
        });
      }

      // Amenities Stacking
      const cards = gsap.utils.toArray(".amenity-card");
      cards.forEach((card: any, i) => {
        gsap.fromTo(card, 
          { y: 100, opacity: 0 }, 
          { 
            y: 0, opacity: 1, 
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      
      {/* Hero Section */}
      <section className="hero-container relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            ref={heroImgRef}
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000" 
            className="w-full h-full object-cover scale-110" 
            alt="Luxury Architecture"
          />
          <div className="absolute inset-0 bg-navy/30" />
        </div>
        <div ref={heroTextRef} className="relative z-10 text-center text-white px-4">
            <p className="uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium">Una residencia sin igual para tu crecimiento</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-none">
                Alta California:<br/>El equilibrio perfecto
            </h1>
            <button 
                onClick={() => onNavigate('modelos')}
                className="bg-gold text-white px-10 py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-navy transition-all duration-300"
            >
                Explorar Residencias
            </button>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <div ref={horizontalRef} className="bg-off-white overflow-hidden relative">
        {/* We use inline style for width because dynamic Tailwind classes (w-[...]) are unreliable without safelisting */}
        <div 
            className="flex flex-col md:flex-row h-auto md:h-screen"
            style={{ width: window.innerWidth >= 768 ? `${(HOUSE_MODELS.length + 2) * 100}vw` : '100%' }}
        >
            
            {/* Intro Panel */}
            <div className="horizontal-panel w-full md:w-screen h-[50vh] md:h-screen flex items-center justify-center px-8 md:px-20 bg-off-white flex-shrink-0">
                 <div className="max-w-2xl text-center">
                     <h2 className="font-serif text-4xl md:text-6xl text-navy mb-6">Modelos Disponibles</h2>
                     <p className="text-gray-600 text-lg md:text-xl font-light">
                        Nuestras residencias están diseñadas para mejorar tu calidad de vida con arquitectura de vanguardia y espacios inteligentes.
                     </p>
                 </div>
            </div>

            {/* Model Panels */}
            {HOUSE_MODELS.slice(0, 2).map((model) => (
                <div key={model.id} className="horizontal-panel w-full md:w-screen h-screen flex items-center justify-center px-4 md:px-20 bg-off-white relative flex-shrink-0 border-t md:border-t-0 border-gray-100">
                    <span className="absolute text-[15vw] md:text-[20vw] font-serif text-navy/5 font-bold pointer-events-none z-0 select-none">
                        {model.bgText}
                    </span>
                    <div className="model-card relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl w-full">
                        <div className="aspect-[16/10] overflow-hidden rounded-lg shadow-2xl">
                            <img src={model.image} alt={model.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="text-center md:text-left">
                            <span className="text-gold tracking-widest text-xs font-bold uppercase mb-2 block">{model.specs[0].label} {model.specs[0].value}</span>
                            <h2 className="font-serif text-4xl md:text-6xl text-navy mb-6">{model.name}</h2>
                            <p className="text-gray-500 mb-8 font-light">{model.description}</p>
                            <button onClick={() => onNavigate('modelos')} className="border border-navy text-navy px-8 py-3 rounded-full uppercase text-xs tracking-widest hover:bg-navy hover:text-white transition-all">
                                Ver Ficha
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* CTA Panel */}
             <div className="horizontal-panel w-full md:w-screen h-[50vh] md:h-screen flex items-center justify-center bg-off-white flex-shrink-0">
                 <div className="text-center">
                     <h3 className="font-serif text-4xl text-navy mb-6">¿Quieres ver más?</h3>
                     <button onClick={() => onNavigate('modelos')} className="bg-gold text-white px-12 py-4 rounded-full uppercase tracking-widest font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                         Catálogo Completo
                     </button>
                 </div>
            </div>
        </div>
      </div>

      {/* Refined Amenities */}
      <section className="py-24 px-6 md:px-12 bg-off-white min-h-screen flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3 md:sticky md:top-32 h-fit">
              <span className="text-gold uppercase tracking-widest text-sm font-bold">Estilo de Vida</span>
              <h2 className="font-serif text-5xl md:text-6xl text-navy mt-4 mb-6 leading-tight">Espacios que<br/>trascienden.</h2>
              <p className="text-gray-600 font-light text-lg">Diseñados para crear armonía y bienestar en el sur de la ciudad.</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-12 md:gap-24">
              {AMENITIES.map((item) => (
                  <div key={item.id} className="amenity-card group relative h-[50vh] md:h-[70vh] w-full rounded-2xl overflow-hidden shadow-2xl">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-8 left-8 text-white">
                          <h3 className="font-serif text-3xl md:text-4xl mb-2">{item.title}</h3>
                          <p className="font-light opacity-90">{item.description}</p>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* CEM Section */}
      <section className="py-32 px-6 bg-white text-center">
          <h4 className="text-gray-400 font-bold text-xl tracking-widest mb-16">CEM <span className="text-navy">MILENIUM</span></h4>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mb-6">
                    <HomeIcon size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-navy mb-3">Mejores Viviendas</h3>
                  <p className="text-gray-500 font-light max-w-xs">Construcción inteligente y plusvalía garantizada en cada metro cuadrado.</p>
              </div>
              <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6">
                    <Shield size={32} />
                  </div>
                  <h3 className="font-serif text-2xl text-navy mb-3">Seguridad Total</h3>
                  <p className="text-gray-500 font-light max-w-xs">Vigilancia constante, circuito cerrado y accesos controlados 24/7.</p>
              </div>
          </div>
      </section>

      <footer className="bg-navy py-24 text-center text-white">
          <h2 className="font-serif text-4xl md:text-6xl mb-8">Inicia tu legado</h2>
          <p className="text-sm opacity-50 tracking-widest">ALTA CALIFORNIA RESIDENCIAL © {new Date().getFullYear()}</p>
      </footer>

    </div>
  );
};

export default Home;