import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import dummyData from '../data/irctc_dummy_data.json';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const MyTrips = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const tripsText = t('mytrips');

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-on-surface tracking-tight mb-2">{tripsText.title || 'My Trips'}</h1>
                        <p className="text-on-surface-variant font-medium">{tripsText.subtitle || 'Manage your upcoming journeys and explore your travel history.'}</p>
                    </div>
                </div>

                {/* Empty State / Coming Soon */}
                <div className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] p-12 text-center shadow-[0_20px_40px_rgba(20,29,30,0.06)] flex flex-col items-center justify-center py-24">
                    <div className="w-24 h-24 bg-primary-container text-primary rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-5xl">luggage</span>
                    </div>
                    <h2 className="text-2xl font-black text-on-surface mb-4">{tripsText.emptyTitle || 'No upcoming trips found'}</h2>
                    <p className="text-on-surface-variant max-w-md mx-auto mb-8 font-medium">{tripsText.emptySub || 'You haven\'t booked any tickets yet. Explore our premium routes and start your journey today.'}</p>
                    <Link to="/" className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1 active:scale-95">
                        {tripsText.bookBtn || 'Book a Ticket'}
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default MyTrips;
