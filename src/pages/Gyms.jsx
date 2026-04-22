import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Star, Clock, Shield, Filter, Map as MapIcon, List } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { gymsData } from '../data/gyms';

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

// Custom Marker component to handle flyTo
const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 14, {
                duration: 1.5
            });
        }
    }, [center, map]);
    return null;
};

const Gyms = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGym, setSelectedGym] = useState(null);
    const [viewMode, setViewMode] = useState("split"); // 'split', 'list', 'map'

    const filteredGyms = gymsData.filter(gym =>
        gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const mapCenter = [30.0444, 31.3357]; // Approximate center

    return (
        <div className="bg-[#0a0d0a] min-h-screen text-white font-sans selection:bg-[#b0f020] selection:text-black">
            <Navbar />

            <div className="pt-24 pb-12 px-6 md:px-8 container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div className="max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
                            Find Your <span className="text-[#b0f020]">GYM</span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Discover elite fitness facilities across the city. Filter by location, features, and vibe.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* View Switcher */}
                        <div className="flex bg-[#121612] p-1 rounded-xl border border-[#1c221c] self-stretch sm:self-auto">
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-[#b0f020] text-black shadow-[0_0_15px_rgba(176,240,32,0.2)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <List size={16} />
                                <span className="hidden md:inline">List</span>
                            </button>
                            <button 
                                onClick={() => setViewMode('split')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'split' ? 'bg-[#b0f020] text-black shadow-[0_0_15px_rgba(176,240,32,0.2)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Shield size={16} />
                                <span className="hidden md:inline">Split</span>
                            </button>
                            <button 
                                onClick={() => setViewMode('map')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'map' ? 'bg-[#b0f020] text-black shadow-[0_0_15px_rgba(176,240,32,0.2)]' : 'text-gray-400 hover:text-white'}`}
                            >
                                <MapIcon size={16} />
                                <span className="hidden md:inline">Map</span>
                            </button>
                        </div>

                        <div className="relative group flex-1 sm:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search gyms..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-[#121612] border border-[#1c221c] rounded-xl py-3 pl-12 pr-6 w-full focus:outline-none focus:border-[#b0f020] transition-all text-sm"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <div className={`flex flex-col ${viewMode === 'split' ? 'lg:flex-row' : ''} gap-6 ${viewMode === 'list' ? '' : 'h-[800px]'}`}>
                    {/* List Section */}
                    {(viewMode === 'list' || viewMode === 'split') && (
                        <div className={`flex-1 ${viewMode === 'split' ? 'overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                            <div className={`grid grid-cols-1 ${viewMode === 'list' ? 'md:grid-cols-2 xl:grid-cols-3' : ''} gap-6`}>
                                {filteredGyms.map((gym, index) => (
                                    <motion.div
                                        key={gym.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => {
                                            setSelectedGym(gym);
                                            if (window.innerWidth < 1024) setViewMode('map');
                                        }}
                                        className={`bg-[#121612] border transition-all cursor-pointer rounded-2xl overflow-hidden group flex flex-col ${viewMode === 'split' ? 'sm:flex-row h-full sm:h-48' : 'h-full'} ${selectedGym?.id === gym.id ? 'border-[#b0f020] shadow-[0_0_20px_rgba(176,240,32,0.1)]' : 'border-[#1c221c] hover:border-[#b0f020]/40'
                                            }`}
                                    >
                                        <div className={`${viewMode === 'split' ? 'w-full sm:w-48 h-48 sm:h-full' : 'w-full h-56'} overflow-hidden shrink-0`}>
                                            <img src={gym.images?.[0] || gym.image} alt={gym.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6 flex flex-col justify-between flex-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold group-hover:text-[#b0f020] transition-colors">{gym.name}</h3>
                                                    <div className="flex items-center gap-1 text-[#b0f020] bg-[#b0f020]/10 px-2 py-1 rounded text-xs font-bold">
                                                        <Star size={12} fill="currentColor" />
                                                        {gym.rating}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
                                                    <MapPin size={14} />
                                                    {gym.location}
                                                </div>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {gym.features?.slice(0, 3).map((feat, i) => (
                                                        <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-[#0a0d0a] px-2 py-1 rounded border border-[#1c221c]">
                                                            {feat}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center pt-4 border-t border-[#1c221c]">
                                                <span className="text-[#b0f020] font-bold">{gym.price}</span>
                                                <Link to={`/gym/${gym.id}`} className="px-4 py-2 bg-[#b0f020] rounded-lg text-[#0f120f] text-[10px] font-black uppercase tracking-widest hover:bg-[#9de018] hover:shadow-[0_0_15px_rgba(176,240,32,0.3)] transition-all transform hover:-translate-y-0.5">VIEW DETAILS </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {filteredGyms.length === 0 && (
                                    <div className="text-center py-20 bg-[#121612] rounded-2xl border border-dashed border-[#1c221c] col-span-full">
                                        <p className="text-gray-500">No gyms found matching your search.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Map Section */}
                    {(viewMode === 'map' || viewMode === 'split') && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`${viewMode === 'split' ? 'lg:w-[450px] xl:w-[550px]' : 'w-full'} h-[500px] lg:h-full bg-[#121612] rounded-3xl overflow-hidden border border-[#1c221c] relative z-10`}
                        >
                        <MapContainer
                            center={mapCenter}
                            zoom={11}
                            style={{ height: '100%', width: '100%', background: '#0a0d0a' }}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            />
                            {filteredGyms.map(gym => (
                                <Marker
                                    key={gym.id}
                                    position={gym.coords}
                                    eventHandlers={{
                                        click: () => setSelectedGym(gym),
                                    }}
                                >
                                    <Popup className="custom-popup">
                                        <div className="p-1 text-black">
                                            <h4 className="font-bold">{gym.name}</h4>
                                            <p className="text-xs text-gray-600">{gym.location}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                            <MapController center={selectedGym?.coords} />
                        </MapContainer>

                        {/* Map Overlay Button (for mobile) */}
                        <div className="absolute top-4 right-4 z-[1000] lg:hidden">
                            <button className="bg-white text-black p-2 rounded-lg shadow-xl">
                                <MapIcon size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
                </div>
            </div>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                .leaflet-container {
                     background: #f8f9fa !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1c221c;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #b0f020;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 12px !important;
                    background: #fff !important;
                }
                .leaflet-popup-tip {
                    background: #fff !important;
                }
            `}} />
        </div>
    );
};

export default Gyms;
