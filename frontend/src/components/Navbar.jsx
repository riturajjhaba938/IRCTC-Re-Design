import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import dummyData from '../data/irctc_dummy_data.json';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const navText = t('navbar');
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Function to check active link
    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const saved = localStorage.getItem('irctc-dark-mode');
        if (saved === 'true') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('irctc-dark-mode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('irctc-dark-mode', 'false');
        }
    };

    const navLinkBase = "font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors pb-1 text-on-surface-variant hover:text-primary border-b-[3px] border-transparent hover:border-primary-container";
    const navLinkActive = "font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors pb-1 text-primary border-b-[3px] border-primary-container";

    return (
        <header className="fixed top-0 w-full z-50 bg-[#ffffff]/90 dark:bg-[#0f1419]/90 backdrop-blur-2xl shadow-sm border-b border-surface-container-high/50 transition-all">
            <div className="flex justify-between items-center px-4 md:px-6 py-3 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    {location.pathname !== '/' && (
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface flex items-center justify-center active:scale-95">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                    )}
                    <Link to="/" className="flex items-center gap-3">
                        {/* Official IRCTC Logo */}
                        <img 
                            src="https://www.irctc.co.in/nget/assets/images/secondry-logo.png" 
                            alt="IRCTC Logo" 
                            className="h-10 object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="hidden items-center gap-3" style={{display: 'none'}}>
                            <span className="text-2xl font-black text-on-surface tracking-tighter font-headline">IRCTC</span>
                        </div>
                        {location.pathname === '/' && (
                            <>
                                <span className="h-6 w-[1px] bg-outline-variant/30 hidden md:block"></span>
                                <span className="text-xs font-bold tracking-tight text-on-surface-variant hidden md:block leading-none uppercase">{navText.brandSub || "Seamless Journey"}</span>
                            </>
                        )}
                    </Link>
                </div>
                
                <nav className="hidden lg:flex items-center gap-5 xl:gap-7 relative">
                    {/* TRAINS */}
                    <div className="relative group py-4">
                        <button className={isActive('/') || isActive('/search') || isActive('/booking') || isActive('/mytrips') || isActive('/pnrstatus') ? navLinkActive : navLinkBase}>
                            {navText.trains.title}
                            {(isActive('/') || isActive('/search') || isActive('/booking') || isActive('/mytrips') || isActive('/pnrstatus')) && (
                                <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-primary-container"></span>
                            )}
                        </button>
                        <div className="absolute top-[100%] left-0 w-72 bg-surface-container-lowest border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2 rounded-xl">
                            <Link to="/" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.trains.bookTicket}</Link>
                            <Link to="/mytrips" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{t('mytrips').title || 'My Trips'}</Link>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.foreignTourist}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.connectingJourney}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.cancelTicket}</span>
                            <Link to="/pnrstatus" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.trains.pnrEnquiry}</Link>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.trainSchedule}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.trackTrain}</span>
                            <div className="h-px w-full bg-outline-variant/20 my-1"></div>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.ftrBooking}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.linkAadhaar}</span>
                        </div>
                    </div>

                    {/* MEALS */}
                    <div className="relative group py-4">
                        <Link to="/meals" className={isActive('/meals') ? navLinkActive : navLinkBase}>
                            {navText.meals.title}
                        </Link>
                        <div className="absolute top-[100%] left-0 w-64 bg-surface-container-lowest border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2 rounded-xl">
                            <Link to="/meals" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.meals.ePantry}</Link>
                            <Link to="/meals" className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.meals.eCatering}</Link>
                            <Link to="/meals" className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.meals.cookedFood}</Link>
                        </div>
                    </div>

                    {/* E-WALLET */}
                    <div className="relative group py-4">
                        <Link to="/ewallet" className={isActive('/ewallet') ? navLinkActive : navLinkBase}>
                            {navText.eWallet.title}
                        </Link>
                        <div className="absolute top-[100%] left-0 w-64 bg-surface-container-lowest border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2 rounded-xl">
                            <Link to="/ewallet" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.eWallet.aboutWallet}</Link>
                            <Link to="/ewallet" className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.eWallet.walletGuide}</Link>
                        </div>
                    </div>

                    {/* ALERTS */}
                    <div className="relative py-4">
                        <Link to="/alerts" className={isActive('/alerts') ? navLinkActive : `${navLinkBase} group`}>
                            {navText.alerts}
                        </Link>
                    </div>

                    {/* OTHER SERVICES */}
                    <div className="relative group py-4">
                        <Link to="/services" className={isActive('/services') ? navLinkActive : navLinkBase}>
                            {navText.otherServices.title}
                        </Link>
                        <div className="absolute top-[100%] right-0 w-64 bg-surface-container-lowest border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2 rounded-xl">
                            <Link to="/services" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{t('services').title || 'Premium IRCTC Services'}</Link>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.irctcIpay}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.buses}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.flights}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.hotels}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.holidays}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.eWheelchair}</span>
                        </div>
                    </div>

                    {/* CONTACT US */}
                    <div className="relative py-4">
                        <Link to="/support" className={isActive('/support') ? navLinkActive : `${navLinkBase} group`}>
                            {navText.contactUs}
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center gap-3">
                    {/* Language Toggle */}
                    <div className="bg-surface-container-highest rounded-full p-1 flex items-center">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${language === 'en' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>EN</button>
                        <button onClick={() => setLanguage('hi')} className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${language === 'hi' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>हिं</button>
                    </div>
                    
                    {/* Dark Mode Toggle */}
                    <button 
                        onClick={toggleDarkMode} 
                        className="p-2 rounded-full hover:bg-surface-container-high transition-all active:scale-95 text-on-surface-variant hover:text-on-surface"
                        title={darkMode ? "Light Mode" : "Dark Mode"}
                    >
                        <span className="material-symbols-outlined text-xl" style={{fontVariationSettings: "'FILL' 1"}}>
                            {darkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <div className="hidden md:flex flex-col text-right mr-2">
                        <span className="text-sm font-bold text-primary">{dummyData.homepage.user_profile_summary.user_name}</span>
                        <span className="text-xs text-on-surface-variant">{navText.wallet}: ₹{dummyData.homepage.user_profile_summary.wallet_balance_inr}</span>
                    </div>
                    <Link to="/login" className="p-2 hover:bg-surface-container-high rounded-full transition-colors duration-300 active:scale-95">
                        <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>account_circle</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                        className="lg:hidden p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface"
                    >
                        <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-[60px] lg:top-[72px] bg-[#ffffff]/60 dark:bg-[#000000]/70 backdrop-blur-3xl z-40 h-screen transition-all animate-in fade-in">
                    <div className="bg-[#f0f2f5]/95 dark:bg-[#1a222c]/95 border-b border-outline-variant/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-y-auto max-h-[85vh] rounded-b-[2rem]">
                        <div className="flex flex-col p-6 space-y-3">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-5 py-4 rounded-2xl font-black text-on-surface hover:bg-primary/10 hover:text-primary transition-all active:scale-95 flex items-center justify-between border border-transparent hover:border-primary/20 shadow-sm shadow-primary/5">{navText.trains.title} <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
                            <Link to="/meals" onClick={() => setMobileMenuOpen(false)} className="px-5 py-4 rounded-2xl font-black text-on-surface hover:bg-primary/10 hover:text-primary transition-all active:scale-95 flex items-center justify-between border border-transparent hover:border-primary/20 shadow-sm shadow-primary/5">{navText.meals.title} <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
                            <Link to="/ewallet" onClick={() => setMobileMenuOpen(false)} className="px-5 py-4 rounded-2xl font-black text-on-surface hover:bg-primary/10 hover:text-primary transition-all active:scale-95 flex items-center justify-between border border-transparent hover:border-primary/20 shadow-sm shadow-primary/5">{navText.eWallet.title} <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
                            <Link to="/alerts" onClick={() => setMobileMenuOpen(false)} className="px-5 py-4 rounded-2xl font-black text-on-surface hover:bg-primary/10 hover:text-primary transition-all active:scale-95 flex items-center justify-between border border-transparent hover:border-primary/20 shadow-sm shadow-primary/5">{navText.alerts} <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
                            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="px-5 py-4 rounded-2xl font-black text-on-surface hover:bg-primary/10 hover:text-primary transition-all active:scale-95 flex items-center justify-between border border-transparent hover:border-primary/20 shadow-sm shadow-primary/5">{navText.otherServices.title} <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
                            <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="px-5 py-4 rounded-2xl font-black text-on-surface hover:bg-primary/10 hover:text-primary transition-all active:scale-95 flex items-center justify-between border border-transparent hover:border-primary/20 shadow-sm shadow-primary/5">{navText.contactUs} <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
