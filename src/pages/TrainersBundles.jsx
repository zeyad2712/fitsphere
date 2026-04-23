import React from 'react';
import { motion } from 'framer-motion';
import { 
    Check, 
    Zap, 
    Target, 
    Crown, 
    Flame, 
    ArrowRight, 
    Users, 
    Clock, 
    ShieldCheck,
    Dumbbell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TrainersBundles = () => {
    const bundles = [
        {
            name: "Kickstart",
            price: "49",
            duration: "Single Session",
            icon: <Zap size={24} />,
            description: "Perfect for testing the waters and getting a professional assessment.",
            features: [
                "1-on-1 Personal Training",
                "Full Body Assessment",
                "Form Correction",
                "Basic Nutrition Guide",
                "Access to AI Coach (7 Days)"
            ],
            color: "gray",
            popular: false
        },
        {
            name: "Transformation",
            price: "199",
            duration: "Monthly / 8 Sessions",
            icon: <Target size={24} />,
            description: "The most popular choice for consistent progress and visible results.",
            features: [
                "8 Personal Training Sessions",
                "Customized Workout Plan",
                "Macro Tracking Support",
                "Weekly Progress Checks",
                "24/7 Trainer Messaging",
                "Access to AI Coach (30 Days)"
            ],
            color: "neon",
            popular: true
        },
        {
            name: "Elite Athlete",
            price: "499",
            duration: "3 Months / 24 Sessions",
            icon: <Crown size={24} />,
            description: "Dedicated coaching for those serious about high-performance goals.",
            features: [
                "24 Personal Training Sessions",
                "Premium Nutrition Coaching",
                "Recovery & Mobility Protocol",
                "Bi-weekly Body Composition",
                "Priority Support Access",
                "Full Video Library Access",
                "Unlimited AI Coach"
            ],
            color: "dark",
            popular: false
        },
        {
            name: "Pro Ultimate",
            price: "899",
            duration: "6 Months / 48 Sessions",
            icon: <Flame size={24} />,
            description: "Full-scale lifestyle transformation with elite-level commitment.",
            features: [
                "48 Personal Training Sessions",
                "personalized Competition Prep",
                "Advanced Supplement Stack Guide",
                "Physiotherapy Referral",
                "Custom Apparel Bundle",
                "Exclusive Seminar Access",
                "Unlimited AI Coach"
            ],
            color: "neon-bold",
            popular: false
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black pt-20">
            <Navbar />

            <motion.main 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24"
            >
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b0f020]/10 border border-[#b0f020]/20 text-[#b0f020] text-xs font-black uppercase tracking-[0.2em] mb-6"
                    >
                        <Dumbbell size={14} /> Training Bundles
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6 leading-tight">
                        Choose Your <span className="text-[#b0f020]">Path</span> <br />
                        To Greatness
                    </h1>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed">
                        Scale your fitness journey with our elite training packages. From foundational sessions to full-scale professional coaching.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bundles.map((bundle, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 group ${
                                bundle.popular 
                                ? 'bg-[#151a15] border-[#b0f020] shadow-[0_20px_50px_rgba(176,240,32,0.1)] scale-105 z-10' 
                                : 'bg-[#121612] border-white/5 hover:border-[#b0f020]/30'
                            }`}
                        >
                            {bundle.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#b0f020] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            {/* Icon & Title */}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 ${
                                bundle.popular ? 'bg-[#b0f020] text-black' : 'bg-[#0a0d0a] text-[#b0f020] border border-[#b0f020]/20'
                            }`}>
                                {bundle.icon}
                            </div>

                            <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tight">{bundle.name}</h3>
                            <p className="text-gray-500 text-xs font-bold leading-relaxed mb-8 flex-none h-10">
                                {bundle.description}
                            </p>

                            {/* Price */}
                            <div className="mb-10">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-gray-400 font-bold text-lg">$</span>
                                    <span className="text-5xl font-black italic tracking-tighter">{bundle.price}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1 block">
                                    {bundle.duration}
                                </span>
                            </div>

                            {/* Features */}
                            <div className="space-y-4 mb-10 flex-1">
                                {bundle.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className={`mt-1 shrink-0 ${bundle.popular ? 'text-[#b0f020]' : 'text-gray-600'}`}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${
                                bundle.popular 
                                ? 'bg-[#b0f020] text-black hover:bg-[#9de018] shadow-[0_10px_25px_rgba(176,240,32,0.2)]' 
                                : 'bg-[#0a0d0a] text-white hover:bg-[#1c221c] border border-white/5'
                            }`}>
                                Select Bundle
                                <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16">
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-[#121612] rounded-xl flex items-center justify-center text-[#b0f020] border border-white/5 group-hover:scale-110 transition-transform">
                            <Users size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-tight italic">Certified Trainers</h4>
                            <p className="text-xs text-gray-500 font-medium">Top 1% elite-tier specialists</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-[#121612] rounded-xl flex items-center justify-center text-[#b0f020] border border-white/5 group-hover:scale-110 transition-transform">
                            <Clock size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-tight italic">Flexible Timing</h4>
                            <p className="text-xs text-gray-500 font-medium">Fits into your busy lifestyle</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-[#121612] rounded-xl flex items-center justify-center text-[#b0f020] border border-white/5 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-tight italic">Money-back Guarantee</h4>
                            <p className="text-xs text-gray-500 font-medium">100% satisfaction or full refund</p>
                        </div>
                    </div>
                </div>
            </motion.main>

            <Footer />
        </div>
    );
};

export default TrainersBundles;
