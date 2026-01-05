import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_IMAGES } from '../../constants';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".gallery-card");
      cards.forEach((card: any) => {
        const speed = parseFloat(card.getAttribute('data-speed') || "0.1");
        gsap.to(card.querySelector('img'), {
          yPercent: 20 * speed * 10,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            scrub: true
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const col1 = GALLERY_IMAGES.filter(i => i.col === 1);
  const col2 = GALLERY_IMAGES.filter(i => i.col === 2);
  const col3 = GALLERY_IMAGES.filter(i => i.col === 3);

  const renderColumn = (images: typeof GALLERY_IMAGES, mt = "0px") => (
    <div className="flex flex-col gap-8" style={{ marginTop: mt }}>
      {images.map((img, idx) => (
        <motion.div 
            key={img.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="gallery-card overflow-hidden rounded-lg shadow-lg relative group h-[400px] md:h-[500px]"
            data-speed={img.speed}
        >
            <img 
                src={img.src} 
                alt="Gallery" 
                className="w-full h-[120%] -mt-[10%] object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 bg-off-white min-h-screen">
      <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-navy"
          >
              Entorno Visual
          </motion.h1>
          <p className="text-gray-500 mt-4 tracking-widest text-sm uppercase">Detalles que enamoran</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {renderColumn(col1, "0px")}
          {renderColumn(col2, "80px")}
          {renderColumn(col3, "0px")}
      </div>
    </div>
  );
};

export default Gallery;
