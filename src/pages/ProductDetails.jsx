import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Truck, CheckCircle2, ChevronRight, ShoppingCart, Minus, Plus, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
// import ShopHeader from '../components/ShopHeader';
import Footer from '../components/Footer';
import { productsData } from '../data/shop';

const ProductDetails = () => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === parseInt(id)) || productsData[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const [activeTab, setActiveTab] = useState('Description');
    const [quantity, setQuantity] = useState(1);

    // Mock options based on category to match design dynamically
    const [selectedFlavor, setSelectedFlavor] = useState('Double Chocolate');
    const [selectedSize, setSelectedSize] = useState('5 lbs');

    const flavors = ['Double Chocolate', 'Vanilla Bean', 'Strawberry Swirl'];
    const sizes = ['2 lbs', '5 lbs', '10 lbs'];

    const apparelSizes = ['S', 'M', 'L', 'XL'];
    const [selectedApparelSize, setSelectedApparelSize] = useState('M');

    // Breadcrumbs
    const breadcrumbs = [
        { name: 'Home', link: '/' },
        { name: 'Shop', link: '/shop' },
        { name: product.category, link: '/shop' },
        { name: product.name, link: '#' },
    ];

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black pt-24 text-left">
            <Navbar />
            {/* <ShopHeader /> */}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Top Navigation */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
                    <nav className="flex text-xs font-medium text-gray-500">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.name} className="flex items-center">
                            <Link to={crumb.link} className={`hover:text-white transition-colors ${index === breadcrumbs.length - 1 ? 'text-[#b0f020]' : ''}`}>
                                {crumb.name}
                            </Link>
                            {index < breadcrumbs.length - 1 && <ChevronRight size={14} className="mx-2 opacity-50" />}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 flex flex-col lg:flex-row gap-12 lg:gap-16">

                {/* Images */}
                <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto w-full md:w-20 shrink-0 custom-scrollbar pb-2 md:pb-0">
                        {[1, 2, 3, 4].map((item) => (
                            <button key={item} className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 ${item === 1 ? 'border-[#b0f020]' : 'border-transparent opacity-60 hover:opacity-100'} bg-[#121612] transition-all`}>
                                <img src={product.image} alt={`Thumbnail ${item}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="flex-1 bg-[#0a0d0a] rounded-3xl overflow-hidden flex items-center justify-center border border-white/5 relative min-h-[400px] md:min-h-[500px]">
                        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>

                {/* Details */}
                <div className="w-full lg:w-[450px] shrink-0">
                    {product.badge && (
                        <div className="flex items-center gap-2 mb-3 text-[#b0f020] text-[10px] font-bold tracking-widest uppercase">
                            <Star size={12} fill="currentColor" /> {product.badge}
                        </div>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#b0f020" : "none"} className={i < Math.floor(product.rating) ? "text-[#b0f020]" : "text-gray-600"} />
                            ))}
                        </div>
                        <span className="text-sm font-bold">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
                    </div>

                    <div className="flex flex-wrap items-end gap-4 mb-8">
                        <span className="text-4xl mb-1 font-bold text-[#b0f020]">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <>
                                <span className="text-lg text-gray-500 line-through mb-1.5">${product.originalPrice.toFixed(2)}</span>
                                <span className="bg-[#1c221c] text-[#b0f020] text-xs font-bold px-2 py-1 rounded mb-2">
                                    SAVE {Math.round((1 - product.price / product.originalPrice) * 100)}%
                                </span>
                            </>
                        )}
                    </div>

                    {/* Options Mapping based on Category */}
                    {product.category === 'SUPPLEMENTS' ? (
                        <>
                            <div className="mb-6">
                                <span className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-3 block">Flavor</span>
                                <div className="flex flex-wrap gap-3">
                                    {flavors.map(flavor => (
                                        <button
                                            key={flavor}
                                            onClick={() => setSelectedFlavor(flavor)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedFlavor === flavor ? 'border-[#b0f020] text-[#b0f020] bg-[#1c221c]' : 'border-gray-700 text-gray-300 hover:border-gray-500'}`}
                                        >
                                            {flavor}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-8">
                                <span className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-3 block">Size</span>
                                <div className="flex gap-3">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedSize === size ? 'border-[#b0f020] text-[#b0f020] bg-[#1c221c]' : 'border-gray-700 text-gray-300 hover:border-gray-500'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="mb-8">
                            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-3 block">Size</span>
                            <div className="flex gap-3">
                                {apparelSizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedApparelSize(size)}
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${selectedApparelSize === size ? 'border-[#b0f020] text-[#b0f020] bg-[#1c221c]' : 'border-gray-700 text-gray-300 hover:border-gray-500'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center bg-[#121612] border border-[#1c221c] rounded-full px-2">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>
                        <button className="flex-1 bg-[#b0f020] text-[#0a0d0a] font-bold rounded-full py-3 px-6 flex items-center justify-center gap-2 hover:bg-[#9de018] shadow-[0_0_20px_rgba(176,240,32,0.2)] transition-all transform hover:-translate-y-0.5">
                            <ShoppingCart size={18} /> Add to Cart
                        </button>
                    </div>

                    <button className="w-full bg-white text-black font-bold rounded-full py-4 px-6 hover:bg-gray-200 transition-colors mb-8 text-sm">
                        Buy It Now
                    </button>

                    {/* Features */}
                    <div className="space-y-3 pt-6 border-t border-[#1c221c]">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <Truck size={18} className="text-[#b0f020]" />
                            <span>Free worldwide shipping on orders over $100</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <ShieldCheck size={18} className="text-[#b0f020]" />
                            <span>Third-party lab tested for purity and quality</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Content Tabs */}
            <div className="bg-[#121612] py-20 border-t border-[#1c221c]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">

                    {/* Macro Grid (Only if supplements) */}
                    {product.category === 'SUPPLEMENTS' && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            <div className="bg-[#1a211a] border border-[#2a352a] rounded-xl p-4 flex flex-col items-center text-center">
                                <span className="text-2xl font-bold text-[#b0f020] mb-1">25g</span>
                                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">PROTEIN</span>
                            </div>
                            <div className="bg-[#1a211a] border border-[#2a352a] rounded-xl p-4 flex flex-col items-center text-center">
                                <span className="text-2xl font-bold text-[#b0f020] mb-1">5.5g</span>
                                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">BCAAS</span>
                            </div>
                            <div className="bg-[#1a211a] border border-[#2a352a] rounded-xl p-4 flex flex-col items-center text-center">
                                <span className="text-2xl font-bold text-[#b0f020] mb-1">110</span>
                                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">CALORIES</span>
                            </div>
                            <div className="bg-[#1a211a] border border-[#2a352a] rounded-xl p-4 flex flex-col items-center text-center">
                                <span className="text-2xl font-bold text-[#b0f020] mb-1">0g</span>
                                <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">SUGAR</span>
                            </div>
                        </div>
                    )}

                    {/* Tabs Header */}
                    <div className="flex gap-8 border-b border-[#1c221c] overflow-x-auto custom-scrollbar mb-10">
                        {['Description', 'Ingredients', `Reviews (${product.reviews})`, 'Lab Reports'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 whitespace-nowrap text-sm font-bold relative transition-colors ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.layoutId className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b0f020]" layoutId="productTabLine" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Body */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-1 text-gray-300 leading-relaxed text-sm md:text-base space-y-6">
                            {activeTab === 'Description' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <p>Our {product.name} is engineered for maximum performance and recovery. {product.description} Through a sophisticated processes, we've developed a formula that ensures maximum bio-availability and results.</p>
                                    <p>Every batch is meticulously tested and verified to ensure you are getting exactly what is on the label, with zero fillers or unproven proprietary blends. Elevate your potential standard today.</p>
                                </motion.div>
                            )}

                            {activeTab === 'Ingredients' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <h4 className="text-white font-bold mb-2">Active Ingredients:</h4>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Premium Grade Source Component (85%)</li>
                                        <li>Natural Flavoring Systems</li>
                                        <li>Essential Amino Acid Profile</li>
                                    </ul>
                                    <p className="text-xs text-gray-500 mt-4">* No artificial sweeteners, coloring, or banned substances.</p>
                                </motion.div>
                            )}

                            {activeTab.startsWith('Reviews') && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <div className="flex items-center gap-4 border-b border-[#1c221c] pb-4">
                                        <div className="text-left">
                                            <span className="text-3xl font-bold text-white block">{product.rating}</span>
                                            <div className="flex gap-1 my-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#b0f020" : "none"} className={i < Math.floor(product.rating) ? "text-[#b0f020]" : "text-gray-600"} />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500 block">Based on {product.reviews} reviews</span>
                                        </div>
                                    </div>
                                    <p className="italic text-gray-400">"Incredible product! I've seen noticeable improvements since incorporating this into my regimen." - Verified Buyer</p>
                                </motion.div>
                            )}

                            {activeTab === 'Lab Reports' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                                    <p>Transparency is our priority. Every batch undergoes rigorous third-party testing.</p>
                                    <button className="flex items-center gap-2 text-[#b0f020] hover:text-white transition-colors text-sm font-bold mt-2">
                                        <ShieldCheck size={16} /> Download Latest Certificate of Analysis (PDF)
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Highlights Box */}
                        <div className="w-full lg:w-80 shrink-0 bg-[#1c221c] rounded-2xl p-6 border border-white/5 h-fit">
                            <h3 className="font-bold text-white mb-4">Highlights</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-[#b0f020] shrink-0" />
                                    <span>Premium quality sourced ingredients</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-[#b0f020] shrink-0" />
                                    <span>Zero Artificial Fillers</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-[#b0f020] shrink-0" />
                                    <span>Instantly Mixable</span>
                                </li>
                                {product.dietary.map(diet => (
                                    <li key={diet} className="flex items-center gap-3 text-sm text-gray-300">
                                        <CheckCircle2 size={16} className="text-[#b0f020] shrink-0" />
                                        <span>{diet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Related Products / Complement Your Routine */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-[#1c221c]">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold">Complement Your Routine</h2>
                    <Link to="/shop" className="text-sm font-bold text-[#b0f020] flex items-center gap-1 hover:text-white transition-colors">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {productsData.filter(p => p.id !== product.id).slice(0, 4).map(related => (
                        <Link to={`/product/${related.id}`} key={related.id} className="group block">
                            <div className="bg-[#0a0d0a] h-64 rounded-2xl overflow-hidden mb-4 border border-[#1c221c] group-hover:border-[#b0f020]/30 transition-colors relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none"></div>
                                <img src={related.image} alt={related.name} className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="font-bold mb-1 truncate">{related.name}</h3>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#b0f020] font-bold">${related.price.toFixed(2)}</span>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Star size={12} fill="currentColor" /> {related.rating}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
