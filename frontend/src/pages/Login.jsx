import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const loginText = t('login');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock authentication success
        navigate('/');
    };

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row gap-16 items-start">
                <section className="w-full lg:w-3/5">
                    <div className="mb-10">
                        <h1 className="text-5xl font-black tracking-tight text-on-surface mb-2">{loginText.welcome || 'Welcome Back.'}</h1>
                        <p className="text-on-surface-variant text-lg max-w-md">{loginText.welcomeSub || 'Access your Indian Railways journeys with premium security and seamless integration.'}</p>
                    </div>

                    <div className="bg-surface-container-lowest rounded-[2rem] shadow-[0_20px_40px_rgba(20,29,30,0.06)] overflow-hidden border border-outline-variant/10">
                        <div className="flex border-b border-surface-container-low">
                            <button className="flex-1 py-5 text-center font-bold text-primary border-b-2 border-primary bg-surface-container-highest/20 cursor-default">{loginText.loginTab || 'Login'}</button>
                            <button className="flex-1 py-5 text-center font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">{loginText.signupTab || 'Sign Up'}</button>
                        </div>

                        <form onSubmit={handleLogin} className="p-8 md:p-12 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">{loginText.userIdLabel || 'IRCTC ID / Username'}</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">person</span>
                                        <input 
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border-0 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/50" 
                                            placeholder="Enter ID" 
                                            type="text"
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">{loginText.passwordLabel || 'Password'}</label>
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
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-surface-container-low rounded-2xl">
                                <div className="flex-shrink-0">
                                    <div className="bg-white px-6 py-3 rounded-lg border border-outline-variant/30 select-none pointer-events-none">
                                        <span className="text-2xl font-black italic tracking-widest text-on-surface-variant/40 line-through">K7R9B</span>
                                    </div>
                                </div>
                                <div className="flex-1 w-full relative">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">{loginText.captchaLabel || 'Enter Captcha'}</label>
                                    <div className="flex gap-2 relative">
                                        <input 
                                            value={captcha}
                                            onChange={(e) => setCaptcha(e.target.value)}
                                            className="flex-1 px-4 py-3 bg-white rounded-lg border border-outline-variant/20 focus:ring-2 focus:ring-primary outline-none transition-all text-sm font-bold uppercase" 
                                            placeholder="Type letters..." 
                                            type="text" 
                                        />
                                        <button className="material-symbols-outlined p-2 text-primary hover:rotate-180 transition-all duration-500 bg-primary-container/10 rounded-lg shrink-0" type="button">refresh</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-low cursor-pointer" id="remember" type="checkbox" />
                                    <label className="text-sm font-medium text-on-surface cursor-pointer" htmlFor="remember">{loginText.rememberMe || 'Remember my ID'}</label>
                                </div>
                                <a className="text-sm font-bold text-secondary hover:text-primary transition-colors w-full sm:w-auto text-right" href="#">{loginText.forgotPwd || 'Forgot Password?'}</a>
                            </div>

                            <div className="flex flex-col gap-4 pt-4">
                                <button className="w-full bg-gradient-to-r from-primary to-[#ff802b] text-on-primary font-black tracking-widest uppercase py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95 transition-all text-sm" type="submit">
                                    {loginText.secureLogin || 'Secure Login'}
                                </button>
                                <button className="w-full bg-surface-container-low text-on-surface font-black tracking-widest uppercase py-4 rounded-xl hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-2 text-sm border border-outline-variant/10" type="button">
                                    <span className="material-symbols-outlined text-xl">smartphone</span>
                                    {loginText.otpLogin || 'Login with OTP'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                <aside className="w-full lg:w-2/5 space-y-8">
                    <div className="bg-surface-container-high p-8 rounded-[2rem] relative overflow-hidden group shadow-inner">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-on-surface mb-6">{loginText.idMgmt || 'IRCTC ID Management'}</h2>
                            <div className="space-y-4 mb-8">
                                <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between shadow-sm border border-outline-variant/10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center text-secondary">
                                            <span className="material-symbols-outlined">badge</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-on-surface">RAHUL_TRAIN_23</p>
                                            <p className="text-[11px] font-bold text-tertiary uppercase tracking-wider mt-0.5">{loginText.primaryAcct || 'Primary Account'}</p>
                                        </div>
                                    </div>
                                    <span className="bg-tertiary/10 text-tertiary text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest">{loginText.verified || 'Verified'}</span>
                                </div>
                                
                                <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between shadow-sm opacity-70 border border-outline-variant/10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant">
                                            <span className="material-symbols-outlined pb-0.5">badge</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-on-surface">TRAVELER_EXP</p>
                                            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">{loginText.guestId || 'Guest ID'}</p>
                                        </div>
                                    </div>
                                    <span className="bg-primary-container/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest">{loginText.pending || 'Pending'}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <button className="w-full py-4 bg-surface-container-lowest rounded-xl font-bold text-sm text-on-surface hover:text-primary hover:shadow-md transition-all flex items-center justify-center gap-2 border border-outline-variant/10 active:scale-95">
                                    <span className="material-symbols-outlined text-xl text-tertiary">verified_user</span>
                                    {loginText.verifyIdBtn || 'Verify your IRCTC ID'}
                                </button>
                                <button className="w-full py-4 bg-surface-container-lowest rounded-xl font-bold text-sm text-on-surface hover:text-primary hover:shadow-md transition-all flex items-center justify-center gap-2 border border-outline-variant/10 active:scale-95">
                                    <span className="material-symbols-outlined text-xl text-secondary">add_circle</span>
                                    {loginText.addIdBtn || 'Add New IRCTC ID'}
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl mix-blend-multiply"></div>
                    </div>

                    <div className="bg-secondary rounded-[2rem] p-8 text-on-secondary overflow-hidden relative shadow-xl shadow-secondary/20">
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full inline-block mb-4 backdrop-blur-sm">{loginText.tipTitle || 'Travel Tip'}</span>
                            <h3 className="text-2xl font-black leading-tight mb-4 tracking-tight">{loginText.tipBody || 'Link your IRCTC ID for 1-click booking & instant refunds.'}</h3>
                            <p className="text-sm text-white/80 leading-relaxed mb-8 font-medium">{loginText.tipDesc || 'Verified IDs enjoy faster checkout and real-time PNR sync across all IRCTC devices.'}</p>
                            
                            <div className="flex -space-x-3 items-center">
                                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-container flex items-center justify-center overflow-hidden">
                                     <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-container-high flex items-center justify-center overflow-hidden">
                                     <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-surface-variant flex items-center justify-center overflow-hidden">
                                     <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-primary flex items-center justify-center text-[10px] font-bold text-on-primary z-10">
                                    +10M
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary-fixed opacity-50 z-0"></div>
                    </div>
                </aside>
            </main>

            <footer className="mt-12 border-t border-surface-container-high py-12 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <p className="text-2xl font-black text-on-surface tracking-tighter">IRCTC</p>
                        <p className="text-xs font-medium text-on-surface-variant">{loginText.footerRights || '© 2026 IRCTC Authorized Partner. All rights reserved.'}</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-bold text-on-surface-variant">
                        <Link className="hover:text-primary transition-colors" to="#">{loginText.footerPrivacy || 'Privacy Policy'}</Link>
                        <Link className="hover:text-primary transition-colors" to="#">{loginText.footerTerms || 'Terms of Service'}</Link>
                        <Link className="hover:text-primary transition-colors" to="#">{loginText.footerRefund || 'Refund Rules'}</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;
