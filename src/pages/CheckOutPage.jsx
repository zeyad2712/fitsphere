import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    CreditCard, 
    MapPin, 
    Truck, 
    Lock, 
    ArrowLeft, 
    CheckCircle2, 
    ShieldCheck, 
    Info,
    ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productsData } from '../data/shop';

const CheckOutPage = () => {
    const navigate = useNavigate();
    
    // Mock cart data (simulating state passed from cart)
    const cartItems = [
        { ...productsData[0], quantity: 1 },
        { ...productsData[1], quantity: 2 }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 75 ? 0 : 15;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd process payment here
        navigate('/confirmation-payment');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.1 }
        }
    };

    const sectionVariants = {
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
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 mb-12">
                    <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
                    <ChevronRight size={14} />
                    <span className="text-[#b0f020]">Checkout</span>
                    <ChevronRight size={14} />
                    <span>Payment</span>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    {/* Left Column: Form Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            
                            {/* Contact Section */}
                            <motion.section variants={sectionVariants} className="space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-10 h-10 bg-[#b0f020]/10 rounded-xl flex items-center justify-center border border-[#b0f020]/20">
                                        <Lock className="text-[#b0f020]" size={20} />
                                    </div>
                                    <h2 className="text-2xl font-bold uppercase tracking-tight italic">Contact <span className="text-[#b0f020]">Information</span></h2>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="form-group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="athlete@fitsphere.com" 
                                            className="w-full bg-[#121612] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.section>

                            {/* Shipping Section */}
                            <motion.section variants={sectionVariants} className="space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-10 h-10 bg-[#b0f020]/10 rounded-xl flex items-center justify-center border border-[#b0f020]/20">
                                        <MapPin className="text-[#b0f020]" size={20} />
                                    </div>
                                    <h2 className="text-2xl font-bold uppercase tracking-tight italic">Shipping <span className="text-[#b0f020]">Address</span></h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">First Name</label>
                                        <input 
                                            type="text" 
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="John" 
                                            className="w-full bg-[#121612] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe" 
                                            className="w-full bg-[#121612] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Street Address</label>
                                    <input 
                                        type="text" 
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Elite Street" 
                                        className="w-full bg-[#121612] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">City</label>
                                        <input 
                                            type="text" 
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="Los Angeles" 
                                            className="w-full bg-[#121612] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Zip Code</label>
                                        <input 
                                            type="text" 
                                            name="zipCode"
                                            required
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder="90001" 
                                            className="w-full bg-[#121612] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                        />
                                    </div>
                                </div>
                            </motion.section>

                            {/* Payment Section */}
                            <motion.section variants={sectionVariants} className="space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-10 h-10 bg-[#b0f020]/10 rounded-xl flex items-center justify-center border border-[#b0f020]/20">
                                        <CreditCard className="text-[#b0f020]" size={20} />
                                    </div>
                                    <h2 className="text-2xl font-bold uppercase tracking-tight italic">Payment <span className="text-[#b0f020]">Details</span></h2>
                                </div>
                                <div className="bg-[#121612] border border-white/5 rounded-3xl p-8 space-y-6">
                                    <div className="form-group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Card Number</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                name="cardNumber"
                                                required
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="0000 0000 0000 0000" 
                                                className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                            />
                                            <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Expiry Date</label>
                                            <input 
                                                type="text" 
                                                name="expiry"
                                                required
                                                value={formData.expiry}
                                                onChange={handleInputChange}
                                                placeholder="MM / YY" 
                                                className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">CVV</label>
                                            <input 
                                                type="text" 
                                                name="cvv"
                                                required
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123" 
                                                className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-[#b0f020] transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.section>

                            <button type="submit" className="w-full bg-[#b0f020] text-black py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-[#9de018] shadow-[0_20px_40px_rgba(176,240,32,0.15)] transition-all flex items-center justify-center gap-3">
                                Complete Purchase
                                <CheckCircle2 size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <motion.div variants={sectionVariants} className="lg:col-span-1">
                        <div className="bg-[#121612] border border-white/5 rounded-[2.5rem] p-8 sticky top-28 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Truck size={120} />
                            </div>
                            
                            <h2 className="text-xl font-bold mb-8 uppercase tracking-tight italic">Order <span className="text-[#b0f020]">Summary</span></h2>
                            
                            <div className="space-y-6 mb-8">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0a0d0a] shrink-0 border border-white/5">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold leading-tight">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-[10px] text-gray-500 font-black uppercase">Qty: {item.quantity}</span>
                                                <span className="text-sm font-bold text-[#b0f020]">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5 mb-8">
                                <div className="flex justify-between text-gray-400 text-sm font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm font-medium">
                                    <span>Estimated Tax (10%)</span>
                                    <span className="text-white font-bold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm font-medium">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? "text-[#b0f020] font-bold" : "text-white font-bold"}>
                                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="h-px bg-white/5 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-3xl font-black text-[#b0f020] italic tracking-tighter">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-[#0a0d0a]/50 p-4 rounded-2xl space-y-3">
                                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                                    <ShieldCheck size={16} className="text-[#b0f020]" />
                                    Secure SSL encrypted checkout
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                                    <Truck size={16} className="text-[#b0f020]" />
                                    Estimated Delivery: 2-4 Days
                                </div>
                            </div>
                        </div>

                        {/* Back to Cart */}
                        <Link to="/cart" className="flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors mt-8 text-xs font-black uppercase tracking-widest">
                            <ArrowLeft size={14} />
                            Modify Selection
                        </Link>
                    </motion.div>
                </div>
            </motion.main>

            <Footer />
        </div>
    );
};

export default CheckOutPage;
