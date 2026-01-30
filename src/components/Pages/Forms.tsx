import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PrequalifierForm from '../Forms/PrequalifierForm';

// Generic Form Component
export const FormContainer: React.FC<{
    title: string;
    subtitle?: string;
    fields: { name: string; placeholder: string; type?: string }[];
    btnText: string;
    formId: string;
    dark?: boolean; // Added prop for dark background support
}> = ({ title, subtitle, fields, btnText, formId, dark }) => {

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call for demo purposes (Replace with actual fetch to formspree)
        // const response = await fetch(`https://formspree.io/f/${formId}`, { method: 'POST', body: new FormData(e.target as HTMLFormElement) });

        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-12 bg-white rounded-xl shadow-xl">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h3 className="font-serif text-3xl text-navy mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-500">Un asesor se pondrá en contacto a la brevedad.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-gold font-bold text-xs uppercase tracking-widest hover:underline">Enviar otro</button>
            </motion.div>
        );
    }

    return (
        <div className={`h-full flex flex-col justify-center ${dark ? 'bg-transparent p-0 shadow-none border-none' : 'bg-white p-12 md:p-16 rounded-3xl shadow-2xl border border-gray-50'}`}>
            <h2 className={`font-serif text-3xl md:text-4xl mb-4 ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2>
            {subtitle && <p className={`${dark ? 'text-white/60' : 'text-gray-500'} mb-8 font-light`}>{subtitle}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {fields.map((f, i) => (
                    <input
                        key={i}
                        required
                        type={f.type || "text"}
                        name={f.name}
                        placeholder={f.placeholder}
                        className={`w-full border-b py-3 bg-transparent focus:outline-none transition-colors font-light ${dark ? 'border-white/20 text-white placeholder:text-white/30 focus:border-gold' : 'border-gray-200 text-navy placeholder:text-gray-300 focus:border-gold'}`}
                    />
                ))}
                <button
                    disabled={status === 'submitting'}
                    className="bg-navy text-white mt-4 py-4 rounded-full uppercase text-xs tracking-[0.2em] font-bold hover:bg-gold transition-colors duration-300 disabled:opacity-50"
                >
                    {status === 'submitting' ? 'Enviando...' : btnText}
                </button>
            </form>
        </div>
    );
};

export const ContactPage: React.FC = () => (
    <div className="pt-32 pb-24 min-h-screen bg-off-white flex items-center justify-center px-6">
        <div className="flex flex-col gap-12 max-w-7xl w-full">
            {/* Info Header */}
            <div className="w-full bg-navy text-white p-8 md:p-12 rounded-3xl shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2 block">Contacto</span>
                        <h1 className="font-serif text-4xl md:text-5xl mb-4">Hablemos</h1>
                        <p className="text-white/60 text-lg max-w-lg leading-relaxed">Estamos listos para asesorarte en la mejor inversión de tu vida a través de nuestro proceso de pre-calificación exclusivo.</p>
                    </div>

                    <div className="flex flex-col md:items-end gap-4 text-right">
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Llámanos</span>
                            <span className="text-2xl font-serif">33 1071 0957</span>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase tracking-widest text-gold font-bold mb-1">Escríbenos</span>
                            <span className="text-white/80">contacto@bosquescalifornia.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full">
                <PrequalifierForm />
            </div>
        </div>
    </div>
);

export const ReferralPage: React.FC = () => (
    <div className="pt-32 pb-24 min-h-screen bg-off-white flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12 max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl text-navy mb-4">Gana hasta $10,000 MXN</h1>
            <p className="text-gray-500">Invita a tus amigos y familiares a vivir en Bosques California y recibe una bonificación exclusiva al escriturar.</p>
        </div>
        <div className="w-full max-w-lg">
            <FormContainer
                title="Registro de Referido"
                subtitle="Ingresa tus datos y los de tu recomendado."
                btnText="Registrar Referido"
                formId="YOUR_REFERRAL_FORM_ID"
                fields={[
                    { name: "referrer_name", placeholder: "Tu Nombre (Referente)" },
                    { name: "referrer_phone", placeholder: "Tu Teléfono" },
                    { name: "referee_name", placeholder: "Nombre del Interesado" },
                    { name: "referee_phone", placeholder: "Teléfono del Interesado" }
                ]}
            />
        </div>
    </div>
);
