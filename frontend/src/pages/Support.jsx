import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dummyData from '../data/irctc_dummy_data.json';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const translations = {
    en: {
        title: "Help & Support",
        subtitle: "24/7 Premium customer resolution center. Reach out to us via call, chat, or designated email branches.",
        speakAgent: "Speak to an Agent",
        speakDesc: "Call our dedicated premium support line anytime.",
        emailSupport: "Email Support",
        emailDesc: "For document submissions, partnership queries, and escalations.",
        chatTitle: "IRCTC Digital Assistant Disha",
        chatPlaceholder: "Type your query here...",
        send: "Send",
        botGreeting: "Welcome to IRCTC Support. I am Disha. How can I assist you today?",
        quickReplies: ["Book Ticket", "Check PNR Status", "Cancel Ticket", "Refund Status"],
        openChatPrompt: "Need help? Click here to chat with Disha",
        defaultReplies: [
            "We are experiencing high passenger volume on some routes. Please ensure you carry valid ID proof during travel.",
            "For account access issues, please verify your registered email ID.",
            "You can cancel your ticket from the 'My Trips' section.",
            "Please call +91 139 for immediate assistance regarding your train schedule."
        ]
    },
    hi: {
        title: "मदद और सहायता",
        subtitle: "24/7 प्रीमियम ग्राहक समाधान केंद्र। कॉल, चैट या ईमेल के माध्यम से हमसे संपर्क करें।",
        speakAgent: "एजेंट से बात करें",
        speakDesc: "किसी भी समय हमारी समर्पित प्रीमियम सपोर्ट लाइन पर कॉल करें।",
        emailSupport: "ईमेल सहायता",
        emailDesc: "दस्तावेज़ जमा करने, साझेदारी के प्रश्नों और मामलों के लिए।",
        chatTitle: "IRCTC डिजिटल असिस्टेंट दिशा",
        chatPlaceholder: "अपना प्रश्न यहाँ लिखें...",
        send: "भेजें",
        botGreeting: "IRCTC सहायता में आपका स्वागत है। मैं दिशा हूँ। आज मैं आपकी कैसे मदद कर सकती हूँ?",
        quickReplies: ["टिकट बुक करें", "PNR स्टेटस जांचें", "टिकट रद्द करें", "रिफंड स्थिति"],
        openChatPrompt: "मदद चाहिए? दिशा से चैट करने के लिए यहां क्लिक करें",
        defaultReplies: [
            "कुछ मार्गों पर यात्रियों की संख्या अधिक है। यात्रा के दौरान कृपया अपना वैध पहचान पत्र साथ रखें।",
            "खाता पहुँच समस्याओं के लिए, कृपया अपनी पंजीकृत ईमेल आईडी सत्यापित करें।",
            "आप 'My Trips' अनुभाग से अपना टिकट रद्द कर सकते हैं।",
            "ट्रेन अनुसूची के संबंध में तत्काल सहायता के लिए कृपया +91 139 पर कॉल करें।"
        ]
    }
};

