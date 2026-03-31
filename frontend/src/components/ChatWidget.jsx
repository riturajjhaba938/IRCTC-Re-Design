import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const chatTranslations = {
    en: {
        chatTitle: "IRCTC Assistant Disha",
        chatPlaceholder: "Type your query here...",
        send: "Send",
        botGreeting: "Welcome to IRCTC Support! I am Disha. How can I assist you today?",
        quickRepliesTitle: "Suggested Queries:",
        followUpText: "Was this helpful? Ask another question:",
        teaserText: "Hi! Need help booking? 👋",
        quickReplies: [
            { id: "book", label: "Book Ticket" },
            { id: "pnr", label: "Check PNR Status" },
            { id: "cancel", label: "Cancel Ticket" },
            { id: "food", label: "Order Food" },
            { id: "refund", label: "Refund Status" },
            { id: "tatkal", label: "Tatkal Booking" },
            { id: "schedule", label: "Train Schedule" },
            { id: "seat", label: "Seat Availability" },
            { id: "platform", label: "Platform Info" },
            { id: "ewallet", label: "E-Wallet" },
            { id: "wheelchair", label: "Wheelchair Service" },
            { id: "waitlist", label: "Waitlist / RAC" }
        ],
        responses: {
            book: "To book a ticket:\n1. Enter origin & destination on the homepage search\n2. Select date, class (AC/Sleeper) & quota\n3. Click 'Search Trains' → choose your train\n4. Fill passenger details & pay securely\n\nTatkal booking opens at 10 AM (AC) and 11 AM (Non-AC).",
            pnr: "To check PNR status:\n1. Go to 'PNR Status' from the main menu\n2. Enter your 10-digit PNR number\n3. View confirmation status, coach & berth details\n\nYou can also check via SMS: Send PNR <number> to 139.",
            cancel: "To cancel a ticket:\n1. Go to 'My Trips' in the main menu\n2. Select your booking → Click 'Cancel'\n3. Refund processes within 3-5 business days\n\nCancellation charges apply based on class and timing.",
            food: "To order food on your train:\n1. Go to 'E-Catering' under Services\n2. Enter your PNR or train number\n3. Browse restaurants at upcoming stations\n4. Order & pay — food delivered to your seat!\n\nAvailable on 450+ trains across India.",
            refund: "Refund timelines after cancellation:\n• Online payment: 3-5 business days\n• Counter ticket: Collect from station\n• Tatkal confirmed: No refund\n• RAC/Waitlist Tatkal: Refund applicable\n\nTrack refund at irctc.co.in → My Transactions.",
            tatkal: "Tatkal booking rules:\n• AC classes: Opens at 10:00 AM, one day before journey\n• Non-AC classes: Opens at 11:00 AM\n• Premium Tatkal: Dynamic pricing, no cancellation\n• Max 4 passengers per PNR\n• Valid ID proof mandatory during travel",
            schedule: "To check train schedule:\n1. Use 'Train Status' from the menu\n2. Enter train number or name\n3. View stops, arrival/departure times\n\nFor live running status, dial 139 or visit enquiry.indianrail.gov.in.",
            seat: "To check seat availability:\n1. Search trains on the homepage\n2. Available seats shown per class (1A/2A/3A/SL/GN)\n3. Color codes: Green (Available), Yellow (RAC), Red (Waitlisted)\n\nCheck 120 days in advance for regular booking.",
            platform: "To find your platform number:\n1. Check your ticket — platform may be printed\n2. Use NTES app or enquiry.indianrail.gov.in\n3. SMS: SPOT <train number> to 139\n4. Check display boards at the station\n\nPlatform info is usually available 2-4 hours before arrival.",
            ewallet: "IRCTC E-Wallet:\n1. Go to 'E-Wallet' under Services to register\n2. Load money via UPI, Net Banking, or Debit Card\n3. Use wallet balance for faster checkout\n\nMax balance: ₹10,000 | Min recharge: ₹100\nFor issues: care@irctc.co.in",
            wheelchair: "E-Wheelchair service:\n1. Go to 'Other Services' → 'E-Wheelchair'\n2. Enter PNR & select station\n3. Available at 27+ major stations\n4. Book up to 12 hours before train arrival\n\nFree for senior citizens & Divyangjan. Nominal charge for others.",
            waitlist: "Waitlist (WL) & RAC explained:\n• RAC: You get a shared berth — confirmed travel\n• WL: No berth yet — depends on cancellations\n• WL auto-cancels if not confirmed by chart preparation\n• Chart prepared ~4 hours before departure\n\nCheck status: PNR Status page or SMS PNR <number> to 139.",
            default: "I'm still learning! For complex queries, please call our 24/7 support at +91 139 or email care@irctc.co.in. Here are some topics I can help with:"
        }
    },
    hi: {
        chatTitle: "IRCTC असिस्टेंट दिशा",
        chatPlaceholder: "अपना प्रश्न यहाँ लिखें...",
        send: "भेजें",
        botGreeting: "IRCTC सहायता में आपका स्वागत है! मैं दिशा हूँ। आज मैं आपकी कैसे मदद कर सकती हूँ?",
        quickRepliesTitle: "सुझाए गए प्रश्न:",
        followUpText: "क्या यह सहायक था? एक और प्रश्न पूछें:",
        teaserText: "नमस्ते! बुकिंग में मदद चाहिए? 👋",
        quickReplies: [
            { id: "book", label: "टिकट बुक करें" },
            { id: "pnr", label: "PNR स्टेटस जांचें" },
            { id: "cancel", label: "टिकट रद्द करें" },
            { id: "food", label: "खाना ऑर्डर करें" },
            { id: "refund", label: "रिफंड स्थिति" },
            { id: "tatkal", label: "तत्काल बुकिंग" },
            { id: "schedule", label: "ट्रेन शेड्यूल" },
            { id: "seat", label: "सीट उपलब्धता" },
            { id: "platform", label: "प्लेटफॉर्म जानकारी" },
            { id: "ewallet", label: "ई-वॉलेट" },
            { id: "wheelchair", label: "व्हीलचेयर सेवा" },
            { id: "waitlist", label: "वेटलिस्ट / RAC" }
        ],
        responses: {
            book: "टिकट बुक करने के लिए:\n1. होमपेज पर गंतव्य और प्रस्थान दर्ज करें\n2. तिथि, श्रेणी और कोटा चुनें\n3. 'ट्रेन खोजें' पर क्लिक करें\n4. यात्री विवरण भरें और भुगतान करें\n\nतत्काल: AC 10 AM, Non-AC 11 AM खुलता है।",
            pnr: "PNR स्टेटस जांचने के लिए:\n1. मुख्य मेनू से 'PNR स्टेटस' पर जाएं\n2. 10 अंकों का PNR नंबर दर्ज करें\n3. कोच और बर्थ विवरण देखें\n\nSMS: PNR <नंबर> 139 पर भेजें।",
            cancel: "टिकट रद्द करने के लिए:\n1. 'मेरी यात्राएं' पर जाएं\n2. बुकिंग चुनें → 'रद्द करें' पर क्लिक करें\n3. रिफंड 3-5 कार्यदिवसों में\n\nरद्दीकरण शुल्क लागू होंगे।",
            food: "ट्रेन में खाना ऑर्डर करने के लिए:\n1. सेवाओं में 'ई-कैटरिंग' पर जाएं\n2. PNR या ट्रेन नंबर दर्ज करें\n3. रेस्तरां चुनें और ऑर्डर करें\n\n450+ ट्रेनों पर उपलब्ध।",
            refund: "रिफंड की समयसीमा:\n• ऑनलाइन: 3-5 कार्यदिवस\n• तत्काल कन्फर्म: कोई रिफंड नहीं\n• RAC/WL तत्काल: रिफंड लागू\n\nirctc.co.in → मेरे लेनदेन पर ट्रैक करें।",
            tatkal: "तत्काल बुकिंग नियम:\n• AC: सुबह 10:00 बजे खुलती है\n• Non-AC: सुबह 11:00 बजे\n• अधिकतम 4 यात्री प्रति PNR\n• यात्रा में वैध पहचान पत्र अनिवार्य",
            schedule: "ट्रेन शेड्यूल जानने के लिए:\n1. मेनू से 'ट्रेन स्टेटस' पर जाएं\n2. ट्रेन नंबर दर्ज करें\n3. स्टॉप और समय देखें\n\nलाइव स्थिति: 139 पर डायल करें।",
            seat: "सीट उपलब्धता:\n1. होमपेज पर ट्रेन खोजें\n2. प्रत्येक श्रेणी में उपलब्ध सीटें दिखाई देंगी\n3. हरा: उपलब्ध, पीला: RAC, लाल: वेटलिस्ट\n\n120 दिन पहले से बुकिंग करें।",
            platform: "प्लेटफॉर्म नंबर जानने के लिए:\n1. NTES ऐप का उपयोग करें\n2. SMS: SPOT <ट्रेन नंबर> 139 पर\n3. स्टेशन पर डिस्प्ले बोर्ड देखें\n\nआमतौर पर आगमन से 2-4 घंटे पहले उपलब्ध।",
            ewallet: "IRCTC ई-वॉलेट:\n1. सेवाओं में 'ई-वॉलेट' पर जाएं\n2. UPI/नेट बैंकिंग से रिचार्ज करें\n3. तेज़ चेकआउट के लिए उपयोग करें\n\nअधिकतम: ₹10,000 | न्यूनतम: ₹100",
            wheelchair: "ई-व्हीलचेयर सेवा:\n1. 'अन्य सेवाएं' → 'ई-व्हीलचेयर'\n2. PNR और स्टेशन चुनें\n3. 27+ प्रमुख स्टेशनों पर उपलब्ध\n\nवरिष्ठ नागरिकों के लिए निःशुल्क।",
            waitlist: "वेटलिस्ट (WL) और RAC:\n• RAC: साझा बर्थ — यात्रा पक्की\n• WL: अभी बर्थ नहीं — रद्दीकरण पर निर्भर\n• चार्ट प्रस्थान से ~4 घंटे पहले\n\nPNR स्टेटस पेज पर जांचें।",
            default: "मैं अभी भी सीख रही हूँ! जटिल प्रश्नों के लिए, कृपया +91 139 पर कॉल करें। यहाँ कुछ विषय हैं जिनमें मैं मदद कर सकती हूँ:"
        }
    }
};

