import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Star, X, ShoppingCart, Activity, Dumbbell, Shirt, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
// import ShopHeader from '../components/ShopHeader';
import Footer from '../../components/Footer';
import { productsData } from '../../data/shop';

const Shop = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Products");
    const [maxPrice, setMaxPrice] = useState(100);
    const [selectedDietary, setSelectedDietary] = useState([]);
    const [sortBy, setSortBy] = useState("Popularity");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [addedItem, setAddedItem] = useState(null);
    const [wishedItem, setWishedItem] = useState(null);

    const handleAddToWishlist = (product) => {
        const savedWishlist = localStorage.getItem('fitSphere_wishlist');
        let wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : [];
        const existingItem = wishlistItems.find(item => item.id === product.id);
        
        if (!existingItem) {
            wishlistItems.push(product);
            localStorage.setItem('fitSphere_wishlist', JSON.stringify(wishlistItems));
        }
        
        setWishedItem(product);
        setTimeout(() => setWishedItem(null), 2000);
    };

    const handleAddToCart = (product) => {
        const savedCart = localStorage.getItem('fitSphere_cart');
        let cartItems = savedCart ? JSON.parse(savedCart) : [];
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('fitSphere_cart', JSON.stringify(cartItems));
        setAddedItem(product);
        setTimeout(() => setAddedItem(null), 2000);
    };

    // Filter Options
    const categories = [
        { name: "All Products", icon: null, count: 84 },
        { name: "Supplements", icon: Activity, count: 24 },
        { name: "Gear", icon: Dumbbell, count: 18 },
        { name: "Apparel", icon: Shirt, count: 42 }
    ];

    const dietaryOptions = ["Vegan Friendly", "Gluten Free", "No Sugar Added"];

    // Handlers
    const toggleDietary = (val) => {
        if (selectedDietary.includes(val)) {
            setSelectedDietary(selectedDietary.filter(item => item !== val));
        } else {
            setSelectedDietary([...selectedDietary, val]);
        }
    };

    // Filter Logic
    let filteredProducts = productsData.filter(product => {
        // Search Filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        // Category Filter
        if (selectedCategory !== "All Products" && product.category !== selectedCategory.toUpperCase()) return false;

        // Price Filter
        if (product.price > maxPrice) return false;

        // Dietary Filter (AND logic for strictly dietary)
        if (selectedDietary.length > 0) {
            const hasAllDietary = selectedDietary.every(d => product.dietary.includes(d));
            if (!hasAllDietary) return false;
        }

        return true;
    });

    // Sort Logic
    if (sortBy === 'Price: Low to High') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

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
            {/* <ShopHeader /> */}

            {/* Announcement Bar */}
            <div className="bg-[#b0f020] text-[#0a0d0a] py-2 text-xs font-bold flex justify-center items-center gap-8 uppercase tracking-wider relative z-10 w-full overflow-hidden">
                <div className="flex animate-[pulse_4s_ease-in-out_infinite] gap-8">
                    {/* <span className="flex items-center gap-2"><Star size={12} fill="currentColor" /> FREE SHIPPING ON ORDERS OVER 75 EGP</span> */}
                    <span className="hidden sm:flex items-center gap-2"><Star size={12} fill="currentColor" /> NEW ARRIVALS: 2026 PERFORMANCE COLLECTION</span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="pb-12 px-6 md:px-8 max-w-[1400px] mx-auto mt-6"
            >

                {/* Hero Banner */}
                <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-12 border border-[#1c221c]">
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600"
                        alt="Shop hero banner"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center max-w-2xl">
                        <span className="bg-[#b0f020] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded w-fit mb-4">SUMMER SALE</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Ignite Your Potential</h1>
                        <p className="text-gray-300 text-lg mb-8 max-w-md">Get up to 30% off on all pre-workout formulas and elite training equipment.</p>
                        {/* <button className="bg-[#b0f020] text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 w-fit hover:bg-[#9de018] transition-colors">
                            Shop The Collection <ArrowRight size={18} />
                        </button> */}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar Filters */}
                    <div className="w-full md:w-64 lg:w-72 shrink-0 md:sticky md:top-28 h-fit md:max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2 pb-4">
                        {/* Mobile Filter Toggle */}
                        <div
                            className="md:hidden flex items-center justify-between bg-[#121612] p-4 rounded-2xl border border-[#1c221c] cursor-pointer mb-4"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H20M6 12H18M9 18H15" stroke="#b0f020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h2 className="text-xl font-bold">Filters</h2>
                            </div>
                            {isMobileFiltersOpen ? <X size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                        </div>

                        {/* Desktop header */}
                        <div className="hidden md:flex items-center gap-2 mb-8">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M6 12H18M9 18H15" stroke="#b0f020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h2 className="text-xl font-bold">Filters</h2>
                        </div>

                        <div className={`space-y-10 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>

                            {/* Categories */}
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat.name}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${selectedCategory === cat.name ? 'bg-[#1c221c] border border-[#b0f020]/30 text-[#b0f020]' : 'text-gray-400 hover:text-white hover:bg-[#121612]'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {cat.name === "All Products" ? (
                                                <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                                                    <div className="bg-current rounded-[2px]" /><div className="bg-current rounded-[2px]" />
                                                    <div className="bg-current rounded-[2px]" /><div className="bg-current rounded-[2px]" />
                                                </div>
                                            ) : cat.icon && <cat.icon size={18} />}
                                            <span className="font-bold text-sm tracking-wide">{cat.name}</span>
                                        </div>
                                        <span className="text-xs font-semibold opacity-60">{cat.count}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Price Range</h3>
                                <input
                                    type="range"
                                    min="0"
                                    max="150"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#b0f020]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                                    <span>0 EGP</span>
                                    <span className="text-white bg-[#1c221c] px-2 py-0.5 rounded">{maxPrice} EGP</span>
                                    <span>150+ EGP</span>
                                </div>
                            </div>

                            {/* Dietary Needs */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Dietary Needs</h3>
                                <div className="space-y-3">
                                    {dietaryOptions.map(option => (
                                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedDietary.includes(option)}
                                                onChange={() => toggleDietary(option)}
                                            />
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${selectedDietary.includes(option) ? 'bg-[#b0f020] border-[#b0f020]' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                                {selectedDietary.includes(option) && (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0d0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Show Results Button */}
                            <div className="md:hidden pt-4 pb-2 border-t border-[#1c221c]">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full bg-[#b0f020] text-[#0f120f] py-3 rounded-xl font-bold text-sm"
                                >
                                    Show {filteredProducts.length} Results
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold mb-1">All Products</h1>
                                <p className="text-gray-400 text-sm">Showing 1-{filteredProducts.length} of 84 results</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4 mt-4 sm:mt-0">
                                {/* Sort Filter */}
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className="text-sm text-gray-400 shrink-0">Sort by:</span>
                                    <div className="relative w-full sm:w-auto">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none w-full bg-[#161c16] border border-[#2a352a] rounded-full py-2 pl-4 pr-10 text-sm font-medium focus:outline-none focus:border-[#b0f020] cursor-pointer"
                                        >
                                            <option value="Popularity" className="bg-[#0a0d0a]">Popularity</option>
                                            <option value="Price: Low to High" className="bg-[#0a0d0a]">Price: Low to High</option>
                                            <option value="Price: High to Low" className="bg-[#0a0d0a]">Price: High to Low</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                            >
                                {filteredProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        variants={itemVariants}
                                        className="bg-[#121612] border border-[#1c221c] rounded-3xl overflow-hidden hover:border-[#2a352a] transition-all flex flex-col group relative"
                                    >
                                        {/* Badges */}
                                        {product.badge && (
                                            <div className="absolute top-4 left-4 z-1000">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded bg-[#0a0d0a] uppercase tracking-wider ${product.badge === 'BEST SELLER' ? 'text-[#b0f020]' : 'text-white'}`}>
                                                    {product.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Wishlist */}
                                        <button 
                                            onClick={() => handleAddToWishlist(product)}
                                            className="absolute top-4 right-4 z-1000 p-2 rounded-full bg-black/40 backdrop-blur border border-white/5 text-gray-300 hover:text-white hover:bg-black/60 transition-colors"
                                        >
                                            <Heart size={16} fill={wishedItem?.id === product.id ? "#ef4444" : "transparent"} className={wishedItem?.id === product.id ? "text-red-500" : ""} />
                                        </button>

                                        {/* Image */}
                                        <div className="relative h-60 bg-[#0a0d0a] flex items-center justify-center overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#121612] to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[#b0f020] text-[10px] font-bold uppercase tracking-wider">{product.category}</span>
                                                <div className="flex items-center gap-1">
                                                    <Star fill="currentColor" className="text-white w-3 h-3" />
                                                    <span className="text-xs font-bold text-white">{product.rating}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold mb-2 line-clamp-1">{product.name}</h3>
                                            <p className="text-xs text-gray-400 mb-6 flex-1 line-clamp-2 leading-relaxed">
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between border-t border-[#1c221c] pt-4 mt-auto gap-4">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold">{product.price.toFixed(2)} EGP</span>
                                                    </div>
                                                    {product.originalPrice && (
                                                        <span className="text-xs text-gray-500 line-through">{product.originalPrice.toFixed(2)} EGP</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link to={`/product/${product.id}`} className="px-4 py-2 bg-[#1c221c] text-white text-xs font-bold rounded-lg hover:bg-[#2a352a] transition-colors border border-white/5">
                                                        View Details
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleAddToCart(product)}
                                                        className="h-9 w-9 flex items-center justify-center rounded-lg bg-[#b0f020] text-black hover:bg-[#9de018] shadow-lg shadow-[#b0f020]/20 transition-all transform hover:scale-105 shrink-0"
                                                    >
                                                        {addedItem?.id === product.id ? <CheckCircle2 size={16} /> : <ShoppingCart size={16} />}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-[#121612] border border-[#1c221c] rounded-3xl">
                                <h3 className="text-xl font-bold mb-2">No Products Found</h3>
                                <p className="text-gray-400 text-sm">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory("All Products");
                                        setMaxPrice(150);
                                        setSelectedDietary([]);
                                        setSearchTerm("");
                                    }}
                                    className="mt-6 px-6 py-2 bg-[#1c221c] rounded-full text-sm font-bold hover:text-[#b0f020]"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Added to Cart Popup Toast */}
            <AnimatePresence>
                {addedItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed top-8 right-8 z-50 bg-[#b0f020] text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-bold"
                    >
                        <CheckCircle2 size={28} />
                        <div>
                            <p className="text-lg">Added to Cart!</p>
                            <p className="text-sm font-medium opacity-80">1x {addedItem.name}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Added to Wishlist Popup Toast */}
            <AnimatePresence>
                {wishedItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed top-28 right-8 z-50 bg-[#121612] border border-white/10 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-bold"
                    >
                        <Heart size={28} className="text-red-500" fill="#ef4444" />
                        <div>
                            <p className="text-lg">Added to Wishlist!</p>
                            <p className="text-sm font-medium opacity-80">{wishedItem.name}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Shop;
