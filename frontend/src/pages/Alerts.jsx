import React from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const alertsData = [
    { id: 1, type: 'important', icon: 'warning', title: 'Tatkal Booking Time Change', body: 'Effective from 1st April 2026, Tatkal booking for AC classes will open at 10:00 AM (IST) and Non-AC classes at 11:00 AM (IST).', date: '30 Mar 2026', isNew: true },
    { id: 2, type: 'info', icon: 'train', title: 'Summer Special Trains Announced', body: 'Indian Railways has announced 200+ summer special trains from April to June 2026. Booking opens 120 days in advance.', date: '28 Mar 2026', isNew: true },
    { id: 3, type: 'success', icon: 'verified', title: 'IRCTC eWallet KYC Simplified', body: 'Complete your eWallet KYC using Aadhaar OTP verification. No document upload required. Instant activation.', date: '25 Mar 2026', isNew: false },
    { id: 4, type: 'important', icon: 'security', title: 'Security Advisory: OTP Login', body: 'For enhanced security, IRCTC recommends enabling 2-Factor Authentication via SMS OTP for all bookings above ₹5,000.', date: '22 Mar 2026', isNew: false },
    { id: 5, type: 'info', icon: 'celebration', title: 'Holi Special Fare Discounts', body: 'Get 10% off on selected routes during the Holi festival season (March 10-20). Use promo code HOLIRAIL at checkout.', date: '08 Mar 2026', isNew: false },
    { id: 6, type: 'info', icon: 'update', title: 'App Update v5.3 Available', body: 'The latest IRCTC mobile app includes faster PNR tracking, seat map visualization, and dark mode support.', date: '05 Mar 2026', isNew: false },
    { id: 7, type: 'success', icon: 'payments', title: 'UPI Autopay for Tatkal', body: 'Set up UPI Autopay to automatically complete Tatkal payments within seconds. Available for all major UPI apps.', date: '01 Mar 2026', isNew: false },
    { id: 8, type: 'important', icon: 'schedule', title: 'Platform Change Advisory', body: 'Due to ongoing track renewal work at New Delhi station, platform numbers for several trains have been changed. Please check before travel.', date: '26 Feb 2026', isNew: false },
];

const Alerts = () => {
    const { t } = useLanguage();

    const getTypeStyles = (type) => {
        switch(type) {
            case 'important': return { bg: 'bg-primary/10', border: 'border-primary/20', icon: 'text-primary', badge: 'bg-primary text-on-primary' };
            case 'success': return { bg: 'bg-tertiary/10', border: 'border-tertiary/20', icon: 'text-tertiary', badge: 'bg-tertiary text-on-tertiary' };
            default: return { bg: 'bg-secondary/10', border: 'border-secondary/20', icon: 'text-secondary', badge: 'bg-secondary text-on-secondary' };
        }
    };

    return (
        <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-4">🔔 Alerts & Notifications</h1>
                    <p className="text-on-surface-variant font-medium text-lg max-w-2xl mx-auto">Stay updated with the latest advisories, offers, and important announcements from Indian Railways and IRCTC.</p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black text-primary">{alertsData.length}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Total</p>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black text-tertiary">{alertsData.filter(a => a.isNew).length}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">New</p>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black text-on-surface">{alertsData.filter(a => a.type === 'important').length}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Important</p>
                    </div>
                </div>

                {/* Alerts List */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {alertsData.map(alert => {
                        const styles = getTypeStyles(alert.type);
                        return (
                            <div key={alert.id} className={`${styles.bg} border ${styles.border} rounded-2xl p-6 flex gap-5 items-start hover:shadow-md transition-shadow cursor-pointer relative`}>
                                {alert.isNew && (
                                    <span className="absolute top-4 right-4 bg-primary text-on-primary text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">New</span>
                                )}
                                <div className={`w-12 h-12 rounded-xl ${styles.bg} ${styles.icon} flex items-center justify-center shrink-0`}>
                                    <span className="material-symbols-outlined text-xl">{alert.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <h3 className="text-lg font-black text-on-surface">{alert.title}</h3>
                                    </div>
                                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed mb-3">{alert.body}</p>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">{alert.date}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Alerts;
