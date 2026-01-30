import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage as UI_ChatMessage } from '../../types';
import { sendMessageToGrok, ChatMessage as GrokMessage } from './grokService';
import { getSystemPrompt } from './systemPrompt';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<UI_ChatMessage[]>([
    { id: '1', role: 'ai', text: 'Bienvenido a Bosques California. Soy su Concierge de IA. ¿Cómo puedo ayudarle a encontrar su hogar ideal hoy?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  // Helper to render bold text and newlines
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <p key={i} className={`min-h-[1em] ${i > 0 ? 'mt-2' : ''}`}>
        {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold text-gold/90">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    ));
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: UI_ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // 1. Build history for Grok (System + last 10 messages for efficiency)
      const history: GrokMessage[] = [
        { role: 'system', content: getSystemPrompt() },
        ...messages.slice(-10).map(m => ({
          role: m.role === 'user' ? 'user' as const : 'assistant' as const,
          content: m.text
        })),
        { role: 'user', content: input }
      ];

      // 2. Call Grok API
      const aiResponse = await sendMessageToGrok(history);

      // 3. Update UI
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: aiResponse
      }]);

      // 4. Check for escalation keywords
      const lowerResp = aiResponse.toLowerCase();
      if (lowerResp.includes('asesor') || lowerResp.includes('humano') || lowerResp.includes('cita') || lowerResp.includes('whatsapp')) {
        setShowEscalation(true);
      }

    } catch (error) {
      console.error("AI Error", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "Lo lamento, estoy experimentando una breve interrupción en mi conexión premium. ¿Podría intentarlo de nuevo en un momento o contactar a un asesor?"
      }]);
    } finally {
      setIsTyping(false);
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
            className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl mb-4 overflow-hidden border border-gray-100 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-navy p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                  <span className="text-gold font-serif text-xs">BC</span>
                </div>
                <div>
                  <h3 className="font-serif text-sm font-medium">AI Concierge</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-white/60 tracking-widest uppercase">En Línea</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform duration-300 opacity-60 hover:opacity-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Escalation Area */}
            {showEscalation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="bg-gold/10 p-3 text-center border-b border-gold/20"
              >
                <a
                  href="https://wa.me/3310710957"
                  target="_blank"
                  rel="noreferrer"
                  className="text-navy text-xs font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform"
                >
                  <span className="bg-navy text-white px-2 py-0.5 rounded text-[9px]">PRO</span>
                  SOLICITAR ASESOR HUMANO ➔
                </a>
              </motion.div>
            )}

            {/* Messages Area - Added data-lenis-prevent to stop page scroll */}
            <div
              className="flex-1 p-5 overflow-y-auto bg-off-white/30 flex flex-col gap-4 overscroll-contain"
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`max-w-[85%] p-4 text-sm leading-relaxed ${m.role === 'ai'
                    ? 'bg-white text-gray-700 self-start rounded-2xl rounded-bl-none shadow-[4px_4px_10px_rgba(0,0,0,0.02)]'
                    : 'bg-navy text-white self-end rounded-2xl rounded-br-none'
                    }`}
                >
                  {renderMessageText(m.text)}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 ml-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-bounce" />
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Concierge pensando</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escriba su consulta..."
                disabled={isTyping}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-navy text-gold rounded-full flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300 disabled:opacity-30 flex-shrink-0 shadow-lg shadow-navy/10"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-navy rounded-full shadow-[0_10px_30px_rgba(30,61,47,0.3)] flex items-center justify-center text-gold border-2 border-gold/20 hover:border-gold transition-all duration-500 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-gold/10 scale-0 group-hover:scale-100 transition-transform duration-500" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
