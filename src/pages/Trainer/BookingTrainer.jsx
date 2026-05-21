import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CreditCard, Calendar, CheckCircle2, Lock, ArrowLeft, 
    ShieldCheck, Activity, MapPin, Dumbbell, Clock, User
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BookingTrainer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Safe fallback defaults if page is accessed directly
    const { 
        trainerId = 1,
        trainerName = "Marcus Vance", 
        trainerPrice = 75, 
        trainerSpecialties = ["Strength"],
        trainerImage = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop"
    } = location.state || {};

    // Form inputs state
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [isFocused, setIsFocused] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Trainer specific booking states
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]); // tomorrow
    const [selectedTime, setSelectedTime] = useState('1 month');

    const timeSlots = ['1 month', '3 months', '6 months', '1 year'];

    // Calculate Price details based on period
    let durationMultiplier = 1;
    if (selectedTime === '3 months') durationMultiplier = 3;
    if (selectedTime === '6 months') durationMultiplier = 6;
    if (selectedTime === '1 year') durationMultiplier = 12;

    const basePrice = parseFloat(trainerPrice) || 75.00;
    const cleanPrice = basePrice * durationMultiplier;
    // The Fees
    const tax = Math.round(cleanPrice * 0.14 * 100) / 100; // 14% tax
    const total = cleanPrice + tax;

    // Form validation and formatting helpers
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        setCardNumber(formatted);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 3) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setExpiry(value);
    };

    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        setCvv(value);
    };

    const validateForm = () => {
        const tempErrors = {};
        if (!cardName.trim()) tempErrors.cardName = "Cardholder name is required";
        if (cardNumber.replace(/\s/g, '').length !== 16) tempErrors.cardNumber = "Enter a valid 16-digit card number";
        
        const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expRegex.test(expiry)) {
            tempErrors.expiry = "Enter a valid expiry date (MM/YY)";
        } else {
            const [month, year] = expiry.split('/');
            const expDate = new Date(parseInt('20' + year), parseInt(month) - 1, 1);
            const today = new Date();
            today.setDate(1);
            if (expDate < today) {
                tempErrors.expiry = "This card has expired";
            }
        }

        if (cvv.length !== 3) tempErrors.cvv = "CVV must be 3 digits";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        const bookingRef = `FS-BK-${Math.floor(100000 + Math.random() * 900000)}`;
        const totalAmount = `${total.toFixed(2)} EGP`;

        // Simulate payment gateway call
        setTimeout(() => {
            setIsSubmitting(false);

            // Save booking to localStorage
            const newBooking = {
                id: bookingRef,
                gymName: `Trainer: ${trainerName}`,
                gymPrice: `${cleanPrice.toFixed(2)} EGP`,
                selectedDate: `${selectedDate} at ${selectedTime}`,
                sessionType: `${trainerSpecialties?.[0] || 'Personal Trainer'} Session`,
                cardNumber: cardNumber.slice(-4),
                cardName,
                totalAmount,
                status: 'Upcoming', // 'Upcoming', 'Completed', 'Cancelled'
                createdAt: new Date().toISOString()
            };

            try {
                const existingBookings = JSON.parse(localStorage.getItem('fitSphere_bookings') || '[]');
                existingBookings.unshift(newBooking);
                localStorage.setItem('fitSphere_bookings', JSON.stringify(existingBookings));
            } catch (err) {
                console.error("Failed to save booking:", err);
            }

            navigate('/trainer/confirmation-booking', {
                state: {
                    trainerName,
                    trainerPrice,
                    trainerSpecialties,
                    trainerImage,
                    selectedDate,
                    selectedTime,
                    cardNumber: cardNumber.slice(-4),
                    cardName,
                    totalAmount,
                    bookingRef
                }
            });
        }, 2500);
    };

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black">
            <Navbar />

            {/* Loading Overlay */}
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-6"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-[#b0f020] blur-[40px] rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="relative z-10 text-[#b0f020]"
                            >
                                <Dumbbell size={54} className="animate-pulse" />
                            </motion.div>
                        </div>
                        <h2 className="text-xl font-bold uppercase tracking-wider text-[#b0f020]">Confirming Trainer Session...</h2>
                        <p className="text-gray-400 text-xs tracking-widest uppercase">Processing Secure Payment</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-28 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
                {/* Back button */}
                <div className="mb-8">
                    <Link to="/trainers" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#b0f020] transition-colors group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-semibold">Back to Trainers</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column - Date Selection & Payment Form */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Date and Time Selector */}
                        <div className="bg-[#121612] border border-[#1c221c] p-8 rounded-3xl shadow-xl">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                                <Calendar className="text-[#b0f020]" size={20} />
                                Schedule Appointment
                            </h2>

                            <div className="space-y-6">
                                {/* Date Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Start Date</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // from tomorrow
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm font-bold text-white focus:outline-none focus:border-[#b0f020] transition-all"
                                    />
                                </div>

                                {/* Time slots */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Periods</label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setSelectedTime(time)}
                                                className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                                    selectedTime === time
                                                    ? 'bg-[#b0f020] text-black shadow-lg shadow-[#b0f020]/10'
                                                    : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
                                                }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Live Credit Card Mockup */}
                        <div className="perspective-1000">
                            <motion.div
                                animate={{ rotateY: isFocused === 'cvv' ? 180 : 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative w-full h-[220px] rounded-[24px] shadow-2xl preserve-3d transition-transform cursor-pointer"
                            >
                                {/* Card Front */}
                                <div className="absolute inset-0 w-full h-full rounded-[24px] bg-gradient-to-br from-[#1f261f] via-[#121612] to-[#253225] border border-white/10 p-6 flex flex-col justify-between backface-hidden">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase">FitSphere Member Card</p>
                                            <div className="flex gap-1 text-[#b0f020]">
                                                <Activity size={18} />
                                                <span className="text-xs font-bold tracking-widest uppercase">Access Pass</span>
                                            </div>
                                        </div>
                                        <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-black italic text-xs tracking-wider text-white/50">
                                            VISA
                                        </div>
                                    </div>

                                    {/* Chip & contactless */}
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="w-10 h-8 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-md shadow-inner flex flex-col justify-between p-1.5 opacity-80">
                                            <div className="grid grid-cols-3 gap-0.5 h-full w-full">
                                                <div className="border border-black/10 rounded-sm"></div>
                                                <div className="border border-black/10 rounded-sm"></div>
                                                <div className="border border-black/10 rounded-sm"></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0.5 opacity-40">
                                            <div className="w-4 h-0.5 bg-white rounded-full"></div>
                                            <div className="w-5 h-0.5 bg-white rounded-full ml-1"></div>
                                            <div className="w-6 h-0.5 bg-white rounded-full ml-2"></div>
                                        </div>
                                    </div>

                                    {/* Card Number */}
                                    <div className="my-2">
                                        <p className="text-xl font-bold tracking-[0.25em] font-mono text-white/95">
                                            {cardNumber || "•••• •••• •••• ••••"}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="space-y-0.5">
                                            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Cardholder</p>
                                            <p className="text-xs font-bold uppercase tracking-wider truncate max-w-[200px]">
                                                {cardName || "YOUR NAME HERE"}
                                            </p>
                                        </div>
                                        <div className="space-y-0.5 text-right">
                                            <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Expires</p>
                                            <p className="text-xs font-bold font-mono">
                                                {expiry || "MM/YY"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Back */}
                                <div className="absolute inset-0 w-full h-full rounded-[24px] bg-gradient-to-br from-[#121612] to-[#080a08] border border-white/10 p-6 flex flex-col justify-between backface-hidden rotateY-180">
                                    <div className="w-full h-10 bg-black -mx-6 mt-2 absolute top-2 left-6"></div>
                                    <div className="mt-14 space-y-4">
                                        <div className="flex items-center justify-end bg-white/5 border border-white/10 rounded-lg p-2 gap-3">
                                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">CVV / Security Code</p>
                                            <p className="text-xs font-bold font-mono text-white bg-black/40 px-2.5 py-1 rounded border border-white/5">
                                                {cvv || "•••"}
                                            </p>
                                        </div>
                                        <p className="text-[8px] text-gray-500 leading-relaxed">
                                            This card is issued by FitSphere and is subject to FitSphere terms of service. Unauthorized use is prohibited. FitSphere security protocols enabled.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Payment Card Form */}
                        <div className="bg-[#121612] border border-[#1c221c] p-8 rounded-3xl relative overflow-hidden shadow-xl">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                                <CreditCard className="text-[#b0f020]" size={20} />
                                Payment Details
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cardholder Name</label>
                                    <input
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        onFocus={() => setIsFocused('name')}
                                        placeholder="John Doe"
                                        className={`w-full bg-black/40 border ${errors.cardName ? 'border-red-500/50' : 'border-white/5'} rounded-2xl py-4 px-6 text-sm font-bold text-white focus:outline-none focus:border-[#b0f020] transition-all`}
                                    />
                                    {errors.cardName && <p className="text-red-400 text-xs font-semibold">{errors.cardName}</p>}
                                </div>

                                {/* Card Number Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            onFocus={() => setIsFocused('number')}
                                            placeholder="4000 1234 5678 9010"
                                            className={`w-full bg-black/40 border ${errors.cardNumber ? 'border-red-500/50' : 'border-white/5'} rounded-2xl py-4 px-6 pr-12 text-sm font-bold text-white focus:outline-none focus:border-[#b0f020] transition-all font-mono`}
                                        />
                                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    </div>
                                    {errors.cardNumber && <p className="text-red-400 text-xs font-semibold">{errors.cardNumber}</p>}
                                </div>

                                {/* Expiry and CVV Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Expiry Date</label>
                                        <input
                                            type="text"
                                            value={expiry}
                                            onChange={handleExpiryChange}
                                            onFocus={() => setIsFocused('expiry')}
                                            placeholder="MM/YY"
                                            className={`w-full bg-black/40 border ${errors.expiry ? 'border-red-500/50' : 'border-white/5'} rounded-2xl py-4 px-6 text-sm font-bold text-white focus:outline-none focus:border-[#b0f020] transition-all font-mono`}
                                        />
                                        {errors.expiry && <p className="text-red-400 text-xs font-semibold">{errors.expiry}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">CVV</label>
                                        <input
                                            type="password"
                                            value={cvv}
                                            onChange={handleCvvChange}
                                            onFocus={() => setIsFocused('cvv')}
                                            onBlur={() => setIsFocused('')}
                                            placeholder="•••"
                                            className={`w-full bg-black/40 border ${errors.cvv ? 'border-red-500/50' : 'border-white/5'} rounded-2xl py-4 px-6 text-sm font-bold text-white focus:outline-none focus:border-[#b0f020] transition-all font-mono`}
                                        />
                                        {errors.cvv && <p className="text-red-400 text-xs font-semibold">{errors.cvv}</p>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#b0f020] hover:bg-[#9de018] text-black font-black uppercase tracking-widest text-sm py-5 rounded-2xl shadow-lg shadow-[#b0f020]/10 transition-all active:scale-[0.98] mt-4"
                                >
                                    Confirm Session & Book
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#121612] border border-[#1c221c] p-8 rounded-3xl shadow-xl relative">
                            <h2 className="text-xl font-bold uppercase tracking-wide mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
                                <Dumbbell className="text-[#b0f020]" size={20} />
                                Booking Summary
                            </h2>

                            <div className="space-y-6 text-sm">
                                
                                {/* Trainer Name Details */}
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#1c221c] border border-white/5 shrink-0">
                                        <img src={trainerImage} alt={trainerName} className="w-full h-full object-cover grayscale opacity-90" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1"><User size={12} className="text-[#b0f020]" /> Expert Trainer</p>
                                        <h3 className="font-bold text-base text-white">{trainerName}</h3>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">{trainerSpecialties?.[0] || "Coach"}</p>
                                    </div>
                                </div>

                                {/* Booking details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#1c221c] border border-white/5 flex items-center justify-center text-gray-400 shrink-0">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Start Date</p>
                                            <p className="font-semibold text-xs text-gray-300">{selectedDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#1c221c] border border-white/5 flex items-center justify-center text-gray-400 shrink-0">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Duration Period</p>
                                            <p className="font-semibold text-xs text-gray-300">{selectedTime}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-6 space-y-3">
                                    <div className="flex justify-between text-gray-400">
                                        <span>1-on-1 Specialist Coaching</span>
                                        <span className="font-semibold font-mono text-white">{cleanPrice.toFixed(2)} EGP</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>VAT / Tax (14%)</span>
                                        <span className="font-semibold font-mono text-white">{tax.toFixed(2)} EGP</span>
                                    </div>
                                    <div className="border-t border-white/5 pt-4 flex justify-between items-end">
                                        <span className="font-black text-sm uppercase tracking-wide">Total Amount</span>
                                        <span className="text-2xl font-black font-mono text-[#b0f020]">{total.toFixed(2)} EGP</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security indicators */}
                        <div className="bg-[#121612]/40 border border-[#1c221c]/40 p-6 rounded-2xl flex items-center gap-4 text-gray-500 text-xs">
                            <Lock className="text-green-500 shrink-0" size={20} />
                            <div>
                                <h4 className="font-bold text-gray-400 mb-0.5">Secure Checkout</h4>
                                <p className="leading-relaxed">Your transaction is protected using military-grade SSL data encryption and secure key hashes.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BookingTrainer;
