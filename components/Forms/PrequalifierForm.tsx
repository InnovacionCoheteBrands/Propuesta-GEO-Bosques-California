import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PrequalifierData } from '../../types';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface PrequalifierFormProps {
    dark?: boolean;
}

const PrequalifierForm: React.FC<PrequalifierFormProps> = ({ dark }) => {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState<Partial<PrequalifierData>>({
        purpose: '',
        timeline: '',
        budget: '',
        financing: '',
        previousExperience: '',
        locationInterest: '',
        decisionMaker: '',
        decisionFactor: '',
        name: '',
        email: '',
        phone: ''
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectOption = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API Call
        console.log('Submitting Prequalification Data:', formData);

        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    const isStepValid = () => {
        if (step === 1) return formData.purpose && formData.timeline && formData.decisionFactor;
        if (step === 2) return formData.budget && formData.financing && formData.previousExperience;
        if (step === 3) return formData.name && formData.email && formData.phone && formData.locationInterest && formData.decisionMaker;
        return false;
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center p-12 rounded-3xl ${dark ? 'bg-navy/50' : 'bg-white shadow-2xl'}`}
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className={`font-serif text-3xl mb-4 ${dark ? 'text-white' : 'text-navy'}`}>¡Pre-calificación Exitosa!</h3>
                <p className={`${dark ? 'text-white/60' : 'text-gray-500'} mb-8`}>
                    Hemos recibido tus datos. Un asesor especializado en el perfil de <strong>{formData.budget}</strong> se pondrá en contacto contigo a la brevedad.
                </p>
                <button
                    onClick={() => { setStep(1); setStatus('idle'); }}
                    className="text-gold font-bold text-xs uppercase tracking-widest hover:underline"
                >
                    Volver a empezar
                </button>
            </motion.div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${dark ? 'bg-transparent' : 'bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-50'}`}>
            {/* Progress Header */}
            <div className="mb-10">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-gold font-bold text-[10px] uppercase tracking-[0.2em]">Paso {step} de 3</span>
                    <span className={`text-[10px] uppercase tracking-widest font-medium ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                        {step === 1 ? 'Intención' : step === 2 ? 'Perfil Financiero' : 'Contacto Final'}
                    </span>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gold"
                        initial={{ width: '33.3%' }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-5"
                        >
                            <div className="space-y-3">
                                <label className={`block text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white' : 'text-navy'}`}>
                                    1. ¿Con qué propósito desea adquirir una casa?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                    {['Vivir de forma permanente', 'Segunda residencia para mi familia', 'Patrimonio para hijos/familia', 'Solo estoy explorando opciones'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleSelectOption('purpose', opt)}
                                            className={`text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm transition-all h-full ${formData.purpose === opt ? 'bg-navy text-white border-navy' : (dark ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200')}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className={`block text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white' : 'text-navy'}`}>
                                    2. ¿En qué rango de tiempo le gustaría concretar?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {['Dentro de 3 meses', '3 a 6 meses', '6 a 12 meses', 'Más de 12 meses'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleSelectOption('timeline', opt)}
                                            className={`text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm transition-all ${formData.timeline === opt ? 'bg-navy text-white border-navy' : (dark ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200')}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className={`block text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white' : 'text-navy'}`}>
                                    3. ¿Qué factor es determinante para tu decisión?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                    {['Plusvalía e Inversión', 'Seguridad y Privacidad', 'Ubicación y Conectividad', 'Diseño y Espacios'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleSelectOption('decisionFactor', opt)}
                                            className={`text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm transition-all h-full flex items-center ${formData.decisionFactor === opt ? 'bg-navy text-white border-navy' : (dark ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200')}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-5"
                        >
                            <div className="space-y-3">
                                <label className={`block text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white' : 'text-navy'}`}>
                                    4. ¿Cuál es su rango de presupuesto?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                    {['Menos de $5 millones', '$5.0M – $5.8M', '$5.9M – $7.3M', 'Más de $7.3M'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleSelectOption('budget', opt)}
                                            className={`text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm transition-all h-full ${formData.budget === opt ? 'bg-navy text-white border-navy' : (dark ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200')}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className={`block text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white' : 'text-navy'}`}>
                                    5. ¿Cómo planea financiar la compra?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {['Recursos propios (contado)', 'Crédito ya preaprobado', 'Crédito en revisión', 'Sin financiamiento aún'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleSelectOption('financing', opt)}
                                            className={`text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm transition-all ${formData.financing === opt ? 'bg-navy text-white border-navy' : (dark ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200')}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className={`block text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white' : 'text-navy'}`}>
                                    6. ¿Ha adquirido propiedades anteriormente?
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {['Sí, casa habitación', 'Sí, terrenos o locales', 'No, sería mi primera propiedad'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => handleSelectOption('previousExperience', opt)}
                                            className={`text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm transition-all ${formData.previousExperience === opt ? 'bg-navy text-white border-navy' : (dark ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200')}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white/60' : 'text-gray-400'}`}>Nombre Completo</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Ej. Juan Pérez"
                                        className={`w-full border-b py-2 bg-transparent focus:outline-none focus:border-gold transition-colors font-light ${dark ? 'border-white/20 text-white placeholder:text-white/20' : 'border-gray-200 text-navy placeholder:text-gray-300'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white/60' : 'text-gray-400'}`}>Correo Electrónico</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="juan@ejemplo.com"
                                        className={`w-full border-b py-2 bg-transparent focus:outline-none focus:border-gold transition-colors font-light ${dark ? 'border-white/20 text-white placeholder:text-white/20' : 'border-gray-200 text-navy placeholder:text-gray-300'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white/60' : 'text-gray-400'}`}>Teléfono de Contacto</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="33 0000 0000"
                                        className={`w-full border-b py-2 bg-transparent focus:outline-none focus:border-gold transition-colors font-light ${dark ? 'border-white/20 text-white placeholder:text-white/20' : 'border-gray-200 text-navy placeholder:text-gray-300'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white/60' : 'text-gray-400'}`}>¿Quién decidirá la compra?</label>
                                    <select
                                        name="decisionMaker"
                                        value={formData.decisionMaker}
                                        onChange={handleInputChange}
                                        className={`w-full border-b py-2 bg-transparent focus:outline-none focus:border-gold transition-colors font-light appearance-none ${dark ? 'border-white/20 text-white' : 'border-gray-200 text-navy'}`}
                                    >
                                        <option value="" disabled>Seleccione...</option>
                                        <option value="Yo únicamente">Yo únicamente</option>
                                        <option value="Pareja y yo">Pareja y yo</option>
                                        <option value="Toda la familia">Toda la familia</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-white/60' : 'text-gray-400'}`}>Ubicación actual y zona de interés</label>
                                <textarea
                                    required
                                    name="locationInterest"
                                    value={formData.locationInterest}
                                    onChange={handleInputChange}
                                    placeholder="Ej. Vivo en Guadalajara, me interesa Tlajomulco..."
                                    rows={1}
                                    className={`w-full border-b py-2 bg-transparent focus:outline-none focus:border-gold transition-colors font-light resize-none ${dark ? 'border-white/20 text-white placeholder:text-white/20' : 'border-gray-200 text-navy placeholder:text-gray-300'}`}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="flex gap-4 mt-12">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${dark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-navy hover:bg-gray-200'}`}
                        >
                            <ChevronLeft size={16} />
                            Atrás
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!isStepValid()}
                            className="flex-1 flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                        >
                            Siguiente
                            <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={!isStepValid() || status === 'submitting'}
                            className="flex-1 flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-colors duration-300 disabled:opacity-50"
                        >
                            {status === 'submitting' ? 'Procesando...' : 'Finalizar Pre-calificación'}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PrequalifierForm;
