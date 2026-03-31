import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import dummyData from '../data/irctc_dummy_data.json';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();
    const navText = t('navbar');
    
    // Function to check active link
    const isActive = (path) => location.pathname === path;

    return (
        <header className="fixed top-0 w-full z-50 bg-[#f2fbfc]/80 backdrop-blur-md shadow-[0_20px_40px_rgba(20,29,30,0.06)] border-b border-surface-container-low transition-all">
            <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    {location.pathname !== '/' && (
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface flex items-center justify-center active:scale-95">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                    )}
                    <Link to="/" className="text-2xl font-black text-[#141d1e] tracking-tighter flex items-center gap-4">
                        <span className="font-headline">{navText.brandName || "IRCTC"}</span>
                        {location.pathname === '/' && (
                            <>
                                <span className="h-4 w-[1px] bg-outline-variant/30 hidden md:block"></span>
                                <span className="text-xs font-bold tracking-tighter text-on-surface-variant hidden md:block leading-none uppercase">{navText.brandSub || "Seamless Journey"}</span>
                            </>
                        )}
                    </Link>
                </div>
                
                <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-['Inter'] relative">
                    {/* TRAINS */}
                    <div className="relative group py-4">
                        <button className={`font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors ${isActive('/') || isActive('/search') || isActive('/booking') || isActive('/mytrips') || isActive('/pnrstatus') ? 'text-[#a33e00] border-b-[3px] border-[#ff6600] pb-1' : 'text-[#5a4136] hover:text-[#a33e00] border-b-[3px] border-transparent pb-1'}`}>
                            {navText.trains.title}
                            {(isActive('/') || isActive('/search') || isActive('/booking') || isActive('/mytrips') || isActive('/pnrstatus')) && (
                                <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#ff6600]"></span>
                            )}
                        </button>
                        <div className="absolute top-[100%] left-0 w-72 bg-white border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2">
                            <Link to="/" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.trains.bookTicket}</Link>
                            <Link to="/mytrips" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{t('mytrips').title || 'My Trips'}</Link>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.foreignTourist}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.connectingJourney}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors flex justify-between items-center cursor-pointer">{navText.trains.irctcTrains} <span className="material-symbols-outlined text-sm">arrow_right</span></span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.cancelTicket}</span>
                            <Link to="/pnrstatus" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">{navText.trains.pnrEnquiry}</Link>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.trainSchedule}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.trackTrain}</span>
                            <div className="h-px w-full bg-outline-variant/20 my-1"></div>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.ftrBooking}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.dogsCats}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.linkAadhaar}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.counterCancel}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.trains.counterBoarding}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors flex justify-between items-center cursor-pointer">{navText.trains.mobileApps} <span className="material-symbols-outlined text-sm">arrow_right</span></span>
                        </div>
                    </div>

                    {/* MEALS */}
                    <div className="relative group py-4">
                        <button className="font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors text-[#5a4136] hover:text-[#a33e00] border-b-[3px] border-transparent hover:border-[#ff6600] pb-1">
                            {navText.meals.title}
                            <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent group-hover:border-b-[#ff6600] transition-colors"></span>
                        </button>
                        <div className="absolute top-[100%] left-0 w-64 bg-white border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2">
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.meals.ePantry}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.meals.eCatering}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.meals.cookedFood}</span>
                        </div>
                    </div>

                    {/* E-WALLET */}
                    <div className="relative group py-4">
                        <button className="font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors text-[#5a4136] hover:text-[#a33e00] border-b-[3px] border-transparent hover:border-[#ff6600] pb-1">
                            {navText.eWallet.title}
                            <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent group-hover:border-b-[#ff6600] transition-colors"></span>
                        </button>
                        <div className="absolute top-[100%] left-0 w-64 bg-white border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2">
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.eWallet.aboutWallet}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.eWallet.walletGuide}</span>
                        </div>
                    </div>

                    {/* ALERTS */}
                    <div className="relative py-4">
                        <Link to="#" className="font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors text-[#5a4136] hover:text-[#a33e00] border-b-[3px] border-transparent hover:border-[#ff6600] pb-1 group">
                            {navText.alerts}
                            <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent group-hover:border-b-[#ff6600] transition-colors"></span>
                        </Link>
                    </div>

                    {/* OTHER SERVICES */}
                    <div className="relative group py-4">
                        <button className={`font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors ${isActive('/services') ? 'text-[#a33e00] border-b-[3px] border-[#ff6600] pb-1' : 'text-[#5a4136] hover:text-[#a33e00] border-b-[3px] border-transparent group-hover:border-[#ff6600] pb-1'}`}>
                            {navText.otherServices.title}
                            <span className={`absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] transition-colors ${isActive('/services') ? 'border-transparent border-b-[#ff6600]' : 'border-transparent group-hover:border-b-[#ff6600]'}`}></span>
                        </button>
                        <div className="absolute top-[100%] left-0 w-64 bg-white border border-outline-variant/20 shadow-[0_10px_40px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 flex flex-col py-2">
                            <Link to="/services" className="px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-primary/5 hover:text-primary transition-colors">Premium IRCTC Services</Link>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.irctcIpay}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.buses}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.flights}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.hotels}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors flex justify-between items-center cursor-pointer">{navText.otherServices.holidays} <span className="material-symbols-outlined text-sm">arrow_right</span></span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">{navText.otherServices.eWheelchair}</span>
                            <span className="px-5 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/5 hover:text-primary transition-colors flex justify-between items-center cursor-pointer">{navText.otherServices.promotions} <span className="material-symbols-outlined text-sm">arrow_right</span></span>
                        </div>
                    </div>

                    {/* CONTACT US */}
                    <div className="relative py-4">
                        <Link to="/support" className={`font-bold tracking-tight uppercase flex flex-col items-center justify-center relative transition-colors ${isActive('/support') ? 'text-[#a33e00] border-b-[3px] border-[#ff6600] pb-1' : 'text-[#5a4136] hover:text-[#a33e00] border-b-[3px] border-transparent hover:border-[#ff6600] pb-1 group'}`}>
                            {navText.contactUs}
                            <span className={`absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] transition-colors ${isActive('/support') ? 'border-transparent border-b-[#ff6600]' : 'border-transparent group-hover:border-b-[#ff6600]'}`}></span>
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="bg-surface-container-highest rounded-full p-1 flex items-center mr-2">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${language === 'en' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>EN</button>
                        <button onClick={() => setLanguage('hi')} className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${language === 'hi' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>हिं</button>
                    </div>
                    <div className="hidden md:flex flex-col text-right mr-4">
                        <span className="text-sm font-bold text-primary">{dummyData.homepage.user_profile_summary.user_name}</span>
                        <span className="text-xs text-on-surface-variant">{navText.wallet}: ₹{dummyData.homepage.user_profile_summary.wallet_balance_inr}</span>
                    </div>
                    <Link to="/login" className="p-2 hover:bg-[#ecf5f6] rounded-full transition-colors duration-300 active:scale-95">
                        <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>account_circle</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
