import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Star, Clock, ArrowLeft, Share2, Heart,
    Waves, Thermometer, Activity, ShowerHead,
    CupSoda, Wifi, Shirt, Dumbbell, Map as MapIcon, ChevronRight,
    X, ChevronLeft, CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { gymsData } from '../data/gyms';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const IconMap = {
    Waves: Waves,
    Thermometer: Thermometer,
    Activity: Activity,
    ShowerHead: ShowerHead,
    CupSoda: CupSoda,
    Wifi: Wifi,
    Shirt: Shirt,
    Dumbbell: Dumbbell
};

const BookingModal = ({ isOpen, onClose, gymName }) => {
    const [selectedDate, setSelectedDate] = useState(12);
    const [sessionType, setSessionType] = useState('Personal Training');
    const [selectedTime, setSelectedTime] = useState('10:30 AM');

    const days = [
        { day: 'M', date: 10 },
        { day: 'T', date: 11 },
        { day: 'W', date: 12 },
        { day: 'T', date: 13 },
        { day: 'F', date: 14 },
        { day: 'S', date: 15 },
        { day: 'S', date: 16 },
    ];

    const times = ['08:00 AM', '10:30 AM', '01:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-[#121612] border border-[#1c221c] w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Book a Session</h2>
                                <button onClick={onClose} className="p-2 hover:bg-[#1c221c] rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Date Input */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Choose Date</h3>
                                <div className="relative group">
                                    <input
                                        type="date"
                                        className="w-full bg-[#121612] border border-white/5 rounded-2xl py-4 px-6 text-sm font-bold text-white focus:outline-none focus:border-[#b0f020] transition-all cursor-pointer [color-scheme:dark]"
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            {/* Session Type (Fixed) */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Session Type</h3>
                                <div className="bg-[#b0f020]/10 border border-[#b0f020]/30 rounded-2xl p-4 flex items-center justify-between group">
                                    <span className="text-[#b0f020] text-sm font-black uppercase italic tracking-widest">Personal Training</span>
                                    <div className="w-6 h-6 rounded-full bg-[#b0f020] flex items-center justify-center text-[#0f120f]">
                                        <CheckCircle2 size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Time Picker */}
                            {/* <div className="mb-10">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Select Time</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {times.map(time => (
                                        <button 
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${
                                                selectedTime === time 
                                                ? 'bg-[#b0f020]/10 border-[#b0f020] text-[#b0f020]' 
                                                : 'border-[#1c221c] text-gray-500 hover:border-gray-700'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div> */}

                            <button className="w-full bg-[#b0f020] text-[#0f120f] py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#9de018] transition-all shadow-lg active:scale-[0.98]">
                                Book Session
                            </button>
                            <p className="text-[10px] text-center text-gray-600 mt-4 leading-relaxed">
                                No credit card required. Cancellation up to 24h before.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const MapModal = ({ isOpen, onClose, address, gymName, coords }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-[#121612] border border-[#1c221c] w-full max-w-4xl h-[70vh] rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
                    >
                        <div className="p-6 flex justify-between items-center border-b border-white/5">
                            <div>
                                <h2 className="text-xl font-bold">{gymName} Location</h2>
                                <p className="text-sm text-gray-500">{address}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-[#1c221c] rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 bg-[#0a0d0a] relative">
                            <MapContainer
                                center={coords}
                                zoom={15}
                                style={{ height: '100%', width: '100%', background: '#0a0d0a' }}
                                scrollWheelZoom={true}
                            >
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />
                                <Marker position={coords}>
                                    <Popup className="custom-popup">
                                        <div className="p-1 text-black">
                                            <h4 className="font-bold">{gymName}</h4>
                                            <p className="text-xs text-gray-600">{address}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>

                            <style dangerouslySetInnerHTML={{
                                __html: `
                                .leaflet-popup-content-wrapper {
                                    border-radius: 12px !important;
                                    background: #fff !important;
                                }
                                .leaflet-popup-tip {
                                    background: #fff !important;
                                }
                            `}} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const GymDetails = () => {
    const { id } = useParams();
    const gym = gymsData.find(g => g.id === parseInt(id));
    const [activeTab, setActiveTab] = useState('Overview');
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    if (!gym) return <div className="bg-[#0a0d0a] min-h-screen text-white flex items-center justify-center">Gym not found</div>;

    const tabs = ['Overview', 'Trainers', 'Classes'];

    const nextImg = () => {
        setCurrentImgIndex((prev) => (prev + 1) % (gym.images?.length || 1));
    };

    const prevImg = () => {
        setCurrentImgIndex((prev) => (prev - 1 + (gym.images?.length || 1)) % (gym.images?.length || 1));
    };

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black">
            <Navbar />

            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                gymName={gym.name}
            />

            <MapModal
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                address={gym.address}
                gymName={gym.name}
                coords={gym.coords}
            />

            <div className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <Link to="/gyms" className="flex items-center gap-2 text-gray-400 hover:text-[#b0f020] transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to discovery</span>
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
                    {/* Left Column (Main Details) */}
                    <div className="flex-1">
                        {/* Hero Gallery Overlay */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden mb-10 group bg-[#111]"
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImgIndex}
                                    src={gym?.images?.[currentImgIndex] || gym?.image}
                                    alt={gym?.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

                            {/* Slider Controls */}
                            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={prevImg}
                                    className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#b0f020] hover:text-[#0f120f] transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImg}
                                    className="p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-[#b0f020] hover:text-[#0f120f] transition-all"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            {/* Pagination dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                                {gym?.images?.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImgIndex(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${currentImgIndex === i ? 'w-8 bg-[#b0f020]' : 'w-2 bg-white/30 hover:bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase leading-tight">
                                    {gym.name} <span className="text-[#b0f020]">Gym</span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm md:text-base font-medium text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-[#b0f020]" />
                                        {gym.address}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star size={18} className="text-[#b0f020]" fill="currentColor" />
                                        {gym.rating} <span className="opacity-50">({gym.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#b0f020]">
                                        <div className="w-2 h-2 rounded-full bg-[#b0f020] animate-pulse"></div>
                                        Open until {gym.openUntil}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="bg-[#b0f020] text-[#0f120f] px-10 py-4 rounded-full font-black text-lg hover:bg-[#9de018] hover:shadow-[0_0_20px_rgba(176,240,32,0.4)] transition-all transform hover:-translate-y-1"
                            >
                                BOOK
                            </button>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex border-b border-[#1c221c] mb-12 overflow-x-auto custom-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab ? 'text-[#b0f020]' : 'text-gray-500 hover:text-white'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#b0f020] rounded-t-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-20">
                            {activeTab === 'Overview' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-20"
                                >
                                    {/* Amenities Section */}
                                    <section>
                                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                            Premium Amenities
                                            <span className="w-12 h-0.5 bg-[#1c221c]"></span>
                                        </h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                                            {gym.amenities.map(amenity => {
                                                const Icon = IconMap[amenity.icon] || Dumbbell;
                                                return (
                                                    <div
                                                        key={amenity.id}
                                                        className="bg-[#121612] border border-[#1c221c] p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-[#b0f020]/30 transition-all cursor-default"
                                                    >
                                                        <div className="w-12 h-12 bg-[#1c221c] rounded-xl flex items-center justify-center mb-4 text-[#b0f020] group-hover:scale-110 transition-transform">
                                                            <Icon size={24} />
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{amenity.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>

                                    {/* Reviews Section teaser */}
                                    <section>
                                        <div className="flex justify-between items-center mb-8">
                                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                                Recent Reviews
                                                <span className="w-12 h-0.5 bg-[#1c221c]"></span>
                                            </h2>
                                            <button className="text-[#b0f020] text-sm font-bold hover:underline">View All</button>
                                        </div>
                                        <div className="space-y-6">
                                            {gym.recentReviews.map(review => (
                                                <div key={review.id} className="bg-[#121612] border border-[#1c221c] p-8 rounded-2xl">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-[#ffb067] flex items-center justify-center text-[#121612] font-bold text-xl">
                                                                {review.author[0]}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-lg">{review.author}</h4>
                                                                <span className="text-sm text-gray-500">{review.date}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1 text-[#b0f020]">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={14} fill="currentColor" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-400 leading-relaxed italic">
                                                        "{review.comment}"
                                                    </p>
                                                </div>
                                            ))}
                                            {gym.recentReviews.length === 0 && (
                                                <p className="text-gray-500 italic text-center py-10">No reviews yet. Be the first to share your experience!</p>
                                            )}
                                        </div>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'Trainers' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {[
                                        { name: 'Alex Iron Woods', role: 'Strength & Conditioning', bio: 'Expert in powerlifting and functional strength with 8+ years experience.' },
                                        { name: 'Sarah Flow', role: 'Yoga & Mindfulness', bio: 'Specializes in Vinyasa and restorative yoga for high-performance athletes.' },
                                        { name: 'Mike The Tank', role: 'HIIT & Cardio', bio: 'Former competitive sprinter focusing on metabolic conditioning and HIIT.' }
                                    ].map((trainer, i) => (
                                        <div key={i} className="bg-[#121612] border border-[#1c221c] rounded-3xl p-6 flex gap-6 group hover:border-[#b0f020]/30 transition-all">
                                            <div className="w-24 h-24 rounded-2xl bg-[#1c221c] overflow-hidden shrink-0">
                                                <img src={`https://i.pravatar.cc/150?u=${trainer.name}`} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
                                                <span className="text-[#b0f020] text-xs font-bold uppercase tracking-wider mb-3 block">{trainer.role}</span>
                                                <p className="text-gray-400 text-sm leading-relaxed">{trainer.bio}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeTab === 'Classes' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {[
                                        { name: 'Sunrise Vinyasa', time: '06:00 AM - 07:30 AM', intensity: 'Moderate', color: 'bg-blue-500/10 text-blue-400' },
                                        { name: 'Iron Pump HIIT', time: '10:00 AM - 11:30 AM', intensity: 'Intense', color: 'bg-red-500/10 text-red-400' },
                                        { name: 'Core Evolution', time: '05:00 PM - 06:00 PM', intensity: 'High', color: 'bg-orange-500/10 text-orange-400' }
                                    ].map((cls, i) => (
                                        <div key={i} className="bg-[#121612] border border-[#1c221c] rounded-3xl p-6 flex items-center justify-between group hover:border-[#b0f020]/30 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-[#1c221c] flex items-center justify-center text-[#b0f020]">
                                                    <Clock size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-1">{cls.name}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                                                        <span className="flex items-center gap-1.5"><Clock size={14} /> {cls.time}</span>
                                                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${cls.color}`}>
                                                            {cls.intensity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:w-[350px] space-y-6">
                        {/* Getting Here Card */}
                        <div className="bg-[#121612] border border-[#1c221c] rounded-3xl overflow-hidden group">
                            <div className="relative h-48">
                                <img
                                    src="https://images.unsplash.com/photo-1526778545894-7a5700248473?q=80&w=400"
                                    className="w-full h-full object-cover opacity-30 grayscale saturate-0 group-hover:scale-110 transition-transform duration-700"
                                    alt="Map"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                    <h3 className="text-xl font-bold mb-2">Getting here</h3>
                                    <p className="text-sm text-[#b0f020] font-bold mb-1">{gym.location}</p>
                                    <p className="text-xs text-gray-400 max-w-[200px]">{gym.address}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <button
                                    onClick={() => setIsMapOpen(true)}
                                    className="w-full bg-[#1c221c] hover:bg-[#b0f020] hover:text-black text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 border border-white/5"
                                >
                                    <MapIcon size={16} />
                                    View on Map
                                </button>
                            </div>
                        </div>

                        {/* CTA / Info Card */}
                        {/* <div className="bg-gradient-to-br from-[#121612] to-[#0c100c] border border-[#1c221c] rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Dumbbell size={160} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">
                                    Ready to <br /> <span className="text-[#b0f020]">Transform?</span>
                                </h3>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                    Join {gym.name} today and get 14 days of personal training session for free.
                                </p>
                                <button className="flex items-center gap-2 text-[#b0f020] font-black group/btn text-sm">
                                    LEARN MORE <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GymDetails;
