import React, { useState } from 'react';
import { HOUSE_MODELS } from '../../constants';
import { motion } from 'framer-motion';
import { HouseModel } from '../../types';
import ModelModal from '../Models/ModelModal';

const Models: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<HouseModel | null>(null);

  return (
    <div className="pt-32 pb-24 bg-off-white min-h-screen">
      <div className="text-center mb-24 px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gold tracking-[0.2em] font-bold text-xs uppercase mb-4"
        >
          Nuestra Colección
        </motion.p>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-serif text-5xl md:text-7xl text-navy"
        >
          Residencias de Autor
        </motion.h1>
      </div>

      <div className="flex flex-col gap-24 md:gap-40 px-6 md:px-20">
        {HOUSE_MODELS.map((model, index) => (
          <div
            key={model.id}
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 overflow-hidden rounded-xl shadow-2xl aspect-[4/3] cursor-pointer group"
              onClick={() => setSelectedModel(model)}
            >
              <img src={model.image} alt={model.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: index % 2 !== 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2"
            >
              <h2 className="font-serif text-4xl md:text-5xl text-navy mb-4">{model.name}</h2>
              <p className="text-gray-500 font-light mb-8 text-lg">{model.description}</p>

              <div className="grid grid-cols-2 gap-y-6 gap-x-8 border-t border-gray-200 pt-6 mb-8">
                {model.specs.map((spec, i) => (
                  <div key={i}>
                    <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">{spec.label}</span>
                    <strong className="font-serif text-xl text-navy">{spec.value}</strong>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedModel(model)}
                  className="bg-navy text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-300"
                >
                  Ver Detalles
                </button>
                <button className="border border-navy text-navy px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-navy hover:text-white transition-all duration-300">
                  Descargar Ficha
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <ModelModal
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
      />
    </div>
  );
};

export default Models;
