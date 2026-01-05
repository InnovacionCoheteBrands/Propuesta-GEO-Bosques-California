import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Location: React.FC = () => {
  // Mocking map movement by just highlighting items, 
  // in a real Google Maps API implementation we would panTo coordinates.
  const [activeLoc, setActiveLoc] = useState<number | null>(null);

  const locations = [
    { id: 1, name: "Punto Sur", time: "5 MIN" },
    { id: 2, name: "Galerías Santa Anita", time: "2 MIN" },
    { id: 3, name: "Hospital Puerta de Hierro", time: "10 MIN" },
    { id: 4, name: "Costco Sur", time: "8 MIN" }
  ];

  return (
    <div className="h-screen w-full flex flex-col md:flex-row pt-20 md:pt-0">
        <div className="w-full md:w-1/3 bg-off-white p-8 md:p-16 flex flex-col justify-center relative z-10 shadow-xl">
            <h2 className="font-serif text-4xl md:text-5xl text-navy mb-12">Todo a tu<br/>alcance</h2>
            <ul className="space-y-6">
                {locations.map((loc) => (
                    <motion.li 
                        key={loc.id}
                        onHoverStart={() => setActiveLoc(loc.id)}
                        onHoverEnd={() => setActiveLoc(null)}
                        className="cursor-pointer group"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 group-hover:border-gold transition-colors">
                            <span className={`font-serif text-xl transition-colors ${activeLoc === loc.id ? 'text-gold' : 'text-navy'}`}>
                                {loc.name}
                            </span>
                            <span className="text-xs font-bold bg-navy text-white px-2 py-1 rounded">
                                {loc.time}
                            </span>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
        <div className="w-full md:w-2/3 h-[50vh] md:h-full relative">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3735.601977755331!2d-103.4542866850877!3d20.56345998625219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ad1e89b3f307%3A0xe5a2283a005085d3!2sAlta%20California%20Residencial!5e0!3m2!1ses-419!2smx!4v1677600000000" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Map"
            ></iframe>
            <div className="absolute top-8 right-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center gap-2 text-navy">
                    <MapPin className="text-gold" />
                    <span className="font-bold text-sm">Alta California Residencial</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Location;
