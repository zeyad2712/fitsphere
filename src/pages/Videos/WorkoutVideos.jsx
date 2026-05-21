import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { videos } from '../../data/videos';

const WorkoutVideos = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMuscle, setSelectedMuscle] = useState('All');

    // Get unique individual muscles from workout videos
    const muscles = ['All', ...new Set(videos
        .filter(v => v.category === 'Workout')
        .flatMap(v => v.targetedMuscle.split(',').map(m => m.trim())))];

    // Filter logic
    const workoutVideos = videos.filter((video) => {
        const matchesCategory = video.category === 'Workout';
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMuscle = selectedMuscle === 'All' || video.targetedMuscle.includes(selectedMuscle);
        return matchesCategory && matchesSearch && matchesMuscle;
    });

    return (
        <div className="bg-[#0a0d0a] min-h-screen font-sans text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link
                        to="/onboarding-videos"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ff4d4d] transition-colors group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Back to Selection</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ff4d4d] mb-6 pb-6">
                        Workout Videos
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        High-intensity sessions designed to push your athletic performance to the next level.
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <div className="flex flex-col items-center gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full md:w-96"
                    >
                        <input
                            type="text"
                            placeholder="Search workouts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 pl-12 text-white focus:outline-none focus:border-[#ff4d4d] transition-colors"
                        />
                        <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </motion.div>

                    {/* Muscle Filter Chips */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {muscles.map((muscle) => (
                            <button
                                key={muscle}
                                onClick={() => setSelectedMuscle(muscle)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                                    selectedMuscle === muscle
                                        ? 'bg-[#ff4d4d] border-[#ff4d4d] text-white shadow-[0_0_15px_rgba(255,77,77,0.4)]'
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#ff4d4d]/50 hover:text-white'
                                }`}
                            >
                                {muscle}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Videos Grid */}
                {workoutVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {workoutVideos.map((video, index) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={video.id}
                            >
                                <Link
                                    to={`/video/${video.id}`}
                                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#ff4d4d]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 rounded-full bg-[#ff4d4d] flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_20px_rgba(255,77,77,0.6)]">
                                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-lg text-sm text-[#ff4d4d] font-medium font-mono">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-[#ff4d4d] transition-colors">{video.title}</h3>
                                        <div className="flex items-center gap-2 mb-4">
                                            <svg className="w-5 h-5 text-[#ff4d4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            <span className="text-gray-300 text-sm font-medium">{video.targetedMuscle}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm line-clamp-2 mt-auto">
                                            {video.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white/5 rounded-2xl border border-white/10"
                    >
                        <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h3 className="text-xl text-gray-300 font-medium font-sans">No workouts found matching your criteria.</h3>
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default WorkoutVideos;
