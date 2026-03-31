import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';
import { useLanguage } from '../context/LanguageContext';

const Support = () => {
    const { t: translate, language: lang } = useLanguage();
    const t = translate('support');
    
    const [messages, setMessages] = useState([{ sender: 'bot', text: t.botGreeting || 'Welcome to IRCTC Support. How can I assist you today?' }]);
    const [input, setInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isChatOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isChatOpen]);

    useEffect(() => {
        if (messages.length === 1 && messages[0].sender === 'bot') {
            setMessages([{ sender: 'bot', text: t.botGreeting }]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    const handleSendMessage = (e, overrideText = null) => {
        if (e) e.preventDefault();
        const messageText = overrideText || input;
        if (!messageText.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: messageText }]);
        setInput('');

        setTimeout(() => {
            const botReplies = [
                "We are experiencing high passenger volume on some routes. Please ensure you carry valid ID proof during travel.",
                "For account access issues, please verify your registered email ID.",
                "You can cancel your ticket from the 'My Trips' section.",
                "Please call +91 139 for immediate assistance regarding your train schedule."
            ];
            const botReply = botReplies[Math.floor(Math.random() * botReplies.length)];
            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        }, 800);
    };

    return (
        <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 sm:pt-28 pb-20">
                {/* ===== FULL-WIDTH VIDEO HERO ===== */}
                <div className="relative overflow-hidden mb-10 sm:mb-16 mx-4 sm:mx-6 lg:mx-auto max-w-7xl rounded-[2rem] sm:rounded-[3rem] shadow-2xl group bg-[#0b0f19] min-h-[350px] sm:min-h-[450px] md:min-h-[550px]">
                    <video 
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-out ${videoLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        onLoadedData={() => setVideoLoaded(true)}
                    >
                        <source src="https://res.cloudinary.com/dmkspibfj/video/upload/v1774996934/14607476_1440_2560_60fps_bsr1oh.mp4" type="video/mp4" />
                    </video>
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Floating particles effect */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-tertiary/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>

                    {/* Hero content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14 z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="https://www.irctc.co.in/nget/assets/images/secondry-logo.png" alt="IRCTC" className="h-10 sm:h-14 object-contain drop-shadow-lg" onError={(e) => e.target.style.display='none'} />
                            <div className="h-8 w-px bg-white/30"></div>
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/70">Customer Care</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-3 leading-[1.1]" style={{textShadow: '0 2px 20px rgba(0,0,0,0.4)'}}>
                            {t.title}
                        </h1>
                        <p className="text-white/80 font-medium text-sm sm:text-lg max-w-2xl leading-relaxed" style={{textShadow: '0 1px 10px rgba(0,0,0,0.3)'}}>
                            {t.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <a href="tel:139" className="bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white/30 transition-all active:scale-95 border border-white/10">
                                <span className="material-symbols-outlined text-lg">call</span> {t.callBtn || 'Call 139'}
                            </a>
                            <a href="mailto:care@irctc.co.in" className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/30">
                                <span className="material-symbols-outlined text-lg">mail</span> {t.emailBtn || 'Email Us'}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* ===== CONTACT CARDS ===== */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                        {[
                            { icon: 'headset_mic', title: t.speakAgent, desc: t.speakDesc, value: '+91 139', color: 'primary', href: 'tel:139' },
                            { icon: 'mail', title: t.emailSupport, desc: t.emailDesc, value: 'care@irctc.co.in', color: 'secondary', href: 'mailto:care@irctc.co.in' },
                            { icon: 'chat', title: t.whatsapp, desc: t.whatsappDesc, value: '+91 9193 139 139', color: 'tertiary', href: '#' },
                            { icon: 'public', title: t.twitter, desc: t.twitterDesc, value: '@IRCTCofficial', color: 'primary', href: '#' },
                        ].map((card, i) => (
                            <a key={i} href={card.href} className="bg-surface-container-lowest p-6 sm:p-7 border border-outline-variant/10 rounded-2xl sm:rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group block">
                                <div className={`w-12 h-12 bg-${card.color}/10 text-${card.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined text-xl">{card.icon}</span>
                                </div>
                                <h3 className="text-lg font-extrabold mb-1.5 text-on-surface">{card.title}</h3>
                                <p className="text-on-surface-variant text-[13px] font-medium mb-4 leading-relaxed">{card.desc}</p>
                                <div className={`text-${card.color} font-bold text-sm tracking-wide`}>{card.value}</div>
                            </a>
                        ))}
                    </div>

                    {/* ===== MAIN CONTENT: FAQ + CHATBOT ===== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
                        {/* FAQ Section */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight mb-6 sm:mb-8">{t.faqTitle}</h2>
                            <div className="space-y-3">
                                {(t.faqs || []).map((faq, i) => (
                                    <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden transition-all duration-300">
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                            className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors"
                                        >
                                            <span className="text-sm sm:text-[15px] font-bold text-on-surface">{faq.q}</span>
                                            <span className={`material-symbols-outlined text-on-surface-variant text-lg shrink-0 transition-transform duration-300 ${expandedFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <p className="px-5 pb-5 text-sm text-on-surface-variant font-medium leading-relaxed">{faq.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chatbot */}
                        {isChatOpen ? (
                            <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_40px_rgba(20,29,30,0.06)] border border-outline-variant/10 flex flex-col h-[550px] sm:h-[600px] overflow-hidden animate-in">
                                <div className="bg-primary text-on-primary p-5 sm:p-6 flex justify-between items-center shrink-0 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                                    <div className="flex items-center gap-3 z-10">
                                        <div className="w-11 h-11 bg-surface text-primary rounded-full flex justify-center items-center shadow-md">
                                            <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-extrabold">{t.chatTitle}</h3>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                <span className="text-[10px] font-medium text-white/80 uppercase tracking-widest">Online</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsChatOpen(false)} className="z-10 p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-surface/50 scrollbar-hide">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-on-primary rounded-br-sm' : 'bg-surface-container text-on-surface rounded-bl-sm border border-outline-variant/10'}`}>
                                                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {messages.length === 1 && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {(t.quickReplies || []).map((reply, idx) => (
                                                <button key={idx} onClick={() => handleSendMessage(null, reply)} className="bg-surface-container-lowest border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full hover:bg-primary hover:text-on-primary transition-colors">
                                                    {reply}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                <form onSubmit={handleSendMessage} className="p-4 bg-surface-container-lowest border-t border-outline-variant/10">
                                    <div className="bg-surface-container-low rounded-xl flex items-center pr-2 focus-within:ring-2 ring-primary/30 transition-shadow">
                                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.inputPlaceholder} className="flex-1 bg-transparent border-none p-4 text-sm font-medium outline-none placeholder:text-on-surface-variant/50 focus:ring-0 text-on-surface" />
                                        <button type="submit" disabled={!input.trim()} className={`p-3 rounded-lg transition-all ${input.trim() ? 'bg-primary text-on-primary shadow-sm active:scale-95' : 'bg-surface-container-highest text-on-surface-variant/30 cursor-not-allowed'}`}>
                                            <span className="material-symbols-outlined text-lg">send</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div onClick={() => setIsChatOpen(true)} className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 flex items-center gap-5 p-6 hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer group">
                                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 shrink-0">
                                    <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-on-surface group-hover:text-primary transition-colors">{t.chatTitle}</h3>
                                    <p className="text-sm text-on-surface-variant">{t.openChatPrompt}</p>
                                </div>
                                <span className="material-symbols-outlined text-on-surface-variant ml-auto group-hover:translate-x-1 transition-transform">chevron_right</span>
                            </div>
                        )}
                    </div>

                    {/* ===== REGIONAL OFFICES ===== */}
                    <div className="mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight mb-6 sm:mb-8">{t.officeTitle}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(t.offices || []).map((office, i) => (
                                <div key={i} className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-primary text-lg">location_city</span>
                                        <h4 className="font-extrabold text-on-surface">{office.city}</h4>
                                    </div>
                                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-3">{office.addr}</p>
                                    <span className="text-xs font-bold text-primary">{office.phone}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===== EMERGENCY BANNER ===== */}
                    <div className="bg-gradient-to-r from-primary to-primary-container rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 text-white relative overflow-hidden mb-8">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-black mb-2">{t.emergencyTitle || 'Railway Emergency?'}</h3>
                                <p className="text-white/80 font-medium text-sm sm:text-base max-w-lg">{t.emergencyDesc || 'For security concerns, dial 182.'}</p>
                            </div>
                            <a href="tel:182" className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-white/90 transition-all active:scale-95 shadow-xl shrink-0">
                                <span className="material-symbols-outlined text-2xl">emergency</span> {t.emergencyBtn || 'Dial 182'}
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <ChatWidget />
        </div>
    );
};

export default Support;
