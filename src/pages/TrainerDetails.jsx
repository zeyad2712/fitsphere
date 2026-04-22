import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useInView, animate } from 'framer-motion';
import { MapPin, Star, Award, ShieldCheck, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { trainersData } from '../data/trainers';

const Counter = ({ value }) => {
    const count = useMotionValue(0);
    const strValue = value.toString();
    const suffix = strValue.match(/[A-Za-z+]+$/)?.[0] || '';
    const numericPart = parseFloat(strValue.replace(/[^0-9.]/g, ''));

    const rounded = useTransform(count, (latest) => {
        // preserve decimal for float ratings like 4.9, otherwise use floor
        const num = strValue.includes('.') ? Number(latest.toFixed(1)) : Math.floor(latest);
        const formatted = strValue.includes(',') ? num.toLocaleString() : num;
        return formatted + suffix;
    });

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, numericPart, {
                duration: 2,
                ease: "easeOut",
                delay: 0.2
            });
            return () => controls.stop();
        }
    }, [isInView, numericPart, count]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const TrainerProfile = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('About');

    // Find trainer or return mock data if not found (for robustness)
    const trainer = trainersData.find(t => t.id === parseInt(id)) || trainersData[0];

    // Mock extra data that isn't in trainers.js yet based on ID to make the design match perfectly
    const sessionsDone = (trainer.id * 150 + 1200) || "2.4k+";
    const activeClients = (trainer.id * 8 + 30) || "180";
    const yearsExp = (trainer.id + 4) || "9";

    const tabs = ['About', 'Programs'];

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black">
            <Navbar />

            <div className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <Link to="/trainers" className="flex items-center gap-2 text-gray-400 hover:text-[#b0f020] transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to trainers</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="p-2.5 rounded-full bg-[#1c221c] border border-white/5 hover:bg-[#252a25] transition-colors">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2.5 rounded-full bg-[#1c221c] border border-white/5 hover:bg-[#252a25] transition-colors text-red-500">
                            <Heart size={18} />
                        </button>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column (Main Details) - taking up full width as requested to ignore right bar */}
                    <div className="flex-1 max-w-4xl mx-auto w-full space-y-8">

                        {/* Hero Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-[#172017] to-[#121612] border border-[#1c221c] rounded-[32px] p-6 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden"
                        >
                            {/* Glow Effect behind avatar */}
                            <div className="absolute top-1/2 left-20 -translate-y-1/2 w-48 h-48 bg-[#b0f020] opacity-[0.15] blur-[80px] rounded-full pointer-events-none"></div>

                            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-[24px] rounded-bl-none overflow-hidden shrink-0 border border-[#b0f020]/20 shadow-[0_0_30px_rgba(176,240,32,0.15)] bg-gradient-to-b from-[#b0f020]/10 to-[#b0f020]/5 pt-4">
                                <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover object-bottom" />
                            </div>

                            <div className="flex-1 flex flex-col pt-2 text-center sm:text-left z-10">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 flex items-center justify-center sm:justify-start gap-3">
                                    {trainer.name}
                                    <ShieldCheck className="text-[#b0f020] mt-1 shrink-0" size={28} />
                                </h1>
                                <p className="text-gray-400 text-base sm:text-lg mb-6">{trainer.bio.split('.')[0]}</p>

                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3c4a24]/30 border border-[#b0f020]/30 text-[#b0f020] text-xs font-bold font-mono">
                                        <MapPin size={14} /> Los Angeles, CA
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3c4a24]/30 border border-[#b0f020]/30 text-[#b0f020] text-xs font-bold font-mono">
                                        <Award size={14} /> 12+ Certs
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Session Rate</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-white">${trainer.price}</span>
                                            <span className="text-gray-500 text-sm font-bold">/Session</span>
                                        </div>
                                    </div>
                                    <button
                                        className="bg-[#b0f020] text-[#0f120f] px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#9de018] hover:shadow-[0_0_25px_rgba(176,240,32,0.4)] transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                                    >
                                        Book a Session
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            <div className="bg-[#121612] border border-[#1c221c] rounded-2xl py-6 px-4 flex flex-col items-center justify-center text-center">
                                <h3 className="text-[#b0f020] text-3xl font-black mb-1">
                                    <Counter value={typeof sessionsDone === 'number' ? `${sessionsDone}+` : sessionsDone} />
                                </h3>
                                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Sessions</p>
                            </div>
                            <div className="bg-[#121612] border border-[#1c221c] rounded-2xl py-6 px-4 flex flex-col items-center justify-center text-center">
                                <h3 className="text-[#b0f020] text-3xl font-black mb-1">
                                    <Counter value={activeClients} />
                                </h3>
                                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Active Clients</p>
                            </div>
                            <div className="bg-[#121612] border border-[#1c221c] rounded-2xl py-6 px-4 flex flex-col items-center justify-center text-center">
                                <h3 className="text-[#b0f020] text-3xl font-black mb-1 flex items-center justify-center gap-1">
                                    <Counter value={trainer.rating.toString()} />
                                </h3>
                                <div className="flex gap-0.5 justify-center mb-1 text-[#b0f020]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} fill={i < Math.floor(trainer.rating) ? "currentColor" : "none"} />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#121612] border border-[#1c221c] rounded-2xl py-6 px-4 flex flex-col items-center justify-center text-center">
                                <h3 className="text-[#b0f020] text-3xl font-black mb-1">
                                    <Counter value={yearsExp} />
                                </h3>
                                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Years Exp.</p>
                            </div>
                        </motion.div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-[#1c221c] mb-8 overflow-x-auto custom-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-4 text-sm font-bold tracking-wide transition-all relative ${activeTab === tab ? 'text-[#b0f020]' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTabProfile"
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#b0f020] rounded-t-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tabs Content */}
                        <div className="min-h-[300px]">
                            {activeTab === 'About' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        Biography
                                    </h2>
                                    <div className="text-gray-400 leading-relaxed space-y-4">
                                        <p>{trainer.bio}</p>
                                        <p>Specializing in high-performance conditioning and structural integrity, {trainer.name.split(' ')[0]} has spent nearly a decade helping elite athletes and everyday clients redefine their physical limits. Their approach combines data-driven science with sustainable lifestyle habits to ensure long-term results.</p>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'Programs' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div className="bg-[#121612] p-6 rounded-2xl border border-[#1c221c]">
                                        <h3 className="font-bold text-lg mb-2 text-[#b0f020]">12-Week Transformation</h3>
                                        <p className="text-sm text-gray-400">Comprehensive program focusing on hypertrophy and sustainable fat loss via customized macro planning.</p>
                                    </div>
                                    <div className="bg-[#121612] p-6 rounded-2xl border border-[#1c221c]">
                                        <h3 className="font-bold text-lg mb-2 text-[#b0f020]">Functional Mobility Flow</h3>
                                        <p className="text-sm text-gray-400">Perfect for recovery days: improve joint health, increase flexibility, and reduce risk of injury.</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TrainerProfile;
