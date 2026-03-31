import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dummyData from '../data/irctc_dummy_data.json';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const svcText = t('services');

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-4 capitalize">{svcText.title || 'Premium IRCTC Services'}</h1>
                    <p className="text-on-surface-variant font-medium text-lg max-w-2xl mx-auto">{svcText.subtitle || 'Explore all our partner services seamlessly integrated with your IRCTC ID.'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Cargo */}
                    <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-lg hover:-translate-y-2 transition-transform duration-500 cursor-pointer group">
                        <div className="w-16 h-16 bg-secondary-container/30 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">local_shipping</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2">{svcText.cargoTitle || 'Rail Parcel & Cargo'}</h3>
                        <p className="text-sm font-medium text-on-surface-variant mb-6">{svcText.cargoSub || 'Book luggage and cargo securely shipped across the Indian Railways network.'}</p>
                        <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">Book Parcel <span className="material-symbols-outlined text-sm">trending_flat</span></span>
                    </div>

                    {/* Retiring Room */}
                    <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-lg hover:-translate-y-2 transition-transform duration-500 cursor-pointer group">
                        <div className="w-16 h-16 bg-tertiary-container/30 text-tertiary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">hotel</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2">{svcText.retiringTitle || 'Retiring Rooms'}</h3>
                        <p className="text-sm font-medium text-on-surface-variant mb-6">{svcText.retiringSub || 'Reserve transit accommodation instantly at major railway stations.'}</p>
                        <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">Reserve Now <span className="material-symbols-outlined text-sm">trending_flat</span></span>
                    </div>

                    {/* e-Catering */}
                    <div className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-lg hover:-translate-y-2 transition-transform duration-500 cursor-pointer group">
                        <div className="w-16 h-16 bg-error-container/30 text-error rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">restaurant</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2">{svcText.cateringTitle || 'eCatering'}</h3>
                        <p className="text-sm font-medium text-on-surface-variant mb-6">{svcText.cateringSub || 'Order hot meals right to your seat from premium restaurant partners.'}</p>
                        <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center gap-2">Order Food <span className="material-symbols-outlined text-sm">trending_flat</span></span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Services;
