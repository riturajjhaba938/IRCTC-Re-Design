import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dummyData from '../data/irctc_dummy_data.json';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const PNRStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const pnrText = t('pnrstatus');

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-end mb-8 text-center max-w-2xl mx-auto">
                    <div className="w-full">
                        <h1 className="text-5xl font-black text-on-surface tracking-tighter mb-4 capitalize">{pnrText.title || 'Check PNR Status'}</h1>
                        <p className="text-on-surface-variant font-medium text-lg">{pnrText.subtitle || 'Enter your 10-digit Passenger Name Record (PNR) number to check current live status.'}</p>
                    </div>
                </div>

                <div className="max-w-xl mx-auto">
                    <div className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(20,29,30,0.06)] border border-outline-variant/10">
                        <div className="mb-6 relative group">
                            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3 ml-1">{pnrText.inputLabel || '10-Digit PNR Number'}</label>
                            <div className="bg-surface-container-low p-4 rounded-2xl group-focus-within:ring-2 ring-primary/30 transition-shadow">
                                <input 
                                    className="w-full bg-transparent border-none p-0 focus:ring-0 font-black text-2xl tracking-[0.2em] outline-none text-center placeholder:text-on-surface-variant/30" 
                                    placeholder={pnrText.inputPlaceholder || "Enter PNR"} 
                                    type="text" 
                                    maxLength="10"
                                />
                            </div>
                        </div>
                        <button className="w-full bg-primary text-on-primary px-8 py-5 rounded-xl font-black tracking-widest uppercase shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1 active:scale-95 text-lg">
                            {pnrText.checkBtn || 'Get Status'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PNRStatus;
