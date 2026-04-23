import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productsData } from '../data/shop';

const Cart = () => {
    // Initial mock cart items (first 3 items from productsData)
    const [cartItems, setCartItems] = useState([
        { ...productsData[0], quantity: 1 },
        { ...productsData[1], quantity: 2 },
        { ...productsData[2], quantity: 1 }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [isApplied, setIsApplied] = useState(false);

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 75 ? 0 : 15;
    const tax = subtotal * 0.1;
    const discount = isApplied ? subtotal * 0.15 : 0;
    const total = subtotal + shipping + tax - discount;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black pt-20">
            <Navbar />

            <motion.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto px-4 md:px-8 py-12"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                            Your <span className="text-[#b0f020]">Cart</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">
                            {cartItems.length} items in your selection
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#b0f020] transition-colors"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Continue Shopping
                    </Link>
                </div>

                {cartItems.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        variants={itemVariants}
                                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                        className="bg-[#121612] border border-white/5 rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#b0f020]/20 transition-all"
                                    >
                                        {/* Product Image */}
                                        <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-[#0a0d0a] shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 w-full text-center sm:text-left">
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                                                <div>
                                                    <span className="text-[#b0f020] text-[10px] font-black uppercase tracking-widest mb-1 block">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                                </div>
                                                <div className="text-xl font-black text-[#b0f020]">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center bg-[#0a0d0a] rounded-xl border border-white/5 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center gap-2 text-xs font-bold text-red-500/60 hover:text-red-500 transition-colors uppercase tracking-widest"
                                                >
                                                    <Trash2 size={14} />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-1"
                        >
                            <div className="bg-[#121612] border border-white/5 rounded-[2.5rem] p-8 sticky top-28">
                                <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-white">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Estimated Tax (10%)</span>
                                        <span className="text-white">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 font-medium">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-[#b0f020] font-bold" : "text-white"}>
                                            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    {isApplied && (
                                        <div className="flex justify-between text-[#b0f020] font-medium">
                                            <span>Discount (15%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="h-px bg-white/5 my-6"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold">Total</span>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-[#b0f020] tracking-tighter italic">
                                                ${total.toFixed(2)}
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                                USD Inc. VAT
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="mb-8">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Promo Code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-[#b0f020] transition-all"
                                        />
                                        <button
                                            onClick={() => promoCode.toUpperCase() === 'FIT15' && setIsApplied(true)}
                                            className="absolute right-2 top-2 bottom-2 px-4 bg-[#1c221c] rounded-xl text-xs font-black uppercase tracking-widest hover:text-[#b0f020] transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {promoCode && promoCode.toUpperCase() !== 'FIT15' && !isApplied && (
                                        <p className="text-[10px] text-red-500 font-bold mt-2 ml-2 uppercase tracking-widest">Invalid Code</p>
                                    )}
                                </div>

                                <Link to="/checkout" className="w-full bg-[#b0f020] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-[#9de018] shadow-[0_20px_40px_rgba(176,240,32,0.15)] hover:shadow-[0_20px_40_rgba(176,240,32,0.25)] transition-all transform hover:-translate-y-1">
                                    Proceed to Checkout
                                    <ArrowRight size={18} />
                                </Link>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <ShieldCheck size={20} className="text-gray-500" />
                                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Secure Payment</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <Truck size={20} className="text-gray-500" />
                                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Fast Delivery</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <CreditCard size={20} className="text-gray-500" />
                                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Easy Returns</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#121612] border border-white/5 rounded-[3rem] p-12 md:p-24 text-center flex flex-col items-center"
                    >
                        <div className="w-24 h-24 bg-[#b0f020]/10 rounded-full flex items-center justify-center mb-8">
                            <ShoppingBag size={40} className="text-[#b0f020]" />
                        </div>
                        <h2 className="text-3xl font-black uppercase italic mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 max-w-sm mb-12 font-medium">
                            Looks like you haven't added any elite performance gear yet. Start your journey now.
                        </p>
                        <Link
                            to="/shop"
                            className="bg-[#b0f020] text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-[#9de018] transition-all"
                        >
                            Return to Shop
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                )}
            </motion.main>

            <Footer />
        </div>
    );
};

export default Cart;
