import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dummyData from '../data/irctc_dummy_data.json';
import Navbar from '../components/Navbar';
import ChatWidget from '../components/ChatWidget';
import { useLanguage } from '../context/LanguageContext';

const Homepage = () => {
    const { homepage, train_search_form } = dummyData;
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const hpText = t('homepage');
    
    // Function to check active link
    const isActive = (path) => location.pathname === path;
    
    // Search form state
    const [fromStation, setFromStation] = useState('Ahmedabad Junction (ADI)');
    const [toStation, setToStation] = useState('New Delhi (NDLS)');
    const [date, setDate] = useState('12 Apr, 2026');

    const handleSwap = () => {
        setFromStation(toStation);
        setToStation(fromStation);
    };

    const handleSearch = () => {
        navigate('/search');
    };

    return (
        <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
            <Navbar />

            <main className="pt-24 pb-32">
                {/* Hero Section */}
                <section className="relative px-6 py-20 md:py-28 overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem] mb-12 shadow-sm border-b border-outline-variant/10">
                    <div className="absolute inset-0 z-0">
                        <img src="/vande_bharat_bg.png" alt="Vande Bharat Express" className="w-full h-full object-cover object-center" />
                        <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface"></div>
                    </div>
                    <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-black text-on-surface -tracking-[0.03em] mb-6 leading-tight drop-shadow-md">
                            {hpText.heroTitle || 'Book Your Train Ticket Seamlessly'}
                        </h1>
                        <p className="text-on-surface-variant max-w-xl mx-auto text-lg md:text-xl font-medium opacity-90 drop-shadow-sm">
                            Premium rail experiences curated for the modern traveller. Fast, seamless, and unmistakably Indian.
                        </p>
                    </div>

                    {/* Search Card Bento-style */}
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-surface-container-low rounded-[2rem] p-8 md:p-10 shadow-[0_20px_40px_rgba(20,29,30,0.06)] relative">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                                {/* From/To */}
                                <div className="md:col-span-5 flex items-center gap-4 relative">
                                    <div className="flex-1 group">
                                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 ml-1">{hpText.fromLabel || 'From'}</label>
                                        <div className="bg-surface-container-lowest p-5 rounded-2xl transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-primary/20">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary/60">location_on</span>
                                                <input 
                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-xl outline-none placeholder:text-on-surface-variant/40" 
                                                    placeholder="Departure City" 
                                                    type="text" 
                                                    value={fromStation}
                                                    onChange={e => setFromStation(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleSwap} className="z-20 -mx-4 w-12 h-12 flex items-center justify-center bg-surface-container-lowest rounded-full shadow-lg text-primary hover:rotate-180 transition-all duration-500 active:scale-90 border-4 border-surface-container-low shrink-0">
                                        <span className="material-symbols-outlined text-2xl">swap_horiz</span>
                                    </button>
                                    <div className="flex-1 group">
                                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 ml-1 text-right">{hpText.toLabel || 'To'}</label>
                                        <div className="bg-surface-container-lowest p-5 rounded-2xl transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-primary/20">
                                            <div className="flex items-center gap-3 justify-end text-right">
                                                <input 
                                                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-xl text-right outline-none placeholder:text-on-surface-variant/40" 
                                                    placeholder="Arrival City" 
                                                    type="text" 
                                                    value={toStation}
                                                    onChange={e => setToStation(e.target.value)}
                                                />
                                                <span className="material-symbols-outlined text-primary/60">near_me</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="md:col-span-3 group">
                                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 ml-1">{hpText.dateLabel || 'Date'}</label>
                                    <div className="bg-surface-container-lowest p-5 rounded-2xl transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-primary/20">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary/60">calendar_today</span>
                                            <input 
                                                className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-xl outline-none" 
                                                type="text" 
                                                value={date}
                                                onChange={e => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Class & Quota */}
                                <div className="md:col-span-4 grid grid-cols-2 gap-4">
                                    <div className="group">
                                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 ml-1 text-nowrap">{hpText.classLabel || 'Class'}</label>
                                        <div className="bg-surface-container-lowest p-5 rounded-2xl">
                                            <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-lg cursor-pointer outline-none">
                                                <option>All Classes</option>
                                                <option>AC First Class</option>
                                                <option>AC 2 Tier</option>
                                                <option>AC 3 Tier</option>
                                                <option>Sleeper</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2 ml-1 text-nowrap">{hpText.quotaLabel || 'Quota'}</label>
                                        <div className="bg-surface-container-lowest p-5 rounded-2xl">
                                            <select className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-lg cursor-pointer outline-none">
                                                <option>General</option>
                                                <option>Ladies</option>
                                                <option>Tatkal</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Options */}
                                <div className="md:col-span-12 flex flex-wrap gap-x-8 gap-y-4 my-2">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="avail_tickets" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest cursor-pointer accent-primary" />
                                        <label htmlFor="avail_tickets" className="text-[13px] font-bold text-on-surface-variant uppercase tracking-wide cursor-pointer select-none">{hpText.filters?.available || 'Train with Available Tickets'}</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="pwd_concession" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest cursor-pointer accent-primary" />
                                        <label htmlFor="pwd_concession" className="text-[13px] font-bold text-on-surface-variant uppercase tracking-wide cursor-pointer select-none">{hpText.filters?.pwd || 'Person With Disability Concession'}</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="flex_date" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest cursor-pointer accent-primary" />
                                        <label htmlFor="flex_date" className="text-[13px] font-bold text-on-surface-variant uppercase tracking-wide cursor-pointer select-none">{hpText.filters?.flexible || 'Flexible With Date'}</label>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="md:col-span-12 mt-4">
                                    <button onClick={handleSearch} className="w-full kinetic-gradient text-white py-6 rounded-2xl font-black text-xl uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(163,62,0,0.3)] hover:shadow-[0_15px_30px_rgba(163,62,0,0.4)] transition-all duration-300 active:scale-[0.98]">
                                        {hpText.searchBtn || 'Search Trains'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-6 mt-12 space-y-16">
                    {/* Recent Searches */}
                    <div>
                        <div className="flex items-end gap-3 mb-8">
                            <h2 className="text-3xl font-black text-on-surface tracking-tight">{hpText.recentSearches || 'Recently searched'}</h2>
                            <div className="h-1 w-12 bg-primary rounded-full mb-2"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {homepage.recent_searches.slice(0,3).map((search, idx) => (
                                <div key={idx} className="group bg-surface-container-lowest p-6 rounded-[1.5rem] border border-outline-variant/10 hover:border-primary/20 transition-all duration-500 cursor-pointer flex justify-between items-center" onClick={() => {setFromStation(search.from_station); setToStation(search.to_station)}}>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-bold uppercase tracking-widest text-on-surface-variant/60">{search.date} • {search.class}</span>
                                        <span className="text-xl font-bold">{search.from_station} <span className="text-primary-container text-xs mx-1">→</span> {search.to_station}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-primary/40 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommended for You */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div className="flex items-end gap-3">
                                <h2 className="text-3xl font-black text-on-surface tracking-tight">{hpText.trendingTitle || 'Trending Routes'}</h2>
                                <div className="h-1 w-12 bg-secondary rounded-full mb-2"></div>
                            </div>
                            <button className="text-secondary font-bold hover:underline">{hpText.viewAllBtn || 'View All'}</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {homepage.trending_routes.slice(0,4).map((route, idx) => {
                                const images = [
                                    "https://picsum.photos/id/1018/600/800",
                                    "https://picsum.photos/id/1036/600/800",
                                    "https://picsum.photos/id/1040/600/800",
                                    "https://picsum.photos/id/1044/600/800"
                                ];
                                return (
                                <div key={idx} className="group relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-lg cursor-pointer">
                                    <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images[idx]} alt={route.route} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-1">{route.route}</h3>
                                        <p className="text-sm text-white/70">{hpText.avgFare || 'Avg'} ₹{route.avg_price} • {
                                            route.availability_trend === 'High Demand' ? (hpText.highDemand || 'High Demand') :
                                            route.availability_trend === 'Available' ? (hpText.available || 'Available') :
                                            route.availability_trend === 'Waitlisted' ? (hpText.waitlisted || 'Waitlisted') :
                                            route.availability_trend === 'Fast Filling' ? (hpText.fastFilling || 'Fast Filling') : route.availability_trend
                                        }</p>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>

                    {/* Festival Specials */}
                    <div>
                        <div className="flex items-end gap-3 mb-8">
                            <h2 className="text-3xl font-black text-on-surface tracking-tight">{hpText.quickLinksTitle || 'Quick Links'}</h2>
                            <div className="h-1 w-12 bg-tertiary rounded-full mb-2"></div>
                        </div>
                        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                            {homepage.quick_links.map((link, idx) => (
                                <div key={idx} className="flex-none w-[350px] md:w-[400px] bg-tertiary-container/10 p-8 rounded-[2.5rem] border-2 border-tertiary/10 group cursor-pointer hover:bg-tertiary-container/20 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-tertiary rounded-2xl text-white">
                                            <span className="material-symbols-outlined text-3xl">celebration</span>
                                        </div>
                                        <span className="bg-tertiary/20 text-tertiary-container font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest">{link.tag}</span>
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">{link.title}</h3>
                                    <div className="flex items-center gap-2 text-tertiary font-bold group-hover:gap-4 transition-all">
                                        <span>{hpText.exploreNowBtn || 'Explore Now'}</span>
                                        <span className="material-symbols-outlined">trending_flat</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="text-center mt-32 mb-16 px-4">
                        <h2 className="text-4xl font-black text-on-surface tracking-tight mb-2">{hpText.servicesTitle || 'Have you not found the right one?'}</h2>
                        <p className="text-xl text-on-surface-variant font-bold mb-16">{hpText.servicesSub || 'Find a service suitable for you here.'}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-6 max-w-5xl mx-auto">
                            {[
                                { icon: 'flight', label: hpText.services?.flights || 'FLIGHTS' },
                                { icon: 'hotel', label: hpText.services?.hotels || 'HOTELS' },
                                { icon: 'monitoring', label: hpText.services?.railDrishti || 'RAIL DRISHTI' },
                                { icon: 'restaurant_menu', label: hpText.services?.eCatering || 'E-CATERING' },
                                { icon: 'directions_bus', label: hpText.services?.bus || 'BUS' },
                                { icon: 'luggage', label: hpText.services?.holidayPackages || 'HOLIDAY PACKAGES' },
                                { icon: 'tram', label: hpText.services?.touristTrain || 'TOURIST TRAIN' },
                                { icon: 'landscape', label: hpText.services?.hillRailways || 'HILL RAILWAYS' },
                                { icon: 'train', label: hpText.services?.charterTrain || 'CHARTER TRAIN' },
                                { icon: 'photo_library', label: hpText.services?.gallery || 'GALLERY' }
                            ].map((service, idx) => (
                                <div key={idx} className="flex flex-col items-center group cursor-pointer">
                                    <div className="w-[100px] h-[100px] rounded-full border border-outline-variant/50 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border-[1.5px] group-hover:scale-105">
                                        <span className="material-symbols-outlined text-[40px] font-light">{service.icon}</span>
                                    </div>
                                    <span className="text-[13px] font-black tracking-wide uppercase text-on-surface group-hover:text-primary transition-colors">{service.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Holidays */}
                    <div className="mt-32 mb-24 text-center px-4">
                        <h2 className="text-4xl font-black text-on-surface tracking-widest mb-16 uppercase">{hpText.holidaysTitle || 'HOLIDAYS'}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {[
                                { img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366', title: hpText.holidays?.maharajasTitle || "Maharajas' Express", desc: hpText.holidays?.maharajasDesc || "Redefining Royalty, Luxury and Comfort, Maharajas' express takes you on a sojourn to the era of bygone stately splendour of princely states. Sylvan furnishings, elegant ambience and modern amenities are amalgamated for an 'Experience Unsurpassed'." },
                                { img: 'https://images.unsplash.com/photo-1528644465493-27aa3428d087', title: hpText.holidays?.internationalTitle || "International Packages", desc: hpText.holidays?.internationalDesc || "Best deals in International Holiday packages, handpicked by IRCTC, for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan, Nepal, U.K., Europe, USA, Australia etc. The packages are inclusive of sightseeing, meals, visa..." },
                                { img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2', title: hpText.holidays?.domesticTitle || "Domestic Air Packages", desc: hpText.holidays?.domesticDesc || "Be it the spiritual devotee seeking blessings of Tirupati, Shirdi or Mata Vaishno Devi or the leisure traveller wanting to relish the Blue mountains of North East, Sand-dunes of Rajasthan, Hamlets of Ladakh, Wonders of Himalayas, Serene lakes..." }
                            ].map((pkg, idx) => (
                                <div key={idx} className="bg-surface-container-lowest group cursor-pointer text-left flex flex-col h-full border border-transparent hover:border-outline-variant/30 hover:shadow-2xl transition-all duration-500">
                                    <div className="overflow-hidden aspect-[4/3]">
                                        <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                                    </div>
                                    <div className="p-8 flex flex-col flex-1 border border-t-0 border-outline-variant/10">
                                        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{pkg.title}</h3>
                                        <p className="text-sm text-on-surface-variant font-medium leading-[1.8] mb-6 flex-1 text-justify">{pkg.desc}</p>
                                        <button className="text-on-surface font-black text-xs uppercase tracking-widest hover:text-primary flex items-center gap-2 self-start mt-auto">Read More <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Social Banner */}
            <div className="bg-gradient-to-r from-[#211b4a] to-[#7f3471] text-white py-4 px-6 mt-12 border-b-2 border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
                    <span className="font-medium text-[16px] tracking-wide">{hpText.socialTitle || 'Get Connected with us on social networks'}</span>
                    <div className="flex items-center gap-3">
                        <div className="w-[38px] h-[38px] rounded-full bg-[#3b5998] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="font-bold text-lg">f</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#25D366] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#FF0000] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>smart_display</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#125688] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">camera_alt</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#0077b5] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="font-bold text-lg leading-none">in</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#0088cc] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">send</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#cb2027] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="font-bold text-lg leading-none">P</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#32506d] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="font-bold text-lg leading-none">t</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#fffc00] text-black flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>flutter_dash</span></div>
                        <div className="w-[38px] h-[38px] rounded-full bg-[#1da1f2] flex items-center justify-center cursor-pointer shadow-lg hover:opacity-90 transition-opacity"><span className="font-bold text-lg leading-none">X</span></div>
                    </div>
                </div>
            </div>

            {/* Dark Purple Nav Footer */}
            <footer className="bg-[#18113c] py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div>
                        <ul className="space-y-4 font-bold text-white/90 text-sm">
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">IRCTC Trains <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">General Information <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">Important Information <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">Agents <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">Enquiries <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-4 font-bold text-white/90 text-sm">
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">How To <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">IRCTC Official App <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">Advertise with us <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">Refund Rules <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-4 font-bold text-white/90 text-sm">
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">E-Wallet <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">IRCTC Co-branded Card Benefits <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-4 font-bold text-white/90 text-sm">
                            <li><a className="hover:text-amber-400 transition-colors flex items-center" href="#">For Newly Migrated Agents <span className="material-symbols-outlined text-sm ml-1">expand_more</span></a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-4 font-bold text-white/90 text-sm">
                            <li><a className="hover:text-amber-400 transition-colors" href="#">Help & Support</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center gap-6">
                    <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest text-center">{hpText.footerRightsHome || '© 2026 IRCTC Corporation Ltd. All Rights Reserved.'}</p>
                </div>
            </footer>
            
            {/* Added ChatWidget */}
            <ChatWidget />
        </div>
    );
};

export default Homepage;
