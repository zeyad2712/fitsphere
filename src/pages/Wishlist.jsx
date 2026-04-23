import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight, ShoppingBag, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productsData } from '../data/shop';

const Wishlist = () => {
    // Initial mock wishlist items (items 4, 5, 6 from productsData)
    const [wishlistItems, setWishlistItems] = useState([
        { ...productsData[3] },
        { ...productsData[4] },
        { ...productsData[5] }
    ]);

    const removeItem = (id) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
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
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#b0f020]/10 rounded-xl flex items-center justify-center border border-[#b0f020]/20">
                                <Heart className="text-[#b0f020]" size={20} fill="#b0f020" />
                            </div>
                            <span className="text-[#b0f020] text-xs font-black uppercase tracking-[0.2em]">Favorites</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                            Your <span className="text-[#b0f020]">Wishlist</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-2">
                            Saved items you love and want to keep an eye on.
                        </p>
                    </div>

                    <Link 
                        to="/shop" 
                        className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#b0f020] transition-colors bg-[#121612] px-6 py-3 rounded-2xl border border-white/5"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Shop
                    </Link>
                </div>

                {wishlistItems.length > 0 ? (
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {wishlistItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    variants={itemVariants}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="bg-[#121612] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#b0f020]/20 transition-all flex flex-col h-full"
                                >
                                    {/* Product Image Wrapper */}
                                    <div className="relative h-72 bg-[#0a0d0a] overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                        />
                                        
                                        {/* Remove Button (Floating) */}
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all hover:scale-110"
                                            title="Remove from Wishlist"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        {/* Badge */}
                                        {item.badge && (
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-[#b0f020] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-lg">
                                                    {item.badge}
                                                </span>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121612] via-transparent to-transparent opacity-60"></div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[#b0f020] text-[10px] font-black uppercase tracking-widest">
                                                {item.category}
                                            </span>
                                            <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-lg">
                                                <Star size={12} className="text-[#b0f020]" fill="#b0f020" />
                                                <span className="text-[10px] font-bold">{item.rating}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#b0f020] transition-colors">{item.name}</h3>
                                        <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-black italic tracking-tighter">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                {item.originalPrice && (
                                                    <span className="text-xs text-gray-600 line-through font-bold">
                                                        ${item.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>

                                            <button className="flex items-center gap-3 bg-[#b0f020] text-black px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#9de018] shadow-[0_10px_20px_rgba(176,240,32,0.1)] hover:shadow-[0_10px_20px_rgba(176,240,32,0.2)] transition-all transform hover:-translate-y-1">
                                                <ShoppingCart size={16} />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#121612] border border-white/5 rounded-[3rem] p-16 md:p-32 text-center flex flex-col items-center"
                    >
                        <div className="w-24 h-24 bg-[#b0f020]/10 rounded-full flex items-center justify-center mb-10 border border-[#b0f020]/20">
                            <Heart size={40} className="text-[#b0f020]" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-6">Your wishlist is empty</h2>
                        <p className="text-gray-500 max-w-sm mb-12 font-medium leading-relaxed">
                            Start adding items you love to your wishlist and we'll keep them safe for you until you're ready.
                        </p>
                        <Link 
                            to="/shop" 
                            className="bg-[#b0f020] text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-4 hover:bg-[#9de018] shadow-[0_20px_40px_rgba(176,240,32,0.2)] transition-all"
                        >
                            Explore Shop
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                )}

                {/* Recommendations Banner */}
                {wishlistItems.length > 0 && (
                    <div className="mt-24 p-12 bg-gradient-to-br from-[#121612] to-[#0a0d0a] rounded-[3rem] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <ShoppingBag size={200} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black uppercase italic mb-4">Ready to elevate?</h2>
                            <p className="text-gray-400 max-w-md mb-8 font-medium">
                                These items are in high demand. Complete your order today and get free shipping on orders over $75.
                            </p>
                            <Link to="/cart" className="flex items-center gap-3 text-[#b0f020] font-black uppercase tracking-widest text-xs hover:underline">
                                Go to Checkout <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}
            </motion.main>

            <Footer />
        </div>
    );
};

export default Wishlist;
