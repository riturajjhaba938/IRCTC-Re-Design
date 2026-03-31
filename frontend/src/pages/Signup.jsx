import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const Signup = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const loginText = t('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock account creation success and redirect to login
        navigate('/login');
    };

    return (
        <div className="bg-surface text-on-surface font-body min-h-screen">
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row gap-16 items-start">
                <section className="w-full lg:w-3/5">
                    <div className="mb-10">
                        <h1 className="text-5xl font-black tracking-tight text-on-surface mb-2">Create Account.</h1>
                        <p className="text-on-surface-variant text-lg max-w-md">Join millions of travelers. Book train tickets quickly with premium security and seamless integration.</p>
                    </div>

                    <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_40px_rgba(20,29,30,0.06)] overflow-hidden border border-outline-variant/10">
                        <div className="flex border-b border-surface-container-low">
                            <button onClick={() => navigate('/login')} className="flex-1 py-5 text-center font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">{loginText.loginTab || 'Login'}</button>
                            <button className="flex-1 py-5 text-center font-bold text-primary border-b-2 border-primary bg-surface-container-highest/20 cursor-default">{loginText.signupTab || 'Sign Up'}</button>
                        </div>

                        <form onSubmit={handleSignup} className="p-8 md:p-12 space-y-6">
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">person</span>
                                    <input 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border-0 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/50" 
                                        placeholder="Enter your full name" 
                                        type="text"
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">mail</span>
                                        <input 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border-0 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/50" 
                                            placeholder="your@email.com" 
                                            type="email"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Mobile Number</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">call</span>
                                        <input 
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border-0 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/50" 
                                            placeholder="+91 00000 00000" 
                                            type="tel"
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Create Password</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">lock</span>
                                    <input 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 rounded-xl bg-surface-container-low border-0 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/50" 
                                        placeholder="••••••••" 
                                        type="password"
                                        required 
                                    />
                                    <button className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" type="button">visibility</button>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <input className="w-5 h-5 mt-0.5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-low cursor-pointer" id="terms" type="checkbox" required />
                                <label className="text-sm font-medium text-on-surface-variant cursor-pointer leading-tight" htmlFor="terms">
                                    I agree to the <a href="#" className="text-primary hover:underline font-bold">Terms of Service</a>, <a href="#" className="text-primary hover:underline font-bold">Privacy Policy</a> and <a href="#" className="text-primary hover:underline font-bold">Refund Rules</a>.
                                </label>
                            </div>

                            <div className="pt-4">
                                <button className="w-full bg-gradient-to-r from-primary to-[#ff802b] text-on-primary font-black tracking-widest uppercase py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all text-sm" type="submit">
                                    Create My Account
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                <aside className="w-full lg:w-2/5 space-y-8">
                    <div className="bg-secondary rounded-[2rem] p-8 text-on-secondary overflow-hidden relative shadow-xl shadow-secondary/20">
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full inline-block mb-4 backdrop-blur-sm">Exclusive Benefits</span>
                            <h3 className="text-2xl font-black leading-tight mb-6 tracking-tight">Why create an IRCTC ID?</h3>
                            
                            <div className="space-y-5">
                                <div className="flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-white">flash_on</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1">Instant PNR Sync</h4>
                                        <p className="text-xs text-white/80 font-medium">Get real-time updates for all your journeys directly to your email and phone.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-white">currency_rupee</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1">E-Wallet Cashback</h4>
                                        <p className="text-xs text-white/80 font-medium">Earn exclusive cashback on ticket bookings and fast-track refunds via IRCTC E-Wallet.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 hover:-translate-y-1 transition-transform">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-white">verified_user</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1">Tatkal Priority</h4>
                                        <p className="text-xs text-white/80 font-medium">Save your passenger details as master lists to book Tatkal tickets in seconds.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary-fixed opacity-50 z-0"></div>
                        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
                    </div>
                </aside>
            </main>

            <footer className="mt-12 border-t border-surface-container-high py-12 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <p className="text-2xl font-black text-on-surface tracking-tighter">IRCTC</p>
                        <p className="text-xs font-medium text-on-surface-variant">© 2026 IRCTC Authorized Partner. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Signup;
