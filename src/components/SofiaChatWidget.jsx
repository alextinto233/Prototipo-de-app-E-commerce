import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: '¿Cuáles son los horarios de entrega?',
    answer:
      'Realizamos entregas de lunes a sábado entre 9:00 y 20:00 hrs. Los pedidos confirmados antes de las 14:00 se despachan el mismo día; después de esa hora, al día hábil siguiente.',
  },
  {
    question: '¿Cómo funcionan los retornables?',
    answer:
      'Al comprar productos retornables recibes un descuento automático por envase. Solo debes entregar los envases vacíos y limpios al conductor en la entrega. El abono se refleja al instante en tu boleta.',
  },
  {
    question: '¿Cuál es el monto mínimo de pedido?',
    answer:
      'El monto mínimo de pedido es de $25.000 CLP. Si tu carro no alcanza ese total, te sugerimos agregar productos de alta rotación como cervezas o bebidas para completar el pedido.',
  },
  {
    question: '¿Cómo hago seguimiento a mi pedido?',
    answer:
      'Una vez confirmado tu pedido recibirás un número de orden (por ejemplo, #10045). Puedes consultarme en cualquier momento con ese número y te indicaré si está en preparación, en ruta o entregado.',
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer:
      'Aceptamos transferencia bancaria, pago contra entrega en efectivo y tarjetas de débito/crédito a través del terminal del conductor. Los pagos con transferencia deben confirmarse antes del despacho.',
  },
];

const DEFAULT_REPLY =
  'Gracias por tu consulta. Por ahora puedo ayudarte con horarios de entrega, retornables, montos mínimos, seguimiento de pedidos y formas de pago. Selecciona una pregunta frecuente o escríbeme con más detalle.';

const WELCOME_MESSAGE = {
  id: 'welcome',
  sender: 'sofia',
  text: '¡Hola! Soy Sofía, la asistente virtual de tu distribuidora. Estoy aquí para resolver tus dudas sobre pedidos, entregas y retornables. ¿En qué te puedo ayudar?',
};

let messageId = 1;
const nextId = () => ++messageId;

export default function SofiaChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const addSofiaReply = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId(), sender: 'sofia', text }]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickQuestion = (faq) => {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), sender: 'user', text: faq.question },
    ]);
    addSofiaReply(faq.answer);
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: nextId(), sender: 'user', text: trimmed }]);
    setInputValue('');

    const matchedFaq = FAQ_ITEMS.find(
      (faq) =>
        faq.question.toLowerCase().includes(trimmed.toLowerCase()) ||
        trimmed.toLowerCase().includes(faq.question.toLowerCase().slice(0, 20))
    );

    addSofiaReply(matchedFaq ? matchedFaq.answer : DEFAULT_REPLY);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="absolute bottom-20 left-3 right-3 z-40 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-[min(520px,calc(100%-6rem))]">
          <header className="bg-gradient-to-r from-[#006838] to-[#004224] px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-base leading-tight">Sofía</h2>
                <p className="text-green-100 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                  Asistente virtual · En línea
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#F3F4F6] custom-scrollbar min-h-[240px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'sofia' && (
                  <div className="w-7 h-7 rounded-full bg-[#006838] flex items-center justify-center mr-2 shrink-0 mt-0.5">
                    <span className="text-white font-bold text-xs">S</span>
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#006838] text-white rounded-br-md'
                      : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-[#006838] flex items-center justify-center mr-2 shrink-0">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 pt-2 pb-1 bg-white border-t border-gray-100 shrink-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles size={10} />
              Preguntas frecuentes
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {FAQ_ITEMS.map((faq) => (
                <button
                  key={faq.question}
                  onClick={() => handleQuickQuestion(faq)}
                  disabled={isTyping}
                  className="shrink-0 text-xs font-medium text-[#006838] bg-[#eaf4ed] hover:bg-[#d4ebdc] border border-[#006838]/20 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>

          <div className="px-3 pb-3 pt-1 bg-white flex gap-2 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta..."
              disabled={isTyping}
              className="flex-1 bg-gray-100 text-sm text-gray-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#006838] focus:bg-white border border-transparent focus:border-[#006838]/20 placeholder-gray-400 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#006838] hover:bg-[#00522c] disabled:bg-gray-300 text-white p-2.5 rounded-xl transition-colors shrink-0"
              aria-label="Enviar mensaje"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-20 left-4 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-[#006838] to-[#004224] text-white shadow-[0_8px_24px_-4px_rgba(0,104,56,0.6)] border-2 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform group"
          aria-label="Abrir chat con Sofía"
        >
          <span className="font-black text-xl group-hover:scale-110 transition-transform">S</span>
        </button>
      )}
    </>
  );
}
