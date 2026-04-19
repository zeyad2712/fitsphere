import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, Heart, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const stats = [
        { label: 'Active Members', value: '15k+' },
        { label: 'Certified Trainers', value: '120+' },
        { label: 'Workout Programs', value: '500+' },
        { label: 'Success Stories', value: '98%' }
    ];

    const values = [
        {
            icon: <Target className="w-8 h-8 text-[#b0f020]" />,
            title: 'Precision Training',
            description: 'We believe in data-driven fitness. Every workout is optimized for your specific goals.'
        },
        {
            icon: <Users className="w-8 h-8 text-[#b0f020]" />,
            title: 'Global Community',
            description: 'Join a supportive network of fitness enthusiasts from all over the world.'
        },
        {
            icon: <Zap className="w-8 h-8 text-[#b0f020]" />,
            title: 'Innovation First',
            description: 'Our platform leverages the latest in AI and sports science to guide your journey.'
        }
    ];

    return (
        <div className="bg-[#0a0d0a] text-white min-h-screen font-sans">
            <Navbar />

            <motion.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="pt-24"
            >
                {/* Hero Section */}
                <section className="relative h-[70vh] flex items-center justify-center overflow-hidden px-6">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/about_hero.png" 
                            alt="FitSphere Gym" 
                            className="w-full h-full object-cover opacity-40 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d0a]/60 via-transparent to-[#0a0d0a]"></div>
                    </div>

                    <div className="relative z-10 text-center max-w-4xl">
                        <motion.h1 
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                        >
                            REDEFINING THE <span className="text-[#b0f020]">LIMITS</span> OF FITNESS
                        </motion.h1>
                        <motion.p 
                            variants={itemVariants}
                            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            FitSphere isn't just an app. It's a movement. We blend cutting-edge technology 
                            with world-class expertise to help you achieve your ultimate form.
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <button className="bg-[#b0f020] text-black px-8 py-4 rounded-full font-bold hover:bg-[#9ed010] transition-all transform hover:scale-105">
                                Join The Movement
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-24 px-6 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                                Founded in 2024, FitSphere emerged from a simple realization: the traditional 
                                fitness industry was failing to keep up with the digital age. Most people have 
                                the drive, but lack the personalized roadmaps to reach their potential.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                We built FitSphere to bridge that gap. By combining elite coaches with 
                                advanced biometric tracking and a vibrant community, we've created 
                                an ecosystem where success isn't just possible—it's inevitable.
                            </p>
                        </motion.div>
                        <motion.div 
                            variants={itemVariants}
                            className="grid grid-cols-2 gap-4"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-[#151a15] p-8 rounded-2xl border border-[#b0f020]/10 hover:border-[#b0f020]/30 transition-colors">
                                    <div className="text-3xl font-bold text-[#b0f020] mb-2">{stat.value}</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 bg-[#0d120d]">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <motion.h2 
                            variants={itemVariants}
                            className="text-4xl font-bold mb-16"
                        >
                            What Drives Us
                        </motion.h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {values.map((value, i) => (
                                <motion.div 
                                    key={i}
                                    variants={itemVariants}
                                    className="bg-[#1a201a] p-10 rounded-3xl border border-white/5 hover:bg-[#1e261e] transition-all group"
                                >
                                    <div className="mb-6 inline-block p-4 rounded-2xl bg-[#b0f020]/5 group-hover:bg-[#b0f020]/10 transition-colors">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Culture Section */}
                <section className="py-24 px-6 max-w-7xl mx-auto text-center">
                    <motion.div variants={itemVariants}>
                        <h2 className="text-4xl font-bold mb-8">More Than Just a Brand</h2>
                        <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12">
                             <div className="absolute inset-0 bg-[#b0f020]/10 mix-blend-overlay"></div>
                             <div className="absolute inset-0 flex items-center justify-center p-12">
                                <p className="text-2xl md:text-4xl font-medium italic text-gray-200">
                                    "FitSphere represents the harmony between human potential and digital empowerment. 
                                    We are dedicated to making elite-level wellness accessible to everyone."
                                </p>
                             </div>
                        </div>
                    </motion.div>
                </section>
            </motion.main>

            <Footer />
        </div>
    );
};

export default AboutUs;
