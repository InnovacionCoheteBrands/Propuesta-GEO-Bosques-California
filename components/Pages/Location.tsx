import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Location: React.FC = () => {
    // Mocking map movement by just highlighting items, 
    // in a real Google Maps API implementation we would panTo coordinates.
    const [activeLoc, setActiveLoc] = useState<number | null>(null);

    const locations = [
        { id: 1, name: "Galerías Santa Anita", time: "2 MIN" },
        { id: 2, name: "Punto Sur", time: "5 MIN" },
        { id: 3, name: "Hospitales y Clínicas", time: "10 MIN" },
        { id: 4, name: "Escuelas de Prestigio", time: "8 MIN" },
        { id: 5, name: "Acceso López Mateos", time: "1 MIN" }
    ];

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Sidebar con información */}
            <div className="absolute left-0 top-0 h-full w-full md:w-1/3 bg-off-white/95 backdrop-blur-sm p-8 md:p-16 flex flex-col justify-center z-10 shadow-2xl pt-20 md:pt-0">
                <h2 className="font-serif text-4xl md:text-5xl text-navy mb-12">Todo a tu<br />alcance</h2>
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

            {/* Mapa de fondo completo */}
            <div className="absolute inset-0 w-full h-full z-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3735.8376042007794!2d-103.4733178!3d20.5538244!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f55001599fbc1%3A0x367efb52a27b6197!2sBosques%20california!5e0!3m2!1ses-419!2sus!4v1768429023051!5m2!1ses-419!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Map"
                ></iframe>

                {/* Etiqueta flotante del mapa (visible en desktop) */}
                <div className="absolute top-24 right-8 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg hidden md:block">
                    <div className="flex items-center gap-2 text-navy">
                        <MapPin className="text-gold" />
                        <span className="font-bold text-sm">Bosques California</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
