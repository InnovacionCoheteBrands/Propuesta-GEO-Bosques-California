import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Generic Form Component
const FormContainer: React.FC<{
    title: string;
    subtitle?: string;
    fields: { name: string; placeholder: string; type?: string }[];
    btnText: string;
    formId: string;
}> = ({ title, subtitle, fields, btnText, formId }) => {

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
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-50">
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">{title}</h2>
            {subtitle && <p className="text-gray-500 mb-8 font-light">{subtitle}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {fields.map((f, i) => (
                    <input
                        key={i}
                        required
                        type={f.type || "text"}
                        name={f.name}
                        placeholder={f.placeholder}
                        className="w-full border-b border-gray-200 py-3 bg-transparent focus:outline-none focus:border-gold transition-colors font-light text-navy placeholder:text-gray-300"
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
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full items-center">
            <div>
                <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2 block">Contacto</span>
                <h1 className="font-serif text-5xl md:text-7xl text-navy mb-6">Hablemos</h1>
                <p className="text-gray-600 text-lg mb-8">Estamos listos para asesorarte en la mejor inversión de tu vida.</p>
                <div className="text-2xl font-serif text-navy">33 1071 0957</div>
                <div className="text-gray-400 mt-2">contacto@bosquescalifornia.com</div>
            </div>
            <FormContainer
                title="Envíanos un mensaje"
                btnText="Solicitar Información"
                formId="YOUR_FORMSPREE_ID" // Placeholder
                fields={[
                    { name: "name", placeholder: "Nombre Completo" },
                    { name: "email", placeholder: "Correo Electrónico", type: "email" },
                    { name: "phone", placeholder: "Teléfono" }
                ]}
            />
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
