import React, { useState } from 'react';
import { 
    Dumbbell, Clock, Flame, Play, ChevronRight, 
    Calendar, CheckCircle2, MoreVertical, Search,
    Filter, LayoutDashboard, Apple, MessageSquare, Settings, Menu, Bell, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarDashboard from '../../components/SidebarDashboard';

const MyWorkouts = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedDay, setSelectedDay] = useState('Tue');
    const [loggedExercises, setLoggedExercises] = useState([]);

    const toggleLog = (id) => {
        setLoggedExercises(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Mock Data
    const weekDays = [
        { day: 'Mon', date: '22', status: 'completed' },
        { day: 'Tue', date: '23', status: 'current' },
        { day: 'Wed', date: '24', status: 'upcoming' },
        { day: 'Thu', date: '25', status: 'upcoming' },
        { day: 'Fri', date: '26', status: 'upcoming' },
        { day: 'Sat', date: '27', status: 'rest' },
        { day: 'Sun', date: '28', status: 'upcoming' }
    ];

    const currentWorkout = {
        title: 'Push Day - Hypertrophy',
        focus: 'Chest, Shoulders & Triceps',
        duration: '55 min',
        calories: '450 kcal',
        difficulty: 'Intermediate',
        exercises: [
            { id: 1, name: 'Incline Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop' },
            { id: 2, name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60s', img: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=200&h=200&fit=crop' },
            { id: 3, name: 'Cable Chest Flys', sets: 3, reps: '15', rest: '45s', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop' },
            { id: 4, name: 'Lateral Raises', sets: 4, reps: '15-20', rest: '45s', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=200&h=200&fit=crop' },
            { id: 5, name: 'Tricep Rope Pushdowns', sets: 3, reps: '12-15', rest: '60s', img: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?w=200&h=200&fit=crop' }
        ]
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="flex min-h-screen bg-[#0a0d0a] text-white font-sans">
            {/* Sidebar */}
            <SidebarDashboard 
                isSidebarOpen={isSidebarOpen} 
                role="member" 
                activeTab="workouts" 
            />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'}`}>
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0d0a]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden md:block">
                            <Menu size={20} className="text-gray-400" />
                        </button>
                        <h2 className="text-xl font-bold">My Training Plan</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search exercises..." 
                                className="bg-[#121612] border border-white/5 rounded-xl py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-[#b0f020]/50 transition-all"
                            />
                        </div>
                        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <Bell size={20} className="text-gray-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#b0f020] rounded-full ring-2 ring-[#0a0d0a]"></span>
                        </button> */}
                        <div className="w-10 h-10 rounded-full border-2 border-[#b0f020]/20 p-0.5">
                            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Calendar / Weekly View */}
                    <div className="bg-[#121612] p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
                        {weekDays.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedDay(item.day)}
                                className={`flex flex-col items-center min-w-[70px] p-4 rounded-3xl transition-all duration-300 ${
                                    selectedDay === item.day 
                                    ? 'bg-[#b0f020] text-black shadow-[0_10px_20px_rgba(176,240,32,0.2)]' 
                                    : 'bg-[#1c221c] text-gray-400 hover:bg-[#252b25]'
                                }`}
                            >
                                <span className={`text-[10px] font-black uppercase tracking-wider mb-1 ${selectedDay === item.day ? 'text-black/60' : 'text-gray-500'}`}>
                                    {item.day}
                                </span>
                                <span className="text-xl font-bold">{item.date}</span>
                                {item.status === 'completed' && (
                                    <CheckCircle2 size={12} className={`mt-2 ${selectedDay === item.day ? 'text-black' : 'text-[#b0f020]'}`} />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Exercise List */}
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-2 space-y-4"
                        >
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h3 className="text-xl font-bold">Exercises List</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Filter size={14} /> Sort by Muscle Group
                                </div>
                            </div>
                            
                            {currentWorkout.exercises.map((ex, i) => (
                                <motion.div 
                                    key={ex.id}
                                    variants={itemVariants}
                                    className="bg-[#121612] p-4 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-[#b0f020]/30 transition-all cursor-pointer"
                                >
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                                        <img src={ex.img} alt={ex.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg mb-2 group-hover:text-[#b0f020] transition-colors">{ex.name}</h4>
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-500 uppercase font-black">Sets</span>
                                                <span className="text-sm font-bold">{ex.sets}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-500 uppercase font-black">Reps</span>
                                                <span className="text-sm font-bold">{ex.reps}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-500 uppercase font-black">Rest</span>
                                                <span className="text-sm font-bold text-[#b0f020]">{ex.rest}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <button 
                                        onClick={() => toggleLog(ex.id)}
                                        className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm font-bold ${
                                            loggedExercises.includes(ex.id)
                                            ? 'bg-[#b0f020] text-black shadow-[0_0_15px_rgba(176,240,32,0.3)]'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                                        }`}
                                    >
                                        {loggedExercises.includes(ex.id) ? (
                                            <><CheckCircle2 size={16} /> Logged</>
                                        ) : (
                                            <><Plus size={16} /> Add to Log</>
                                        )}
                                    </button> */}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Workout Overview Sidebar */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-[#121612] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b0f020]/5 rounded-full blur-[60px]"></div>
                                <div className="p-4 bg-[#b0f020]/10 rounded-2xl w-fit mb-6">
                                    <Dumbbell className="text-[#b0f020]" size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{currentWorkout.title}</h3>
                                <p className="text-gray-500 text-sm mb-8">{currentWorkout.focus}</p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <Clock className="text-[#b0f020] mb-2" size={18} />
                                        <p className="text-xs text-gray-500 font-bold uppercase">Duration</p>
                                        <p className="font-bold">{currentWorkout.duration}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <Flame className="text-orange-500 mb-2" size={18} />
                                        <p className="text-xs text-gray-500 font-bold uppercase">Calories</p>
                                        <p className="font-bold">{currentWorkout.calories}</p>
                                    </div>
                                </div>

                                <button className="w-full py-5 bg-[#b0f020] text-black font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_10px_30px_rgba(176,240,32,0.3)] transition-all transform hover:-translate-y-1 active:scale-95">
                                    Start Session
                                </button>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-gradient-to-br from-[#121612] to-[#0a0d0a] p-8 rounded-[2.5rem] border border-white/5">
                                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#b0f020] rounded-full"></span>
                                    Coach's Tip
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed italic">
                                    "Focus on the eccentric phase (the way down) for 3 seconds on your bench press today to maximize muscle fiber recruitment."
                                </p>
                                <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                                    <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=50&h=50&fit=crop" className="w-10 h-10 rounded-full object-cover" alt="Coach" />
                                    <div>
                                        <p className="text-xs font-bold">Coach Marcus</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Master Trainer</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MyWorkouts;