const Support = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Function to check active link
    const isActive = (path) => location.pathname === path;

    const { language: lang, setLanguage: setLang } = useLanguage();
    const [messages, setMessages] = useState([{ sender: 'bot', text: translations[lang]?.botGreeting || translations['en']?.botGreeting }]);
    const [input, setInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(true);
    const messagesEndRef = useRef(null);

    const t = translations[lang];

    // Scroll chat to bottom when updated
    useEffect(() => {
        if (isChatOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isChatOpen]);

    // Update greeting when language switches (if chat is fresh, optionally we can leave old messages)
    useEffect(() => {
        if (messages.length === 1 && messages[0].sender === 'bot') {
            setMessages([{ sender: 'bot', text: translations[lang].botGreeting }]);
        }
    }, [lang]);

    const handleSendMessage = (e, overrideText = null) => {
        if (e) e.preventDefault();
        const messageText = overrideText || input;
        if (!messageText.trim()) return;

        // Add User Message
        const newMessages = [...messages, { sender: 'user', text: messageText }];
        setMessages(newMessages);
        setInput('');

        // Simulate Bot Reply
        setTimeout(() => {
            const botReply = t.defaultReplies[Math.floor(Math.random() * t.defaultReplies.length)];
            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        }, 800);
    };

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col justify-center mb-12 lg:mb-0">
                    <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-4 capitalize">{t.title}</h1>
                    <p className="text-on-surface-variant font-medium text-lg max-w-xl mb-12">{t.subtitle}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 rounded-[2rem] shadow-sm transform transition-all hover:shadow-md hover:-translate-y-1">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">headset_mic</span>
                            </div>
                            <h3 className="text-xl font-black mb-2">{t.speakAgent}</h3>
                            <p className="text-on-surface-variant mb-6 text-sm">{t.speakDesc}</p>
                            <div className="text-2xl font-black text-primary tracking-widest">+91 139</div>
                        </div>
                        
                        <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 rounded-[2rem] shadow-sm transform transition-all hover:shadow-md hover:-translate-y-1">
                            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined">mail</span>
                            </div>
                            <h3 className="text-xl font-black mb-2">{t.emailSupport}</h3>
                            <p className="text-on-surface-variant mb-6 text-sm">{t.emailDesc}</p>
                            <div className="text-md font-bold text-secondary truncate" title="care@irctc.co.in">care@irctc.co.in</div>
                        </div>
                    </div>
                </div>

                {/* Chatbot Interface */}
                {isChatOpen ? (
                    <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_40px_rgba(20,29,30,0.06)] border border-outline-variant/10 flex flex-col h-[600px] overflow-hidden">
                        {/* Chat Header */}
                        <div className="bg-primary text-on-primary p-6 flex flex-col justify-between items-start shrink-0 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                            <div className="flex items-start justify-between w-full z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-surface text-primary rounded-full flex justify-center items-center shadow-md">
                                        <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black">{t.chatTitle}</h3>
                                        <div className="flex items-center gap-2 mt-1 -ml-1">
                                            <span className="w-2 h-2 rounded-full bg-[#10B981] ml-1 animate-pulse"></span>
                                            <span className="text-xs font-medium text-white/80">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95 flex items-center justify-center aria-label='Close chat'">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface/50">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-on-primary rounded-br-sm shadow-sm' : 'bg-surface-container text-on-surface rounded-bl-sm border border-outline-variant/10 shadow-sm'}`}>
                                        <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Quick Replies */}
                            {messages.length === 1 && (
                                <div className="flex flex-wrap gap-2 pt-2 pb-2">
                                    {t.quickReplies.map((reply, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSendMessage(null, reply)}
                                            className="bg-surface-container-lowest border border-primary/30 text-primary text-xs font-bold px-4 py-2 rounded-full hover:bg-primary hover:text-on-primary transition-colors focus:outline-none"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={(e) => handleSendMessage(e)} className="p-4 bg-surface-container-lowest border-t border-outline-variant/10 relative">
                            <div className="bg-surface-container-low rounded-xl flex items-center pr-2 focus-within:ring-2 ring-primary/30 transition-shadow">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t.chatPlaceholder}
                                    className="flex-1 bg-transparent border-none p-4 text-sm font-medium outline-none placeholder:text-on-surface-variant/50 focus:ring-0"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className={`p-3 rounded-lg flex items-center justify-center transition-all ${input.trim() ? 'bg-primary text-on-primary shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95' : 'bg-surface-container-highest text-on-surface-variant/30 cursor-not-allowed'}`}
                                >
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div 
                        onClick={() => setIsChatOpen(true)}
                        className="bg-surface-container-lowest rounded-[2rem] shadow-sm border border-outline-variant/10 flex flex-col justify-center items-center h-[600px] hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex justify-center items-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                            <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>smart_toy</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-on-surface group-hover:text-primary transition-colors">{t.chatTitle}</h3>
                        <p className="text-on-surface-variant font-medium text-center px-6">{t.openChatPrompt}</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Support;
