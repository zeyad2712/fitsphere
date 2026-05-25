import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Star, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { trainersData } from '../../data/trainers';

const Trainers = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [sortBy, setSortBy] = useState('Top Rated');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Filter Options
    const specialtyOptions = [
        { label: "Strength Training", value: "STRENGTH" },
        { label: "Yoga & Flow", value: "YOGA" },
        { label: "HIIT & Cardio", value: "HIIT" },
        { label: "Pilates", value: "PILATES" },
        { label: "Bodybuilding", value: "BODYBUILDING" },
        { label: "Functional", value: "FUNCTIONAL" }
    ];

    const availabilityOptions = ["Mornings", "Afternoons", "Evenings", "Weekends"];

    // Handlers
    const toggleSpecialty = (val) => {
        if (selectedSpecialties.includes(val)) {
            setSelectedSpecialties(selectedSpecialties.filter(item => item !== val));
        } else {
            setSelectedSpecialties([...selectedSpecialties, val]);
        }
    };

    const toggleAvailability = (val) => {
        if (selectedAvailability.includes(val)) {
            setSelectedAvailability(selectedAvailability.filter(item => item !== val));
        } else {
            setSelectedAvailability([...selectedAvailability, val]);
        }
    };

    // Filter Logic
    let filteredTrainers = trainersData.filter(trainer => {
        // Search Filter
        if (searchTerm && !trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) && !trainer.bio.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }

        // Specialty Filter (OR logic)
        if (selectedSpecialties.length > 0) {
            const hasMatch = trainer.specialties.some(spec => selectedSpecialties.includes(spec));
            if (!hasMatch) return false;
        }

        // Rating Filter
        if (trainer.rating < minRating) return false;

        // Price Filter
        if (trainer.price > maxPrice) return false;

        // Availability Filter (OR logic)
        if (selectedAvailability.length > 0) {
            const hasMatch = trainer.availability.some(avail => selectedAvailability.includes(avail));
            if (!hasMatch) return false;
        }

        return true;
    });

    // Sort Logic
    if (sortBy === 'Top Rated') {
        filteredTrainers.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Price: Low to High') {
        filteredTrainers.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
        filteredTrainers.sort((a, b) => b.price - a.price);
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black">
            <Navbar />

            <div className="pt-24 pb-12 px-6 md:px-8 container mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar Filters */}
                    <div className="w-full md:w-64 shrink-0 md:sticky md:top-24 h-fit md:max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2 pb-4">
                        {/* Mobile Filter Toggle */}
                        <div
                            className="md:hidden flex items-center justify-between bg-[#121612] p-4 rounded-2xl border border-[#1c221c] cursor-pointer mb-4"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H20M6 12H18M9 18H15" stroke="#b0f020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h2 className="text-xl font-bold">Filters</h2>
                            </div>
                            {isMobileFiltersOpen ? <X size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                        </div>

                        {/* Desktop header */}
                        <div className="hidden md:flex items-center gap-2 mb-8">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M6 12H18M9 18H15" stroke="#b0f020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h2 className="text-xl font-bold">Filters</h2>
                        </div>

                        <div className={`space-y-10 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>

                            {/* Specialty */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Specialty</h3>
                                <div className="space-y-3">
                                    {specialtyOptions.map(option => (
                                        <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedSpecialties.includes(option.value)}
                                                onChange={() => toggleSpecialty(option.value)}
                                            />
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${selectedSpecialties.includes(option.value) ? 'bg-[#b0f020] border-[#b0f020]' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                                {selectedSpecialties.includes(option.value) && (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0d0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price Range ($/hr)</h3>
                                <input
                                    type="range"
                                    min="20"
                                    max="200"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#b0f020]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                                    <span>20 EGP</span>
                                    <span>Up to {maxPrice} EGP</span>
                                    <span>200+ EGP</span>
                                </div>
                            </div>

                            {/* Minimum Rating */}
                            {/* <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Minimum Rating</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${minRating === 4.5 ? 'bg-[#1c221c] border border-[#b0f020]/30 text-[#b0f020]' : 'hover:bg-[#121612] text-gray-400'}`}
                                    >
                                        <Star size={16} fill={minRating === 4.5 ? "currentColor" : "none"} className={minRating === 4.5 ? "text-[#b0f020]" : "text-gray-500"} />
                                        4.5 & up
                                    </button>
                                    <button
                                        onClick={() => setMinRating(minRating === 4.0 ? 0 : 4.0)}
                                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${minRating === 4.0 ? 'bg-[#1c221c] border border-[#b0f020]/30 text-[#b0f020]' : 'hover:bg-[#121612] text-gray-400'}`}
                                    >
                                        <Star size={16} fill={minRating === 4.0 ? "currentColor" : "none"} className={minRating === 4.0 ? "text-[#b0f020]" : "text-gray-500"} />
                                        4.0 & up
                                    </button>
                                </div>
                            </div> */}

                            {/* Availability */}
                            {/* <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Availability</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {availabilityOptions.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => toggleAvailability(option)}
                                            className={`py-2 text-xs font-bold rounded-full border transition-all ${selectedAvailability.includes(option) ? 'bg-[#1c221c] border-[#b0f020] text-white' : 'border-[#1c221c] text-gray-500 hover:border-gray-600'}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div> */}

                            {/* Mobile Show Results Button */}
                            <div className="md:hidden pt-4 pb-2 border-t border-[#1c221c]">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full bg-[#b0f020] text-[#0f120f] py-3 rounded-xl font-bold text-sm"
                                >
                                    Show {filteredTrainers.length} Results
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">Expert Trainers</h1>
                                <p className="text-gray-400">Found {filteredTrainers.length} results matching your criteria</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full md:w-auto gap-4 mt-4 md:mt-0">
                                {/* Search */}
                                <div className="relative group w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search trainers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-[#121612] border border-[#1c221c] rounded-full py-2 pl-10 pr-4 w-full sm:w-48 focus:outline-none focus:border-[#b0f020] transition-all text-sm"
                                    />
                                </div>

                                {/* Sort */}
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <span className="text-sm text-gray-400 shrink-0">Sort by:</span>
                                    <div className="relative w-full sm:w-auto">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none w-full bg-transparent border border-[#1c221c] rounded-full py-2 pl-4 pr-10 text-sm font-medium focus:outline-none focus:border-[#b0f020] cursor-pointer"
                                        >
                                            <option value="Top Rated" className="bg-[#0a0d0a]">Top Rated</option>
                                            <option value="Price: Low to High" className="bg-[#0a0d0a]">Price: Low to High</option>
                                            <option value="Price: High to Low" className="bg-[#0a0d0a]">Price: High to Low</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trainer Grid */}
                        {filteredTrainers.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredTrainers.map(trainer => (
                                    <motion.div
                                        key={trainer.id}
                                        variants={itemVariants}
                                        className="bg-[#121612] border border-[#1c221c] rounded-3xl overflow-hidden hover:border-[#b0f020]/30 transition-all flex flex-col group"
                                    >
                                        <div className="relative h-64 bg-[#1c221c] overflow-hidden">
                                            <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#121612] via-transparent to-transparent"></div>
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                                                <Star fill="currentColor" className="text-[#b0f020] w-3.5 h-3.5" />
                                                <span className="text-xs font-bold">{trainer.rating}</span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold mb-3">{trainer.name}</h3>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {trainer.specialties.map(spec => (
                                                    <span key={spec} className="px-2.5 py-1 rounded border border-[#b0f020]/20 bg-[#b0f020]/5 text-[#b0f020] text-[10px] font-bold uppercase tracking-wider">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-400 mb-6 flex-1 leading-relaxed line-clamp-3">
                                                {trainer.bio}
                                            </p>

                                            <div className="mb-6 flex items-center gap-2 flex-wrap">
                                                <span className="text-sm text-gray-400">Starting at </span>
                                                {trainer.discountPercentage ? (
                                                    <>
                                                        <span className="text-gray-500 font-medium line-through text-sm">{trainer.price}EGP</span>
                                                        <span className="text-[#b0f020] font-bold text-lg">
                                                            {Math.round(trainer.price * (1 - trainer.discountPercentage / 100))}EGP
                                                        </span>
                                                        <span className="bg-red-500/10 text-red-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider border border-red-500/20">
                                                            -{trainer.discountPercentage}%
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-[#b0f020] font-bold text-lg">{trainer.price}EGP</span>
                                                )}
                                                <span className="text-sm text-gray-500">/month</span>
                                            </div>

                                            <div className="flex gap-3">
                                                <Link
                                                    to={`/trainer/${trainer.id}`}
                                                    className="flex-1 py-3 px-4 rounded-xl border border-[#1c221c] text-xs font-bold hover:bg-[#1c221c] transition-colors text-center"
                                                >
                                                    VIEW PROFILE
                                                </Link>
                                                <button 
                                                    onClick={() => navigate('/trainer/booking', {
                                                        state: {
                                                            trainerId: trainer.id,
                                                            trainerName: trainer.name,
                                                            trainerPrice: trainer.discountPercentage ? Math.round(trainer.price * (1 - trainer.discountPercentage / 100)) : trainer.price,
                                                            trainerSpecialties: trainer.specialties,
                                                            trainerImage: trainer.image
                                                        }
                                                    })}
                                                    className="flex-1 py-3 px-4 rounded-xl bg-[#b0f020] text-[#0f120f] text-xs font-bold hover:bg-[#9de018] transition-colors shadow-lg shadow-[#b0f020]/20"
                                                >
                                                    BOOK NOW
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-[#121612] border border-[#1c221c] rounded-3xl">
                                <h3 className="text-xl font-bold mb-2">No Trainers Found</h3>
                                <p className="text-gray-400 text-sm">Try adjusting your filters to find the perfect match.</p>
                                <button
                                    onClick={() => {
                                        setSelectedSpecialties([]);
                                        setMinRating(0);
                                        setMaxPrice(200);
                                        setSelectedAvailability([]);
                                        setSearchTerm("");
                                    }}
                                    className="mt-6 px-6 py-2 bg-[#1c221c] rounded-full text-sm font-bold hover:text-[#b0f020]"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Trainers;
