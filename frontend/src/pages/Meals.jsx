import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

const mealsData = [
    { id: 1, name: "Veg Thali Deluxe", desc: "Rice, Dal, Paneer, 2 Rotis, Salad, Pickle, Sweet", price: 180, rating: 4.5, vendor: "Rajdhani Kitchen", img: "/food/veg deluxe.jpg", category: "Veg", popular: true },
    { id: 2, name: "Non-Veg Thali Premium", desc: "Rice, Dal, Chicken Curry, 2 Rotis, Salad, Raita", price: 250, rating: 4.3, vendor: "Rail Chef Premium", img: "/food/Non veg thali.jpg", category: "Non-Veg", popular: true },
    { id: 3, name: "Biryani Box (Veg)", desc: "Aromatic Veg Biryani with Raita and Salan", price: 160, rating: 4.6, vendor: "Biryani Express", img: "/food/veg_biryani_new_1774992396899.png", category: "Veg", popular: false },
    { id: 4, name: "Chicken Biryani Box", desc: "Hyderabadi Chicken Biryani with Mirchi ka Salan", price: 220, rating: 4.7, vendor: "Biryani Express", img: "/food/biryani box.jpg", category: "Non-Veg", popular: true },
    { id: 5, name: "South Indian Combo", desc: "2 Idli, 1 Vada, Sambar, Chutney, Filter Coffee", price: 120, rating: 4.4, vendor: "Udupi Corner", img: "/food/south indian.jpg", category: "Veg", popular: false },
    { id: 6, name: "Snack Box", desc: "Samosa (2), Bread Pakora (2), Green Chutney, Tea", price: 90, rating: 4.2, vendor: "Chai Point", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80", category: "Veg", popular: false },
    { id: 7, name: "Jain Thali", desc: "No Onion No Garlic - Rice, Dal, Sabzi, Rotis, Sweet", price: 200, rating: 4.3, vendor: "Pure Veg Kitchen", img: "/food/jain thali.jpg", category: "Jain", popular: false },
    { id: 8, name: "Continental Breakfast", desc: "Toast, Butter, Jam, Omelette or Cornflakes, Juice", price: 150, rating: 4.1, vendor: "Rail Café", img: "/food/continental breakfast.jpg", category: "Continental", popular: false },
];

const Meals = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('All');
    const [cart, setCart] = useState([]);

    const filtered = filter === 'All' ? mealsData : mealsData.filter(m => m.category === filter);

    const addToCart = (meal) => {
        setCart(prev => [...prev, meal]);
    };

    return (
        <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter mb-4">🍽️ E-Catering & Meals</h1>
                    <p className="text-on-surface-variant font-medium text-lg max-w-2xl mx-auto">Order delicious meals delivered right to your train seat. Choose from a curated menu of popular restaurants along your route.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 justify-center mb-10">
                    {['All', 'Veg', 'Non-Veg', 'Jain', 'Continental'].map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest active:scale-95 transition-all ${filter === cat ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest border border-outline-variant/10'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Cart Summary */}
                {cart.length > 0 && (
                    <div className="bg-tertiary/10 border border-tertiary/20 rounded-2xl p-5 mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-tertiary">shopping_cart</span>
                            <span className="font-bold text-on-surface">{cart.length} item(s) in cart</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-black text-tertiary text-lg">₹{cart.reduce((sum, m) => sum + m.price, 0)}</span>
                            <button className="bg-tertiary text-on-tertiary px-5 py-2.5 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-tertiary/20">Checkout</button>
                        </div>
                    </div>
                )}

                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map(meal => (
                        <div key={meal.id} className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group flex flex-col">
                            <div className="h-44 bg-surface-container-high flex items-center justify-center relative overflow-hidden">
                                <img src={meal.img} alt={meal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                                {meal.popular && <span className="absolute top-3 right-3 bg-primary text-on-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-md">Popular</span>}
                                <span className="absolute top-3 left-3 bg-surface-container-lowest/95 text-on-surface text-[10px] font-black px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm border border-outline-variant/10">{meal.category}</span>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-lg font-black mb-1 text-on-surface">{meal.name}</h3>
                                <p className="text-xs text-on-surface-variant font-medium mb-3 flex-1">{meal.desc}</p>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-amber-500 text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                    <span className="text-xs font-bold text-on-surface">{meal.rating}</span>
                                    <span className="text-xs text-on-surface-variant">• {meal.vendor}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-primary">₹{meal.price}</span>
                                    <button onClick={() => addToCart(meal)} className="bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all shadow-md shadow-primary/20 hover:shadow-lg">Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Meals;
