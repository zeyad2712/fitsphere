import React, { useState, useEffect } from 'react';
import { 
    Calendar, MapPin, Activity, Ticket, Clock, CreditCard,
    X, CheckCircle2, ChevronRight, XCircle, Info, Menu, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import SidebarDashboard from '../../components/SidebarDashboard';

const MyBookings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState('All');
    
    // Pass modal states
    const [selectedBooking, setSelectedBooking] = useState(null);
    
    // Cancellation states
    const [cancellingBooking, setCancellingBooking] = useState(null);

    // Initial mock bookings to populate if no bookings exist yet
    const defaultBookings = [
        {
            id: "FS-BK-918231",
            gymName: "FitSphere Elite",
            gymPrice: "80 EGP/mo",
            selectedDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days in future
            sessionType: "Personal Training",
            cardNumber: "1111",
            cardName: "Ziad Waleed",
            totalAmount: "91.20 EGP",
            status: "Upcoming",
            createdAt: new Date().toISOString()
        },
        {
            id: "FS-BK-409121",
            gymName: "PowerHouse Gym",
            gymPrice: "120 EGP/mo",
            selectedDate: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0], // 3 days in past
            sessionType: "Personal Training",
            cardNumber: "2222",
            cardName: "Ziad Waleed",
            totalAmount: "136.80 EGP",
            status: "Completed",
            createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
        }
    ];

    // Load bookings from localStorage or set defaults
    useEffect(() => {
        const stored = localStorage.getItem('fitSphere_bookings');
        if (stored) {
            try {
                setBookings(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing bookings:", err);
                setBookings(defaultBookings);
            }
        } else {
            // Set defaults to localStorage if empty
            localStorage.setItem('fitSphere_bookings', JSON.stringify(defaultBookings));
            setBookings(defaultBookings);
        }
    }, []);

    // Filter bookings based on selected tab
    const filteredBookings = bookings.filter(b => {
        if (filter === 'All') return true;
        return b.status.toLowerCase() === filter.toLowerCase();
    });

    // Handle booking cancellation
    const confirmCancelBooking = () => {
        if (!cancellingBooking) return;
        
        const updatedBookings = bookings.map(b => {
            if (b.id === cancellingBooking.id) {
                return { ...b, status: 'Cancelled' };
            }
            return b;
        });

        setBookings(updatedBookings);
        localStorage.setItem('fitSphere_bookings', JSON.stringify(updatedBookings));
        setCancellingBooking(null);
        
        // Close ticket modal as well if open
        if (selectedBooking && selectedBooking.id === cancellingBooking.id) {
            setSelectedBooking(prev => ({ ...prev, status: 'Cancelled' }));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex min-h-screen bg-[#0a0d0a] text-white font-sans selection:bg-[#b0f020] selection:text-black">
            {/* Sidebar */}
            <SidebarDashboard 
                isSidebarOpen={isSidebarOpen} 
                role="member" 
                activeTab="bookings" 
            />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'}`}>
                
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0d0a]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden md:block">
                            <Menu size={20} className="text-gray-400" />
                        </button>
                        <h2 className="text-xl font-bold uppercase tracking-tight">My Bookings</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-full border-2 border-[#b0f020]/20 p-0.5">
                            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    
                    {/* Filters & Navigation Tabs */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 overflow-x-auto no-scrollbar">
                        <div className="flex gap-4">
                            {['All', 'Upcoming', 'Completed', 'Cancelled'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all relative ${
                                        filter === tab 
                                        ? 'bg-[#b0f020]/10 border border-[#b0f020]/30 text-[#b0f020]' 
                                        : 'border border-transparent text-gray-500 hover:text-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 font-bold hidden sm:block">
                            {filteredBookings.length} {filteredBookings.length === 1 ? 'Booking' : 'Bookings'}
                        </div>
                    </div>

                    {/* Bookings Grid */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {filteredBookings.map((booking) => (
                            <motion.div
                                key={booking.id}
                                variants={itemVariants}
                                className="bg-[#121612] border border-[#1c221c] rounded-3xl p-6 relative overflow-hidden group hover:border-[#b0f020]/20 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    {/* Card Header Status */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-1 text-gray-500 font-mono text-[10px] font-bold">
                                            <Ticket size={12} /> {booking.id}
                                        </div>
                                        
                                        {/* Status Badge */}
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                                            booking.status === 'Upcoming' 
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                            : booking.status === 'Completed'
                                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                        }`}>
                                            {booking.status === 'Upcoming' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>}
                                            {booking.status}
                                        </span>
                                    </div>

                                    {/* Gym Name & Details */}
                                    <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#b0f020] transition-colors mb-4">
                                        {booking.gymName}
                                    </h3>

                                    <div className="space-y-3 text-xs text-gray-400 mb-6">
                                        <div className="flex items-center gap-2.5">
                                            <Calendar size={14} className="text-[#b0f020]" />
                                            <span>Date: <strong className="text-white">{booking.selectedDate}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Activity size={14} className="text-[#b0f020]" />
                                            <span>Session: <strong className="text-white">{booking.sessionType}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <CreditCard size={14} className="text-gray-500" />
                                            <span>Amount Paid: <strong className="text-white font-mono">{booking.totalAmount}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions footer */}
                                <div className="flex gap-3 pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => setSelectedBooking(booking)}
                                        className="flex-1 bg-white/5 hover:bg-[#b0f020] hover:text-black py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-white/5 hover:border-transparent flex items-center justify-center gap-1.5"
                                    >
                                        <Ticket size={14} /> View Pass Pass
                                    </button>
                                    
                                    {booking.status === 'Upcoming' && (
                                        <button
                                            onClick={() => setCancellingBooking(booking)}
                                            className="px-4 py-3 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-xl text-xs font-bold transition-all border border-red-500/10 hover:border-transparent"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {filteredBookings.length === 0 && (
                            <div className="col-span-full py-16 text-center bg-[#121612]/30 border border-dashed border-[#1c221c] rounded-[32px] space-y-4">
                                <AlertCircle className="mx-auto text-gray-600" size={40} />
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg text-gray-400">No Bookings Found</h4>
                                    <p className="text-gray-600 text-xs">There are no {filter !== 'All' ? filter.toLowerCase() : ''} bookings registered in your account.</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Modal: View Pass / QR Code */}
            <AnimatePresence>
                {selectedBooking && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBooking(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Pass Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-[#121612] border border-[#1c221c] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl z-10"
                        >
                            {/* Card Header styling as stub header */}
                            <div className="bg-gradient-to-r from-[#1c221c] to-[#121612] p-6 border-b border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Ticket className="text-[#b0f020]" size={20} />
                                    <span className="font-mono text-xs font-bold uppercase tracking-wider">{selectedBooking.id}</span>
                                </div>
                                <button onClick={() => setSelectedBooking(null)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Ticket details body */}
                            <div className="p-8 space-y-6 flex flex-col items-center">
                                
                                {/* Client QR Code */}
                                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-inner mb-2">
                                    <QRCodeSVG 
                                        value={JSON.stringify({ 
                                            ref: selectedBooking.id, 
                                            gym: selectedBooking.gymName, 
                                            date: selectedBooking.selectedDate, 
                                            session: selectedBooking.sessionType 
                                        })}
                                        size={140}
                                        bgColor={"transparent"}
                                        fgColor={"#b0f020"}
                                        level={"H"}
                                        includeMargin={false}
                                    />
                                </div>

                                <div className="text-center space-y-1">
                                    <h3 className="text-lg font-black uppercase text-white tracking-tight">{selectedBooking.gymName}</h3>
                                    <span className="px-2.5 py-0.5 bg-[#b0f020]/10 text-[#b0f020] rounded-full text-[9px] font-black uppercase tracking-wider">
                                        {selectedBooking.sessionType}
                                    </span>
                                </div>

                                {/* Summary details grid */}
                                <div className="w-full space-y-3 bg-black/20 p-4 rounded-2xl border border-white/5 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-bold uppercase">Date:</span>
                                        <span className="font-semibold text-gray-300">{selectedBooking.selectedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 font-bold uppercase">Paid:</span>
                                        <span className="font-semibold font-mono text-gray-300">{selectedBooking.totalAmount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 font-bold uppercase">Status:</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${
                                            selectedBooking.status === 'Upcoming' 
                                            ? 'bg-green-500/10 text-green-400' 
                                            : selectedBooking.status === 'Completed'
                                            ? 'bg-blue-500/10 text-blue-400'
                                            : 'bg-red-500/10 text-red-400'
                                        }`}>
                                            {selectedBooking.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Warning note */}
                                <p className="text-[9px] text-gray-600 text-center leading-relaxed">
                                    Present this pass at the reception counter. Cancellation is only available up to 24 hours prior to appointment.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Dialog: Confirm Cancellation */}
            <AnimatePresence>
                {cancellingBooking && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCancellingBooking(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Modal Warning Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-[#121612] border border-[#1c221c] w-full max-w-sm rounded-[32px] p-8 shadow-2xl z-10 text-center space-y-6"
                        >
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-500">
                                <XCircle size={32} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold uppercase tracking-tight">Cancel Booking</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    Are you sure you want to cancel your session at <strong className="text-white">{cancellingBooking.gymName}</strong> on <strong className="text-white">{cancellingBooking.selectedDate}</strong>? This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setCancellingBooking(null)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 py-3.5 rounded-xl text-xs font-bold uppercase transition-all"
                                >
                                    Dismiss
                                </button>
                                <button
                                    onClick={confirmCancelBooking}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-xl text-xs font-bold uppercase transition-all shadow-lg shadow-red-500/10"
                                >
                                    Yes, Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyBookings;
