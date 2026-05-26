import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Calendar, MapPin, Activity, ShieldCheck, Ticket, LayoutDashboard, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ConfirmationBooking = () => {
    const location = useLocation();
    
    // safe fallback values
    const {
        gymName = "FitSphere Elite",
        selectedDate = new Date().toISOString().split('T')[0],
        sessionType = "Personal Training",
        cardNumber = "4321",
        cardName = "Guest User",
        totalAmount = "91.20 EGP",
        bookingRef = "FS-BK-721839"
    } = location.state || {};

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black">
            <Navbar />

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto flex flex-col items-center">
                
                {/* Checkmark Animation */}
                <div className="relative mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-[#b0f020] flex items-center justify-center shadow-lg shadow-[#b0f020]/25 z-10 relative"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        >
                            <Check className="text-black" size={48} strokeWidth={3} />
                        </motion.div>
                    </motion.div>
                    
                    {/* Glowing Pulse Rings */}
                    <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 bg-[#b0f020]/30 rounded-full blur-md"
                    />
                </div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center space-y-3 mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Booking Confirmed!</h1>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Your session has been successfully booked. A confirmation access pass and invoice has been sent to your email.
                    </p>
                </motion.div>

                {/* Booking summary receipt card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full bg-[#121612] border border-[#1c221c] rounded-[32px] overflow-hidden shadow-2xl mb-12"
                >
                    {/* Header */}
                    <div className="p-8 bg-gradient-to-r from-[#1c221c] to-[#121612] border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Ticket className="text-[#b0f020]" size={22} />
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Booking ID</p>
                                <p className="font-mono text-sm font-bold text-white">{bookingRef}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider self-start md:self-auto">
                            <ShieldCheck size={14} /> Paid Securely
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left Side: Booking Information */}
                            <div className="lg:col-span-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/5">
                                    {/* Gym details */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12} /> Gym Location</span>
                                        <h3 className="font-black text-lg text-white uppercase">{gymName}</h3>
                                        <p className="text-gray-400 text-xs font-medium">FitSphere Premium Partner Club</p>
                                    </div>

                                    {/* Session details */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5"><Activity size={12} /> Workout Session</span>
                                        <h3 className="font-black text-lg text-[#b0f020] uppercase">{sessionType}</h3>
                                        <p className="text-gray-400 text-xs font-medium">1-on-1 Specialist Coaching</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                                    {/* Date */}
                                    <div>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Appointment Date</span>
                                        <p className="font-bold text-sm text-white flex items-center gap-2">
                                            <Calendar size={14} className="text-[#b0f020]" />
                                            {selectedDate}
                                        </p>
                                    </div>

                                    {/* Payment */}
                                    <div>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Payment Method</span>
                                        <p className="font-bold text-sm text-white font-mono flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-white/10 flex items-center justify-center text-[6px] font-black text-white/50">V</span>
                                            Visa ending in •••• {cardNumber}
                                        </p>
                                    </div>

                                    {/* Total Price */}
                                    <div>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Amount Paid</span>
                                        <p className="font-black text-lg text-[#b0f020] font-mono">{totalAmount?.toString().replace('$', '').replace(' EGP', '')} EGP</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: QR Code Pass */}
                            <div className="lg:col-span-4 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-8">
                                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-inner relative group hover:border-[#b0f020]/30 transition-all duration-300">
                                    <QRCodeSVG 
                                        value={JSON.stringify({ ref: bookingRef, gym: gymName, date: selectedDate, session: sessionType })}
                                        size={140}
                                        bgColor={"transparent"}
                                        fgColor={"#b0f020"}
                                        level={"H"}
                                        includeMargin={false}
                                    />
                                </div>
                                <div className="mt-6 mb-2 overflow-hidden px-2 opacity-90">
                                    <Barcode 
                                        value={bookingRef} 
                                        width={1.2} 
                                        height={35} 
                                        background="transparent" 
                                        lineColor="#b0f020" 
                                        displayValue={false} 
                                        margin={0}
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Entry Access Pass</p>
                                    <p className="text-[8px] text-gray-600 mt-1 leading-relaxed max-w-[150px] mx-auto font-medium">Scan QR Code or Barcode at gym reception desk to check-in.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Redirect Controls */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                >
                    <Link
                        to="/member-dashboard"
                        className="px-8 py-4 bg-[#b0f020] hover:bg-[#9de018] text-black font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-[#b0f020]/10 flex items-center justify-center gap-2 group transition-all"
                    >
                        <LayoutDashboard size={16} />
                        Go to Dashboard
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    
                    <Link
                        to="/gyms"
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                        Browse Other Gyms
                    </Link>
                </motion.div>

            </div>

            <Footer />
        </div>
    );
};

export default ConfirmationBooking;
