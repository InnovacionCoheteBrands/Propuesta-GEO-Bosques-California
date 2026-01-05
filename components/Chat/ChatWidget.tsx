import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../../types';

// NOTE: In a real deployment, process.env.API_KEY would be used.
// We are implementing the fallback "Concierge Mode" as requested.
const API_KEY = process.env.API_KEY || ""; 

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'ai', text: 'Bienvenido. Soy su Concierge Virtual de Alta California. ¿Cómo puedo asesorarle hoy?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const generateFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('precio') || q.includes('costo') || q.includes('cuesta')) {
      return "Nuestras residencias inician desde $3.8 MDP. El valor varía según el modelo y ubicación. ¿Le gustaría agendar una visita para cotizar?";
    }
    if (q.includes('ubicacion') || q.includes('donde') || q.includes('mapa')) {
      return "Nos encontramos en la zona sur de mayor plusvalía, a 2 minutos de Galerías Santa Anita y 5 minutos de Punto Sur.";
    }
    if (q.includes('cita') || q.includes('visita') || q.includes('humano') || q.includes('contacto')) {
      setShowEscalation(true);
      return "He habilitado el enlace directo con nuestro equipo comercial. Por favor, utilice el botón superior para conectar vía WhatsApp.";
    }
    return "Entiendo su interés. Como Concierge Virtual, puedo ofrecerle detalles sobre nuestros modelos (Clara, Bárbara, Mónica) o nuestra ubicación privilegiada. ¿Qué prefiere explorar?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let aiText = "";

    try {
      if (API_KEY) {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const model = "gemini-2.5-flash-preview-09-2025";
        const systemPrompt = `Eres el Concierge Virtual de Alta California Guadalajara. Tono lujoso, breve y profesional. No inventes precios exactos si no los sabes. Si piden hablar con alguien, menciona que activas el botón de asesor humano.`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: input, // Using simplified call for this demo context
            config: {
                systemInstruction: systemPrompt
            }
        });
        aiText = response.text || generateFallbackResponse(input);
      } else {
        // Concierge Fallback Mode
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate thinking
        aiText = generateFallbackResponse(input);
      }
    } catch (error) {
      console.error("AI Error", error);
      aiText = generateFallbackResponse(input);
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: aiText }]);
    
    if (aiText.toLowerCase().includes('asesor') || aiText.toLowerCase().includes('humano')) {
        setShowEscalation(true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[3000] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 md:w-96 bg-white rounded-xl shadow-2xl mb-4 overflow-hidden border border-gray-100 flex flex-col h-[500px]"
          >
            <div className="bg-navy p-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-bold text-sm">Concierge Virtual</h3>
                <span className="text-[10px] text-gold tracking-widest">IA ACTIVA</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            {showEscalation && (
              <motion.div 
                initial={{ height: 0 }} animate={{ height: 'auto' }}
                className="bg-gold/10 p-3 text-center border-b border-gold/20"
              >
                <a href="https://wa.me/3333363636" target="_blank" rel="noreferrer" className="text-navy text-xs font-bold flex items-center justify-center gap-2 hover:underline">
                  HABLAR CON UN ASESOR HUMANO <span>➔</span>
                </a>
              </motion.div>
            )}

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 flex flex-col gap-3">
              {messages.map(m => (
                <div key={m.id} className={`max-w-[85%] p-3 text-sm rounded-lg shadow-sm ${m.role === 'ai' ? 'bg-white text-gray-700 self-start rounded-bl-none' : 'bg-navy text-white self-end rounded-br-none'}`}>
                  {m.text}
                </div>
              ))}
              {isTyping && <div className="text-xs text-gray-400 italic ml-2">Escribiendo...</div>}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escriba su consulta..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button onClick={handleSend} className="text-gold hover:text-navy transition-colors">
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-navy rounded-full shadow-lg flex items-center justify-center text-white hover:bg-navy/90 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
