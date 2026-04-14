import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { videos } from '../data/videos';

const VideoDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const video = videos.find(v => v.id === parseInt(id));

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    if (!video) {
        return (
            <div className="bg-[#0a0d0a] min-h-screen text-white flex flex-col font-sans">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <h2 className="text-3xl text-gray-400">Video not found.</h2>
                </div>
                <Footer />
            </div>
        );
    }

    const relatedVideos = videos.filter(
        v => v.category === video.category && v.id !== video.id
    );

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans flex flex-col">
            <Navbar />

            <main className="flex-grow mt-24">
                {/* Back Button */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-[#b0f020] transition-colors group"
                    >
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="font-medium">Go Back</span>
                    </button>
                </div>
                {/* Video Player Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full bg-black"
                >
                    <div className="max-w-6xl mx-auto border-b border-white/10">
                        <div className="relative pt-[56.25%] w-full bg-black">
                            {video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be') ? (
                                <iframe 
                                    className="absolute inset-0 w-full h-full border-0"
                                    src={video.videoUrl.replace('watch?v=', 'embed/').split('&')[0]}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video
                                    controls
                                    className="absolute inset-0 w-full h-full object-contain"
                                    poster={video.thumbnail}
                                    src={video.videoUrl}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Video Info Section */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/10 pb-12 mb-12"
                    >
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${video.category === 'Workout'
                                        ? 'bg-red-500/20 text-red-500 border border-red-500/50'
                                        : 'bg-blue-500/20 text-blue-500 border border-blue-500/50'
                                    }`}>
                                    {video.category}
                                </span>
                                <span className="bg-white/10 border border-white/20 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium font-mono">
                                    {video.duration}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#b0f020]">
                                {video.title}
                            </h1>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                                <h3 className="text-xl font-semibold mb-4 text-white border-b border-white/10 pb-4">
                                    About This Module
                                </h3>
                                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                    {video.description}
                                </p>

                                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                                    <div className="p-3 bg-[#b0f020]/20 rounded-lg">
                                        <svg className="w-6 h-6 text-[#b0f020]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Targeted Muscle Areas</p>
                                        <p className="text-lg font-semibold text-white">{video.targetedMuscle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Related Videos Section */}
                    {relatedVideos.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-white relative inline-block">
                                    Related {video.category}s
                                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#b0f020]"></span>
                                </h2>
                                <Link 
                                    to={video.category === 'Workout' ? '/workout-videos' : '/recovery-videos'} 
                                    className="text-[#b0f020] hover:text-white transition-colors flex items-center gap-2 font-medium"
                                >
                                    View All
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedVideos.slice(0, 3).map((v) => (
                                    <Link
                                        to={`/video/${v.id}`}
                                        key={v.id}
                                        className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#b0f020]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={v.thumbnail}
                                                alt={v.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-12 h-12 rounded-full bg-[#b0f020] flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded-lg text-xs text-[#b0f020] font-mono">
                                                {v.duration}
                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#b0f020] transition-colors">{v.title}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-2 mt-auto">
                                                {v.targetedMuscle}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VideoDetails;
