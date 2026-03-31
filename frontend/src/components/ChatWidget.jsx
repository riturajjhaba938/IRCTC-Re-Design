import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const chatTranslations = {
    en: {
        chatTitle: "IRCTC Assistant Disha",
        chatPlaceholder: "Type your query here...",
        send: "Send",
        botGreeting: "Welcome to IRCTC Support! I am Disha. How can I assist you today?",
        quickRepliesTitle: "Suggested Queries:",
        quickReplies: [
            { id: "book", label: "Book Ticket" },
            { id: "pnr", label: "Check PNR Status" },
            { id: "cancel", label: "Cancel Ticket" },
            { id: "food", label: "Order Food" }
        ],
        responses: {
            book: "To book a ticket, simply enter your origin, destination, and travel date in the search widget on the homepage. You can filter for AC, Fastest, or Cheapest trains.",
            pnr: "Tracking your PNR is easy! Navigate to our 'PNR Status' page using the main menu, and enter your 10-digit PNR number.",
            cancel: "For ticket cancellation, go to 'My Trips'. Select your upcoming journey and click the 'Cancel' button. Refunds process within 3-5 business days.",
            food: "Craving a meal? Check out 'E-Catering' under 'Other Services' or add food directly during your booking process.",
            default: "I'm still learning! For complex queries, please call our 24/7 premium support at +91 139 or email care@irctc.co.in. Here are some topics I can help with:"
        }
    },
    hi: {
        chatTitle: "IRCTC असिस्टेंट दिशा",
        chatPlaceholder: "अपना प्रश्न यहाँ लिखें...",
        send: "भेजें",
        botGreeting: "IRCTC सहायता में आपका स्वागत है! मैं दिशा हूँ। आज मैं आपकी कैसे मदद कर सकती हूँ?",
        quickRepliesTitle: "सुझाए गए प्रश्न:",
        quickReplies: [
            { id: "book", label: "टिकट बुक करें" },
            { id: "pnr", label: "PNR स्टेटस जांचें" },
            { id: "cancel", label: "टिकट रद्द करें" },
            { id: "food", label: "खाना ऑर्डर करें" }
        ],
        responses: {
            book: "टिकट बुक करने के लिए, होमपेज पर खोज विजेट में अपना प्रस्थान, गंतव्य और यात्रा की तिथि दर्ज करें।",
            pnr: "अपना PNR ट्रैक करना आसान है! मुख्य मेनू का उपयोग करके हमारे 'PNR स्टेटस' पृष्ठ पर जाएं।",
            cancel: "टिकट रद्द करने के लिए, 'मेरी यात्राएं' पर जाएं। अपनी आगामी यात्रा का चयन करें और 'रद्द करें' बटन पर क्लिक करें।",
            food: "भोजन की लालसा है? 'अन्य सेवाओं' के तहत 'ई-कैटरिंग' देखें।",
            default: "मैं अभी भी सीख रही हूँ! जटिल प्रश्नों के लिए, कृपया +91 139 पर कॉल करें।"
        }
    }
};

const ChatWidget = () => {
    const { language: lang } = useLanguage();
    const t = chatTranslations[lang] || chatTranslations['en'];

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: chatTranslations[lang]?.botGreeting || chatTranslations['en'].botGreeting }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Update greeting on language change
    useEffect(() => {
        const currentT = chatTranslations[lang] || chatTranslations['en'];
        setMessages([{ sender: 'bot', text: currentT.botGreeting }]);
    }, [lang]);

    // Auto-scroll
    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, isTyping]);

    const determineResponse = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('book') || lowerText.includes('ticket') || lowerText.includes('बुक') || lowerText.includes('टिकट')) return t.responses.book;
        if (lowerText.includes('pnr') || lowerText.includes('status') || lowerText.includes('स्टेटस')) return t.responses.pnr;
        if (lowerText.includes('cancel') || lowerText.includes('रद्द')) return t.responses.cancel;
        if (lowerText.includes('food') || lowerText.includes('meal') || lowerText.includes('खाना') || lowerText.includes('भोजन')) return t.responses.food;
        return t.responses.default;
    };

    const handleSendMessage = (e, overrideId = null, overrideText = null) => {
        if (e) e.preventDefault();
        const messageText = overrideText || input;
        if (!messageText.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            let botReply = '';
            if (overrideId) {
                botReply = t.responses[overrideId] || t.responses.default;
            } else {
                botReply = determineResponse(messageText);
            }
            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div className={`pointer-events-auto transition-all duration-500 ease-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-75 opacity-0 invisible mb-0 h-0 w-0'}`}>
                <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_60px_rgba(20,29,30,0.15)] border border-outline-variant/10 flex flex-col h-[500px] w-[360px] md:w-[400px] overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary text-on-primary p-5 flex justify-between items-center shrink-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="flex items-center gap-3 z-10">
                            <div className="w-10 h-10 bg-surface text-primary rounded-full flex justify-center items-center shadow-md">
                                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                            </div>
                            <div>
                                <h3 className="font-black text-lg">{t.chatTitle}</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span className="text-[10px] font-medium text-white/80 uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="z-10 w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors active:scale-95 text-white/80 hover:text-white">
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-surface/50 scrollbar-hide">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user' ? 'bg-primary text-on-primary rounded-tr-sm' : 'bg-surface-container-low text-on-surface rounded-tl-sm border border-outline-variant/10'}`}>
                                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-surface-container-low rounded-2xl rounded-tl-sm p-4 w-16 h-12 flex items-center justify-center gap-1.5 border border-outline-variant/10">
                                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        )}

                        {messages[messages.length - 1]?.sender === 'bot' && !isTyping && (
                            <div className="pt-2 pb-1">
                                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3 px-1">{t.quickRepliesTitle}</p>
                                <div className="flex flex-wrap gap-2">
                                    {t.quickReplies.map((reply, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => handleSendMessage(null, reply.id, reply.label)}
                                            className="text-[13px] bg-secondary-fixed/50 hover:bg-secondary-fixed text-on-secondary-fixed font-bold py-2.5 px-4 rounded-full transition-all active:scale-95 shadow-sm border border-secondary/10"
                                        >
                                            {reply.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-surface border-t border-outline-variant/10 shrink-0">
                        <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-3">
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t.chatPlaceholder}
                                className="flex-1 bg-surface-container-low border-none rounded-2xl py-3 px-5 text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-shadow text-on-surface"
                                disabled={isTyping}
                            />
                            <button 
                                type="submit" 
                                disabled={!input.trim() || isTyping}
                                className="w-12 h-12 bg-primary text-on-primary rounded-2xl flex items-center justify-center disabled:opacity-50 transition-all hover:bg-primary/90 shadow-md shadow-primary/20 active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toggle Button - SMALLER */}
            {!isOpen && (
                <div className="pointer-events-auto flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setIsOpen(true)}>
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-primary shadow-[0_8px_20px_rgba(163,62,0,0.3)] flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-2xl text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>support_agent</span>
                        </div>
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-surface animate-pulse"></span>
                    </div>
                    <div className="bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        <span className="text-on-surface text-[11px] font-bold">Ask Disha</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
