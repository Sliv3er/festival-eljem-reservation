import { useState, useRef, useEffect } from 'react';
import useLocale from '../hooks/useLocale';

export default function ChatbotWidget({ open, onClose }) {
  const { t, isRtl } = useLocale();
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: t('chatbot.greeting') },
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), from: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          from: 'bot',
          text: t('chatbot.offline'),
        },
      ]);
    }, 1000);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed z-50 ${isRtl ? 'start-4 sm:start-6' : 'end-4 sm:end-6'} bottom-20 w-[calc(100vw-2rem)] max-w-sm animate-slide-up`}
      role="dialog"
      aria-label={t('chatbot.title')}
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-night/20 ring-1 ring-sandstone/10">
        {/* Header */}
        <div className="flex items-center justify-between bg-night px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
              <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <span className="font-semibold text-white">{t('chatbot.title')}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={t('common.close')}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-neutral/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.from === 'user'
                    ? 'bg-gold text-night rounded-ee-md'
                    : 'bg-white text-text shadow-sm ring-1 ring-sandstone/10 rounded-es-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-sandstone/10 bg-white p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatbot.placeholder')}
            className="flex-1 rounded-xl border-0 bg-neutral px-4 py-2.5 text-sm text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold text-night transition-all hover:bg-gold-light disabled:opacity-40"
            aria-label={t('chatbot.send')}
          >
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
