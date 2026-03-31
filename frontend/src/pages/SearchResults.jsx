import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import dummyData from '../data/irctc_dummy_data.json';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const parseDuration = (durationStr) => {
    const match = durationStr.match(/(\d+)h\s*(\d+)m/);
    if (match) return parseInt(match[1]) * 60 + parseInt(match[2]);
    return 0;
};

const getCheapestPrice = (classes) => {
    if (!classes || classes.length === 0) return 0;
    return Math.min(...classes.map(c => c.fare.total));
};

const parseTime = (timeStr) => {
    const [h, m] = timeStr.split(':');
    return parseInt(h) * 60 + parseInt(m);
};

const SearchResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const srText = t('searchResults');
    
    // Function to check active link
    const isActive = (path) => location.pathname === path;

    const { search_results_page } = dummyData;
    const { trains, search_criteria, sort_options } = search_results_page;

    const [sortBy, setSortBy] = useState('Relevance');
    const [acOnly, setAcOnly] = useState(false);

    const filteredTrains = trains.filter(train => {
        if (!acOnly) return true;
        const acClasses = ['1A', '2A', '3A', '3E', 'CC', 'EC'];
        return train.classes.some(c => acClasses.includes(c.class_code));
    }).sort((a, b) => {
        switch (sortBy) {
            case 'Price: Cheapest First':
                return getCheapestPrice(a.classes) - getCheapestPrice(b.classes);
            case 'Duration: Fastest First':
                return parseDuration(a.duration) - parseDuration(b.duration);
            case 'Departure: Early First':
                return parseTime(a.departure.time) - parseTime(b.departure.time);
            case 'Departure: Late First':
                return parseTime(b.departure.time) - parseTime(a.departure.time);
            case 'Arrival: Early First':
                return parseTime(a.arrival.time) - parseTime(b.arrival.time);
            case 'Relevance':
            default:
                return 0;
        }
    });

    return (
        <div className="bg-surface text-on-surface font-body min-h-screen">
            <Navbar />

            <main className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* Search Info Banner */}
                <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-on-surface -tracking-widest mb-2 uppercase">{search_criteria.from_station} → {search_criteria.to_station}</h1>
                        <p className="text-on-surface-variant font-medium">{search_criteria.date} • {search_criteria.passengers.adults < 10 && '0'}{search_criteria.passengers.adults} Adults • {search_criteria.quota}</p>
                    </div>
                    <Link to="/" className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        {srText.modifySearch || 'Modify Search'}
                    </Link>
                </div>

                {/* Filter and Sort Header */}
                <div className="sticky top-20 sm:top-24 z-40 bg-surface/90 backdrop-blur-xl py-3 sm:py-4 mb-6 sm:mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <button onClick={() => setSortBy(sortBy === 'Duration: Fastest First' ? 'Relevance' : 'Duration: Fastest First')} className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest active:scale-95 transition-all ${sortBy === 'Duration: Fastest First' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'}`}>{srText.fastest || 'Fastest'}</button>
                            <button onClick={() => setSortBy(sortBy === 'Price: Cheapest First' ? 'Relevance' : 'Price: Cheapest First')} className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest active:scale-95 transition-all ${sortBy === 'Price: Cheapest First' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'}`}>{srText.cheapest || 'Cheapest'}</button>
                            <button onClick={() => setAcOnly(!acOnly)} className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest active:scale-95 transition-all ${acOnly ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest'}`}>{srText.acOnly || 'AC Only'}</button>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{srText.sortByLabel || 'Sort By'}</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-surface-container-low border-none rounded-xl text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary py-2.5 px-4 pr-10 outline-none cursor-pointer">
                                {sort_options.map((opt, i) => (
                                    <option key={i} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="space-y-6">
                    {filteredTrains.length === 0 ? (
                        <div className="text-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">search_off</span>
                            <h3 className="text-2xl font-black text-on-surface mb-2">{srText.noTrains || 'No trains found'}</h3>
                            <p className="text-on-surface-variant font-medium">{srText.noTrainsSub || 'Try adjusting your filters or search criteria.'}</p>
                        </div>
                    ) : (
                        filteredTrains.map((train, idx) => (
                            <div key={idx} className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(20,29,30,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgba(20,29,30,0.08)] transition-all duration-500 border border-transparent hover:border-outline-variant/10">
                            <div className="p-4 sm:p-8 flex flex-col md:flex-row gap-4 sm:gap-8 items-stretch">
                                {/* Train Info */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                {train.type && <span className="bg-tertiary-container/10 text-tertiary text-[10px] font-black px-2 py-0.5 rounded tracking-tighter uppercase">{train.type}</span>}
                                                <h3 className="text-base sm:text-xl font-extrabold text-on-surface tracking-tight">{train.train_name} ({train.train_number})</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-[10px] font-bold tracking-widest uppercase bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">LHB Rake</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Starts from</span>
                                            <div className="text-2xl font-black text-primary">₹{train.classes[0]?.fare.total || 0}</div>
                                        </div>
                                    </div>

                                    {/* Journey Progress Visualization */}
                                    <div className="flex items-center justify-between relative">
                                        <div className="flex flex-col items-start z-10 bg-surface-container-lowest pr-4">
                                            <span className="text-xl sm:text-2xl font-black text-on-surface">{train.departure.time}</span>
                                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{train.departure.station}</span>
                                        </div>
                                        <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{train.duration}</span>
                                            <div className="w-full h-[4px] bg-secondary-fixed-dim rounded-full overflow-hidden relative">
                                            </div>
                                            <div className="absolute -top-1 left-1/3 transform -translate-x-1/2">
                                                <span className="material-symbols-outlined text-primary text-xl" style={{fontVariationSettings: "'FILL' 1"}}>train</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest mt-1">{train.delay_status}</span>
                                        </div>
                                        <div className="flex flex-col items-end z-10 bg-surface-container-lowest pl-4">
                                            <span className="text-xl sm:text-2xl font-black text-on-surface">{train.arrival.time}</span>
                                            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{train.arrival.station}</span>
                                        </div>
                                    </div>

                                    {/* Class Selection / Availability */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 pt-4">
                                        {train.classes.map((c, i) => {
                                            const isAvailable = c.availability.status === "AVL";
                                            const isWL = c.availability.status === "WL";
                                            return (
                                                <button key={i} className={`p-4 rounded-xl text-left transition-colors border-2 ${isAvailable ? 'bg-surface-container-low hover:bg-tertiary-fixed/30 border-transparent focus:border-tertiary' : isWL ? 'bg-surface-container-low hover:bg-error-container/30 border-transparent focus:border-error' : 'bg-surface-container-low border-transparent hover:bg-secondary-fixed'}`}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-black uppercase tracking-widest">{c.class_code}</span>
                                                        <span className={`text-xs font-bold ${isAvailable ? 'text-tertiary' : isWL ? 'text-error' : 'text-on-surface-variant'}`}>{c.availability.status} {c.availability.number}</span>
                                                    </div>
                                                    <div className="text-lg font-black text-on-surface">₹{c.fare.total}</div>
                                                    <div className="mt-2 w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                                                        <div className={`h-full ${isAvailable ? 'bg-tertiary w-[80%]' : isWL ? 'bg-error w-[20%]' : 'bg-secondary w-[50%]'}`}></div>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* CTA Section */}
                                <div className="md:w-56 flex flex-col justify-end gap-3 md:border-l md:border-surface-container-low md:pl-8">
                                    <Link to={`/login`} className="w-full text-center bg-primary text-on-primary py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all active:scale-95">{srText.bookNow || 'Book Now'}</Link>
                                    <button className="w-full bg-surface-container-highest text-on-surface-variant py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-secondary-fixed transition-colors active:scale-95">{srText.trackStatus || 'Track Status'}</button>
                                </div>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default SearchResults;
