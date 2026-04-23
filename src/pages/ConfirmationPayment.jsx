import React from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle, 
    ArrowRight, 
    Download, 
    ShoppingBag, 
    Package, 
    Mail,
    Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ConfirmationPayment = () => {
    // Generate a random order number
    const orderNumber = "FS-" + Math.floor(Math.random() * 900000 + 100000);
    
    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black pt-20">
            <Navbar />

            <motion.main 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center"
            >
                {/* Success Animation Container */}
                <div className="relative mb-12">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-24 h-24 bg-[#b0f020] rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(176,240,32,0.3)]"
                    >
                        <CheckCircle size={48} className="text-black" />
                    </motion.div>
                    
                    {/* Floating decorative elements */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-4 left-1/4 w-3 h-3 bg-[#b0f020]/20 rounded-full"
                    />
                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#b0f020]/40 rounded-full"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-[#b0f020] text-xs font-black uppercase tracking-[0.3em] mb-4 block">Order Confirmed</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter italic mb-6">
                        Thank You For <br />
                        <span className="text-[#b0f020]">Joining The Elite</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                        Your order <span className="text-white font-bold">{orderNumber}</span> has been successfully processed. A confirmation email with tracking details has been sent to your inbox.
                    </p>

                    {/* Order Details Card */}
                    <div className="bg-[#121612] border border-white/5 rounded-[2.5rem] p-8 mb-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <Package size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
                            </div>
                            <p className="text-sm font-bold text-[#b0f020]">Processing</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <Mail size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                            </div>
                            <p className="text-sm font-bold truncate">athlete@fitsphere.com</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <Download size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Invoice</span>
                            </div>
                            <button className="text-sm font-bold hover:text-[#b0f020] transition-colors">Download</button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                <Share2 size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Share</span>
                            </div>
                            <button className="text-sm font-bold hover:text-[#b0f020] transition-colors">Share Order</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/profile" 
                            className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                        >
                            <ShoppingBag size={18} />
                            Order History
                        </Link>
                        <Link 
                            to="/shop" 
                            className="w-full sm:w-auto bg-[#b0f020] text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#9de018] shadow-[0_20px_40px_rgba(176,240,32,0.15)] transition-all flex items-center justify-center gap-3"
                        >
                            Return to Shop
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>

                {/* Newsletter Shortcut */}
                <div className="mt-24 pt-12 border-t border-white/5">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Join our community for training tips</p>
                    <div className="flex items-center justify-center gap-4 text-gray-400">
                        <a href="#" className="hover:text-[#b0f020] transition-colors">Instagram</a>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <a href="#" className="hover:text-[#b0f020] transition-colors">Discord</a>
                        <span className="w-1 h-1 bg-gray-700 rounded-full" />
                        <a href="#" className="hover:text-[#b0f020] transition-colors">Twitter</a>
                    </div>
                </div>
            </motion.main>

            <Footer />
        </div>
    );
};

export default ConfirmationPayment;