const ChatWidget = () => {
    const { language: lang } = useLanguage();
    const t = chatTranslations[lang] || chatTranslations['en'];

    const [isOpen, setIsOpen] = useState(false);
    const [showTeaser, setShowTeaser] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: chatTranslations[lang]?.botGreeting || chatTranslations['en'].botGreeting }]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const teaserTimerRef = useRef(null);

    // Show teaser popup after 2s delay, auto-dismiss after 6s
    useEffect(() => {
        teaserTimerRef.current = setTimeout(() => {
            if (!isOpen) setShowTeaser(true);
        }, 2000);
        return () => clearTimeout(teaserTimerRef.current);
    }, []);

    useEffect(() => {
        if (showTeaser) {
            const dismiss = setTimeout(() => setShowTeaser(false), 6000);
            return () => clearTimeout(dismiss);
        }
    }, [showTeaser]);

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
        const keywords = {
            book: ['book', 'ticket', 'बुक', 'टिकट', 'reserve'],
            pnr: ['pnr', 'status', 'स्टेटस', 'पीएनआर'],
            cancel: ['cancel', 'रद्द', 'cancellation'],
            food: ['food', 'meal', 'खाना', 'भोजन', 'catering', 'eat'],
            refund: ['refund', 'रिफंड', 'money back', 'पैसे वापस'],
            tatkal: ['tatkal', 'तत्काल', 'premium', 'urgent'],
            schedule: ['schedule', 'time', 'timing', 'शेड्यूल', 'समय', 'running'],
            seat: ['seat', 'availability', 'available', 'सीट', 'उपलब्ध', 'berth', 'बर्थ'],
            platform: ['platform', 'प्लेटफॉर्म', 'which platform', 'कौन सा'],
            ewallet: ['wallet', 'e-wallet', 'ewallet', 'वॉलेट', 'balance', 'recharge'],
            wheelchair: ['wheelchair', 'व्हीलचेयर', 'disability', 'divyang', 'दिव्यांग'],
            waitlist: ['waitlist', 'waiting', 'rac', 'wl', 'वेटलिस्ट', 'प्रतीक्षा']
        };
        for (const [key, words] of Object.entries(keywords)) {
            if (words.some(w => lowerText.includes(w))) return t.responses[key];
        }
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

    const handleOpenChat = () => {
        setIsOpen(true);
        setShowTeaser(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div className={`pointer-events-auto transition-all duration-500 ease-out origin-bottom-right ${isOpen ? 'scale-100 opacity-100 mb-4' : 'scale-75 opacity-0 invisible mb-0 h-0 w-0'}`}>
                <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_60px_rgba(20,29,30,0.15)] border border-outline-variant/10 flex flex-col h-[520px] w-[370px] md:w-[410px] overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary text-on-primary p-5 flex justify-between items-center shrink-0 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="flex items-center gap-3 z-10">
                            <div className="w-10 h-10 bg-surface text-primary rounded-full flex justify-center items-center shadow-md">
                                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>support_agent</span>
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
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in`}>
                                <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user' ? 'bg-primary text-on-primary rounded-tr-sm' : 'bg-surface-container-low text-on-surface rounded-tl-sm border border-outline-variant/10'}`}>
                                    <p className="text-[14px] leading-relaxed whitespace-pre-line">{msg.text}</p>
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

                        {/* Follow-up suggestions after every bot response */}
                        {messages[messages.length - 1]?.sender === 'bot' && !isTyping && (
                            <div className="pt-2 pb-1">
                                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3 px-1">
                                    {messages.length > 1 ? t.followUpText : t.quickRepliesTitle}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {t.quickReplies.map((reply, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => handleSendMessage(null, reply.id, reply.label)}
                                            className="text-[12px] bg-secondary-fixed/50 hover:bg-secondary-fixed text-on-secondary-fixed font-bold py-2 px-3.5 rounded-full transition-all active:scale-95 shadow-sm border border-secondary/10"
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

            {/* Teaser Popup Bubble */}
            {!isOpen && showTeaser && (
                <div 
                    className="pointer-events-auto mb-3 bg-surface-container-lowest text-on-surface rounded-2xl rounded-br-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-4 py-3 cursor-pointer hover:shadow-lg transition-all animate-in border border-outline-variant/10 max-w-[220px]"
                    onClick={handleOpenChat}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-primary material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>waving_hand</span>
                        <p className="text-[13px] font-bold leading-snug">{t.teaserText}</p>
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[12px]">close</span>
                    </button>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <div className="pointer-events-auto flex flex-col items-center gap-2 group cursor-pointer" onClick={handleOpenChat}>
                    <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-primary shadow-[0_8px_20px_rgba(163,62,0,0.3)] flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-2xl text-on-primary" style={{fontVariationSettings: "'FILL' 1"}}>support_agent</span>
                        </div>
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-surface animate-pulse"></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
