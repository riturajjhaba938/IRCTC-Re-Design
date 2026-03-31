import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dummyData from '../data/irctc_dummy_data.json';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const Booking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useLanguage();
    const bkText = t('booking');
    const { booking_flow } = dummyData;
    const { selected_train_details, fare_summary } = booking_flow;

    // State for booking flow
    const [currentStep, setCurrentStep] = useState(1);
    const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'Male', berth: 'No Preference' }]);

    return (
        <div className="bg-surface text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen pb-32">
            <Navbar />

            <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
                {/* Progress Indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
                            </div>
                            <span className="font-semibold text-on-surface hidden md:inline">Search</span>
                        </div>
                        <div className="flex-1 mx-4 h-1 bg-secondary-fixed-dim relative rounded-full overflow-hidden">
                            <div className="absolute inset-0 w-1/2 bg-primary"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold ring-4 ring-primary-container/20">2</div>
                            <span className="font-bold text-on-surface hidden md:inline">Passenger Details</span>
                        </div>
                        <div className="flex-1 mx-4 h-1 bg-secondary-fixed-dim rounded-full"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold">3</div>
                            <span className="font-semibold text-on-surface-variant hidden md:inline">Review</span>
                        </div>
                        <div className="flex-1 mx-4 h-1 bg-secondary-fixed-dim rounded-full"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold">4</div>
                            <span className="font-semibold text-on-surface-variant hidden md:inline">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Train Details & Selection */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero Train Summary */}
                        <div className="bg-surface-container-low rounded-3xl p-8 shadow-[0_20px_40px_rgba(20,29,30,0.06)] relative overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">{selected_train_details.boarding_date}</span>
                                    <h1 className="text-4xl font-black -tracking-wider text-on-surface uppercase">{selected_train_details.train_name}</h1>
                                    <p className="text-on-surface-variant font-medium mt-1">Train #{selected_train_details.train_number} • {selected_train_details.class} • {selected_train_details.quota}</p>
                                </div>
                                <div className="flex items-center gap-6 bg-surface-container-lowest p-6 rounded-2xl">
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-on-surface">{selected_train_details.departure.time}</p>
                                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">{selected_train_details.departure.station_code}</p>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">{selected_train_details.duration}</span>
                                        <div className="w-16 h-0.5 bg-secondary-fixed-dim relative">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-on-surface">{selected_train_details.arrival.time}</p>
                                        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">{selected_train_details.arrival.station_code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Passenger Detail Inputs */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black -tracking-wider text-on-surface">{bkText.passengersLabel || 'Passenger Details'}</h2>
                            </div>
                            <div className="space-y-4">
                                {booking_flow.passenger_details.passengers.map((passenger, i) => (
                                    <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 relative">
                                        <h3 className="font-bold mb-4 text-on-surface-variant">Passenger {i+1}</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <div className="md:col-span-2 space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
                                                <input className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary outline-none font-semibold" value={passenger.name} readOnly />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Age</label>
                                                <input className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary outline-none font-semibold" value={passenger.age} readOnly />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Gender</label>
                                                <select className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary outline-none font-semibold">
                                                    <option>{passenger.gender}</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2 space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Berth Preference</label>
                                                <select className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary outline-none font-semibold">
                                                    <option>{passenger.berth_preference}</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2 space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Food Choice</label>
                                                <select className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-none focus:ring-2 focus:ring-primary outline-none font-semibold">
                                                    <option>{passenger.food_preference}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-4 rounded-xl border-2 border-dashed border-primary/40 text-primary font-bold hover:bg-primary/5 transition-colors">
                                    {bkText.addPassenger || '+ Add New Passenger'}
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Booking Summary & Sidebar */}
                    <div className="lg:col-span-4 sticky top-24 space-y-6">
                        {/* Fare Summary Card */}
                        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_20px_40px_rgba(20,29,30,0.06)] border border-outline-variant/10">
                            <h3 className="text-xl font-black -tracking-wider text-on-surface mb-6">{bkText.fareSummary || 'Fare Summary'}</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">{bkText.baseFare || 'Base Fare'} ({booking_flow.passenger_details.passengers.length} Adult)</span>
                                    <span className="font-bold text-on-surface">₹{fare_summary.base_fare}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Catering Charges</span>
                                    <span className="font-bold text-on-surface">₹{fare_summary.catering_charges}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Reservation Fee</span>
                                    <span className="font-bold text-on-surface">₹{fare_summary.reservation_charge}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Superfast Charge</span>
                                    <span className="font-bold text-on-surface">₹{fare_summary.superfast_charge}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">GST</span>
                                    <span className="font-bold text-on-surface">₹{fare_summary.gst}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Convenience Fee</span>
                                    <span className="font-bold text-on-surface">₹{fare_summary.convenience_fee}</span>
                                </div>
                                <div className="flex justify-between text-sm text-tertiary">
                                    <span className="font-bold">Travel Insurance</span>
                                    <span className="font-bold">₹{fare_summary.travel_insurance}</span>
                                </div>
                                <div className="h-px bg-surface-container-highest my-6"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-black text-on-surface">{bkText.total || 'Total Amount'}</span>
                                    <span className="text-2xl font-black text-primary">₹{fare_summary.total_payable}</span>
                                </div>
                            </div>
                            <button className="w-full mt-8 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                {bkText.continueBtn || 'Proceed to Payment'}
                            </button>
                            <p className="text-[10px] text-center text-on-surface-variant mt-4 leading-relaxed">
                                By proceeding, you agree to IRCTC's Terms of Service and Cancellation Policies.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Booking;
