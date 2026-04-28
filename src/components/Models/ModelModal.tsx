import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, BedDouble, Bath, ArrowRight } from 'lucide-react';
import { HouseModel } from '../../types';
import ModelTour from './ModelTour';

interface ModelModalProps {
    model: HouseModel | null;
    onClose: () => void;
}

const ModelModal: React.FC<ModelModalProps> = ({ model, onClose }) => {
    // Prevent scroll when modal is open
    useEffect(() => {
        if (model) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [model]);

    if (!model) return null;

    const modalContent = (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6"
            >
                {/* Backdrop Layer */}
                <div
                    className="absolute inset-0 bg-forest/80 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative bg-white w-full h-full md:max-w-7xl md:h-[85vh] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col z-[210]"
                >
                    {/* Integrated Header */}
                    <nav className="w-full px-6 py-4 md:px-12 flex justify-between items-center bg-off-white shadow-sm border-b border-forest/5 shrink-0">
                        <div className="font-serif text-xl md:text-2xl font-bold tracking-[2px] uppercase text-forest select-none">
                            Bosques California
                        </div>

                        <div className="hidden lg:block text-forest/40 font-sans text-[10px] tracking-[0.3em] font-bold uppercase">
                            {model.name}
                        </div>

                        <button
                            onClick={onClose}
                            className="flex items-center gap-4 group"
                        >
                            <span className="text-[10px] font-bold tracking-[0.2em] text-forest group-hover:text-gold transition-colors duration-300 hidden sm:block">
                                CERRAR
                            </span>
                            <div className="p-2 bg-forest text-white rounded-full group-hover:bg-gold transition-all duration-300">
                                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            </div>
                        </button>
                    </nav>

                    {/* Main Content Body */}
                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                        {/* Left Side: Immersive Tour */}
                        <div className="w-full md:w-3/5 h-[40vh] md:h-full relative overflow-hidden bg-forest">
                            <ModelTour gallery={model.gallery} />
                        </div>

                        {/* Right Side: Details */}
                        <div 
                            className="w-full md:w-2/5 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white flex flex-col justify-center"
                            data-lenis-prevent="true"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="max-w-xl flex flex-col h-full justify-between"
                            >
                                <div>
                                    <span className="text-forest tracking-widest font-bold text-sm uppercase mb-3 block opacity-80">
                                        Ficha Técnica
                                    </span>
                                    <h2 className="font-serif text-4xl md:text-6xl text-forest mb-4 leading-tight">
                                        {model.name}
                                    </h2>

                                    <div className="w-12 h-1 bg-gold mb-6" />

                                    <p className="text-gray-500 font-light mb-8 text-base md:text-lg leading-relaxed line-clamp-4 md:line-clamp-none">
                                        {model.description}
                                    </p>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
                                        {model.specs.map((spec, i) => (
                                            <div key={i} className="flex flex-col gap-1">
                                                <span className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-bold">
                                                    {spec.label}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {spec.label.toLowerCase().includes('construcción') && <Ruler size={16} className="text-gold" />}
                                                    {spec.label.toLowerCase().includes('recámaras') && <BedDouble size={16} className="text-gold" />}
                                                    {spec.label.toLowerCase().includes('baños') && <Bath size={16} className="text-gold" />}
                                                    <span className="font-serif text-2xl text-forest">{spec.value}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Features List */}
                                    {model.features && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-6 border-t border-gray-100">
                                            <div>
                                                <h4 className="text-xs font-bold text-forest uppercase tracking-widest mb-4">Planta Baja</h4>
                                                <ul className="space-y-2">
                                                    {model.features.pb.map((feature, i) => (
                                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-forest uppercase tracking-widest mb-4">Planta Alta</h4>
                                                <ul className="space-y-2">
                                                    {model.features.pa.map((feature, i) => (
                                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Call to Action */}
                                <div className="space-y-4 mt-auto">
                                    <a 
                                        href="/contacto"
                                        className="w-full bg-forest text-white px-6 py-4 rounded-xl text-xs uppercase tracking-[0.3em] font-bold hover:bg-gold transition-all duration-700 flex items-center justify-center gap-4 group relative overflow-hidden shadow-xl shadow-forest/10"
                                    >
                                        <span className="relative z-10">Agendar Recorrido</span>
                                        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                                        <div className="absolute inset-y-0 left-0 w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                                    </a>

                                    <div className="flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-widest font-bold border-t border-gray-100 pt-4">
                                        <span>Entrega Inmediata</span>
                                        <span className="text-gold">Créditos Disponibles</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default ModelModal;

