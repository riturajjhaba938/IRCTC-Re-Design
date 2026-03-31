import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const EWallet = () => {
    const { t } = useLanguage();
    const [balance] = useState(12450);

    const transactions = [
        { id: 1, type: 'credit', desc: 'Wallet Recharge via UPI', amount: 5000, date: '28 Mar 2026', status: 'Success' },
        { id: 2, type: 'debit', desc: 'Train Ticket - ADI to NDLS (PNR: 4521876390)', amount: 2340, date: '26 Mar 2026', status: 'Success' },
        { id: 3, type: 'credit', desc: 'Refund - Cancelled Ticket (PNR: 8901234567)', amount: 1850, date: '24 Mar 2026', status: 'Success' },
        { id: 4, type: 'debit', desc: 'E-Catering Order #IRCTC-2045', amount: 380, date: '22 Mar 2026', status: 'Success' },
        { id: 5, type: 'debit', desc: 'Train Ticket - NDLS to BCT (PNR: 6789054321)', amount: 3200, date: '20 Mar 2026', status: 'Success' },
        { id: 6, type: 'credit', desc: 'Cashback - IRCTC Co-branded Card', amount: 150, date: '18 Mar 2026', status: 'Success' },
        { id: 7, type: 'debit', desc: 'Hotel Booking - Retiring Room BPL', amount: 800, date: '15 Mar 2026', status: 'Failed' },
    ];

    return (
        <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Balance Card */}
                    <div className="lg:col-span-4">
                        <div className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-[2rem] p-8 shadow-xl shadow-primary/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                            <div className="relative z-10">
                                <span className="text-xs font-bold uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full inline-block mb-6 backdrop-blur-sm">IRCTC eWallet</span>
                                <p className="text-sm font-medium text-white/70 mb-2">Available Balance</p>
                                <h2 className="text-5xl font-black mb-8 tracking-tight">₹{balance.toLocaleString()}</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-4 rounded-xl text-sm hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-lg">add</span> Add Money
                                    </button>
                                    <button className="bg-white text-primary font-bold py-3 px-4 rounded-xl text-sm hover:bg-white/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg">
                                        <span className="material-symbols-outlined text-lg">send</span> Transfer
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-5 text-center">
                                <span className="material-symbols-outlined text-tertiary text-3xl mb-2">trending_up</span>
                                <p className="text-2xl font-black text-on-surface">₹7,000</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">Total Credits</p>
                            </div>
                            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-5 text-center">
                                <span className="material-symbols-outlined text-error text-3xl mb-2">trending_down</span>
                                <p className="text-2xl font-black text-on-surface">₹6,720</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">Total Debits</p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-black text-on-surface tracking-tight">Transaction History</h1>
                            <button className="bg-surface-container-low text-on-surface-variant px-4 py-2 rounded-xl font-bold text-sm hover:bg-surface-container-highest transition-colors">
                                <span className="material-symbols-outlined text-sm mr-1 align-middle">download</span> Statement
                            </button>
                        </div>

                        <div className="space-y-3">
                            {transactions.map(txn => (
                                <div key={txn.id} className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${txn.type === 'credit' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'}`}>
                                            <span className="material-symbols-outlined">{txn.type === 'credit' ? 'south_west' : 'north_east'}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-on-surface text-sm">{txn.desc}</p>
                                            <p className="text-xs text-on-surface-variant mt-0.5">{txn.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-lg font-black ${txn.type === 'credit' ? 'text-tertiary' : 'text-on-surface'}`}>
                                            {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                                        </p>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${txn.status === 'Success' ? 'text-tertiary' : 'text-error'}`}>{txn.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EWallet;
