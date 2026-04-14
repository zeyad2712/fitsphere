import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OnBoardingVideos = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 'Workout',
            title: 'High Intensity Workouts',
            description: 'Push your limits with our selection of strength, cardio, and HIIT sessions designed to burn fat and build muscle.',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
            color: '#ff4d4d',
            shadow: 'rgba(255, 77, 77, 0.3)'
        },
        {
            id: 'Recovery',
            title: 'Restorative Recovery',
            description: 'Heal your body and mind with targeted stretching, mobility flows, and restorative yoga sessions.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
            color: '#4da6ff',
            shadow: 'rgba(77, 166, 255, 0.3)'
        }
    ];

    const handleSelection = (category) => {
        if (category === 'Workout') {
            navigate('/workout-videos');
        } else {
            navigate('/recovery-videos');
        }
    };

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans flex flex-col">
            <Navbar />
            
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-20 mt-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#b0f020]">
                        Choose Your Path
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Whether you're looking to crush a new personal best or recover from an intense week, we've got the perfect module for you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSelection(cat.id)}
                            className="relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 shadow-2xl transition-all duration-500"
                            style={{ boxShadow: `0 20px 40px -10px ${cat.shadow}` }}
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0">
                                <img 
                                    src={cat.image} 
                                    alt={cat.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <span 
                                        className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                                        style={{ backgroundColor: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}50` }}
                                    >
                                        {cat.id}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-[#b0f020] transition-colors">
                                        {cat.title}
                                    </h2>
                                    <p className="text-gray-300 text-base md:text-lg mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        {cat.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-[#b0f020] font-bold group-hover:translate-x-2 transition-transform duration-300">
                                        EXPLORE {cat.id}S
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Hover Border Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" 
                                 style={{ border: `2px solid ${cat.color}` }} />
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OnBoardingVideos;
