import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useInView, animate } from 'framer-motion';
import { MapPin, Users, Cpu, ShoppingCart, Target, PlayCircle, ArrowRight, Dumbbell } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroBg from '../assets/hero-bg.png';

const Counter = ({ value }) => {
    const count = useMotionValue(0);
    const suffix = value.match(/[A-Za-z+]+$/)?.[0] || '';
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
    
    const rounded = useTransform(count, (latest) => {
        const num = Math.floor(latest);
        const formatted = value.includes(',') ? num.toLocaleString() : num;
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

const Home = () => {
    const navigate = useNavigate();
    const stats = [
        { value: '500K+', label: 'ACTIVE USERS' },
        { value: '1,200+', label: 'DAILY PLANS' },
        { value: '3,500+', label: 'CERTIFIED TRAINERS' },
        { value: '25K+', label: 'WORKOUTS' },
    ];

    const features = [
        {
            icon: <MapPin className="text-[#b0f020] w-6 h-6" />,
            title: 'Gym Finder',
            desc: 'Discover top-rated gyms and local facilities that fit your current routine.'
        },
        {
            icon: <Users className="text-[#b0f020] w-6 h-6" />,
            title: 'Personal Trainers',
            desc: 'Connect with expert level coaches for detailed guidance exactly to your goals.'
        },
        {
            icon: <Cpu className="text-[#b0f020] w-6 h-6" />,
            title: 'AI Coach',
            desc: 'Let our intelligent AI coach create a personalized, dynamic workout and meal plan.'
        },
        {
            icon: <ShoppingCart className="text-[#b0f020] w-6 h-6" />,
            title: 'Shop',
            desc: 'The complete shop for gym gear and premium workout accessories delivered to you.'
        },
        {
            icon: <Target className="text-[#b0f020] w-6 h-6" />,
            title: 'Progress Tracker',
            desc: 'Monitor your stats automatically, view visual metrics to track your transformation.'
        },
        {
            icon: <PlayCircle className="text-[#b0f020] w-6 h-6" />,
            title: 'Video Library',
            desc: 'Full-course premium HD videos to perfect your form and optimize your workouts.'
        }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroBg}
                        alt="Fitness Hero"
                        className="w-full h-full object-cover object-top opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d0a]/30 via-transparent to-[#0a0d0a]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d0a]/70 via-transparent to-[#0a0d0a]/70" />
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-6xl md:text-8xl font-black mb-4 tracking-tight uppercase leading-none"
                    >
                        Your Fitness.
                        <br />
                        <span className="text-[#b0f020] drop-shadow-[0_0_30px_rgba(176,240,32,0.3)]">Reimagined.</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Experience the next evolution of fitness with personalized AI coaching, premium tracking, and a global community of elite trainers.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button className="bg-[#b0f020] text-[#0f120f] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#9de018] hover:shadow-[0_0_20px_rgba(176,240,32,0.5)] transition-all transform hover:-translate-y-1">
                            Get Started Now
                        </button>
                        <button className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:border-[#b0f020] hover:bg-[#b0f020]/10 transition-all">
                            Explore Features
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-[#1c221c] bg-[#0c100c] relative z-20">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={staggerContainer}
                        className="flex flex-wrap justify-center divide-x-0 md:divide-x divide-[#1c221c]"
                    >
                        {stats.map((stat, index) => (
                            <motion.div key={index} variants={fadeInUp} className="w-1/2 md:w-1/4 text-center py-6 md:py-0 px-4">
                                <h3 className="text-3xl md:text-4xl font-bold text-[#b0f020] mb-2">
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-gray-500 text-xs tracking-wider font-semibold uppercase">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-[#0a0d0a] relative z-20" id="features">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="mb-16 max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium <span className="text-white">Features</span></h2>
                        <p className="text-gray-400 text-lg">
                            Unlock your full potential with a curated suite of elite features designed for users who want optimal performance and serious fitness results.
                        </p>
                    </motion.div>
 
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="bg-[#121612] border border-[#1c221c] rounded-2xl p-8 hover:border-[#b0f020]/30 hover:bg-[#151915] transition-all group"
                            >
                                <div className="w-12 h-12 bg-[#1c221c] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
 
            {/* About Us Section */}
            <section className="py-24 bg-[#0c100c] relative z-20 border-y border-[#1c221c]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex-1"
                    >
                        <div className="inline-block px-4 py-1.5 bg-[#b0f020]/10 border border-[#b0f020]/20 rounded-full text-[#b0f020] text-xs font-black uppercase tracking-widest mb-6">
                            Our Story
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">More Than Just <br /><span className="text-[#b0f020]">Fitness.</span></h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                            FitSphere was born from a simple mission: to bridge the gap between technology and physical excellence. Our team of world-class developers and elite trainers have worked tirelessly to build a platform that doesn't just track metrics, but transforms lives.
                        </p>
                        <button 
                            onClick={() => navigate('/about')}
                            className="group flex items-center gap-2 bg-[#b0f020]/10 text-[#b0f020] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#b0f020] hover:text-[#0f120f] transition-all border border-[#b0f020]/20 shadow-[0_0_20px_rgba(176,240,32,0.05)]"
                        >
                            Explore Our Mission
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex-1 w-full"
                    >
                        <div className="aspect-[4/3] md:aspect-square rounded-[3rem] bg-gradient-to-br from-[#1c221c] to-[#0a0d0a] border border-white/5 flex items-center justify-center p-8 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[#b0f020]/5 blur-3xl rounded-full group-hover:bg-[#b0f020]/10 transition-colors duration-500" />
                            <Dumbbell size={180} className="text-[#b0f020]/5 absolute -top-12 -right-12 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                            <div className="relative z-10 text-center">
                                <div className="text-7xl md:text-8xl font-black text-[#b0f020] mb-2 tracking-tighter drop-shadow-[0_0_30px_rgba(176,240,32,0.3)]">EST. 2026</div>
                                <div className="text-gray-400 uppercase tracking-[0.3em] text-xs font-black">Innovation in Motion</div>
                            </div>
                            <Users size={180} className="text-[#b0f020]/5 absolute -bottom-12 -left-12 -rotate-12 group-hover:-rotate-45 transition-transform duration-700" />
                            
                            {/* Decorative elements */}
                            <div className="absolute top-1/2 left-4 w-1 h-12 bg-gradient-to-b from-transparent via-[#b0f020]/40 to-transparent" />
                            <div className="absolute top-1/2 right-4 w-1 h-12 bg-gradient-to-b from-transparent via-[#b0f020]/40 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-b from-[#0a0d0a] to-[#0c100c] relative z-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-5xl md:text-6xl font-black mb-4">
                            Ready to Join the <br />
                            <span className="text-[#b0f020]">Revolution?</span>
                        </h2>
                        <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
                            Start your journey today. Experience 14 days of premium features on us.
                        </p>
                        <button className="bg-[#b0f020] text-[#0f120f] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#9de018] hover:shadow-[0_0_25px_rgba(176,240,32,0.6)] transition-all transform hover:-translate-y-1">
                            Get Started Free
                        </button>
                        <p className="mt-6 text-sm text-gray-600">No credit card required. Cancel anytime.</p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
