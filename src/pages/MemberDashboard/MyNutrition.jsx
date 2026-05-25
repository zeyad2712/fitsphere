import React, { useState } from 'react';
import { 
    Apple, Droplets, Flame, Plus, ChevronRight, 
    Search, Filter, Utensils, Coffee, Pizza, Cookie,
    TrendingUp, LayoutDashboard, Dumbbell, BarChart3, Settings, Menu, Bell, Clock, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarDashboard from '../../components/SidebarDashboard';

const MyNutrition = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [waterGlasses, setWaterGlasses] = useState(6);
    const [loggedMeals, setLoggedMeals] = useState([]);

    const toggleMealLog = (id) => {
        setLoggedMeals(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Mock Data
    const macros = [
        { label: 'Calories', current: 1840, target: 2400, color: '#b0f020', unit: 'kcal' },
        { label: 'Protein', current: 142, target: 180, color: '#3b82f6', unit: 'g' },
        { label: 'Carbs', current: 210, target: 280, color: '#f59e0b', unit: 'g' },
        { label: 'Fats', current: 58, target: 75, color: '#ec4899', unit: 'g' }
    ];

    const meals = [
        { id: 1, type: 'Breakfast', icon: Coffee, name: 'Oatmeal with Berries & Whey', calories: 450, macros: '40P / 60C / 8F', time: '08:30 AM' },
        { id: 2, type: 'Lunch', icon: Utensils, name: 'Grilled Chicken & Quinoa Bowl', calories: 650, macros: '50P / 70C / 15F', time: '01:00 PM' },
        { id: 3, type: 'Snack', icon: Cookie, name: 'Greek Yogurt & Almonds', calories: 250, macros: '20P / 15C / 12F', time: '04:30 PM' },
        { id: 4, type: 'Dinner', icon: Pizza, name: 'Salmon with Roasted Veggies', calories: 490, macros: '35P / 25C / 22F', time: '08:00 PM' }
    ];

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
        <div className="flex min-h-screen bg-[#0a0d0a] text-white font-sans">
            {/* Sidebar */}
            <SidebarDashboard 
                isSidebarOpen={isSidebarOpen} 
                role="member" 
                activeTab="nutrition" 
            />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'}`}>
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0d0a]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden md:block">
                            <Menu size={20} className="text-gray-400" />
                        </button>
                        <h2 className="text-xl font-bold">Nutrition Tracker</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <Bell size={20} className="text-gray-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#b0f020] rounded-full ring-2 ring-[#0a0d0a]"></span>
                        </button>
                        <div className="w-10 h-10 rounded-full border-2 border-[#b0f020]/20 p-0.5">
                            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </header>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="p-8 space-y-8"
                >
                    {/* Top Section - Macros & Water */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Macro Summary */}
                        <motion.div variants={itemVariants} className="lg:col-span-3 bg-[#121612] p-8 rounded-[2.5rem] border border-white/5 grid grid-cols-1 md:grid-cols-4 gap-8">
                            {macros.map((macro, i) => (
                                <div key={i} className="flex flex-col items-center md:items-start">
                                    <div className="flex justify-between w-full mb-3 px-1">
                                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{macro.label}</span>
                                        <span className="text-xs font-black" style={{ color: macro.color }}>{Math.round((macro.current/macro.target)*100)}%</span>
                                    </div>
                                    <div className="text-2xl font-bold mb-4">{macro.current} <span className="text-sm text-gray-600 font-medium">{macro.unit}</span></div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(macro.current/macro.target)*100}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: macro.color }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-gray-600 mt-2">Target: {macro.target}{macro.unit}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Water Tracker */}
                        <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#121612] to-[#0a0d0a] p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-between text-center group">
                            <div className="p-4 bg-cyan-500/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                                <Droplets className="text-cyan-500" size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Stay Hydrated</h3>
                                <p className="text-2xl font-bold text-cyan-500">{waterGlasses} <span className="text-sm text-gray-500">/ 10 glasses</span></p>
                            </div>
                            <div className="flex gap-2 mt-6">
                                {[...Array(10)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setWaterGlasses(i + 1)}
                                        className={`w-3 h-6 rounded-full cursor-pointer transition-all ${i < waterGlasses ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/5'}`}
                                    />
                                ))}
                            </div>
                            <button 
                                onClick={() => setWaterGlasses(prev => Math.min(prev + 1, 10))}
                                className="mt-6 w-full py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={18} /> Drink 1 Glass
                            </button>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Meal Log */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-2xl font-bold">Daily Meal Log</h3>
                                {/* <button className="bg-[#b0f020] text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
                                    + Log New Meal
                                </button> */}
                            </div>
                            
                            <div className="space-y-4">
                                {meals.map((meal) => (
                                    <div key={meal.id} className="bg-[#121612] p-5 rounded-[2rem] border border-white/5 flex items-center gap-6 group hover:border-[#b0f020]/20 transition-all cursor-pointer">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#b0f020]/10 group-hover:text-[#b0f020] transition-all">
                                            <meal.icon size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{meal.type}</span>
                                                <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                                <span className="text-[10px] text-gray-600 flex items-center gap-1"><Clock size={10} /> {meal.time}</span>
                                            </div>
                                            <h4 className="font-bold text-lg group-hover:text-white transition-colors">{meal.name}</h4>
                                            <p className="text-xs text-gray-500 font-medium">{meal.macros}</p>
                                        </div>
                                        <div className="text-right flex items-center gap-4">
                                            <div>
                                                <p className="text-lg font-bold text-[#b0f020]">{meal.calories}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase">kcal</p>
                                            </div>
                                            {/* <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMealLog(meal.id);
                                                }}
                                                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                                                    loggedMeals.includes(meal.id)
                                                    ? 'bg-[#b0f020] text-black shadow-[0_0_15px_rgba(176,240,32,0.3)]'
                                                    : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white border border-white/5'
                                                }`}
                                            >
                                                {loggedMeals.includes(meal.id) ? (
                                                    <><CheckCircle2 size={14} /> Eaten</>
                                                ) : (
                                                    <><Plus size={14} /> Log</>
                                                )}
                                            </button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Nutrition Insights */}
                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="bg-[#121612] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b0f020]/5 rounded-full blur-[60px]"></div>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <TrendingUp size={20} className="text-[#b0f020]" />
                                    Daily Insight
                                </h3>
                                <div className="space-y-6">
                                    <div className="p-5 rounded-3xl bg-[#0a0d0a] border border-white/5">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-2">Protein Intake</p>
                                        <p className="text-sm leading-relaxed">You're <span className="text-[#b0f020] font-bold">38g away</span> from your protein goal. Try adding a shake or snack now.</p>
                                    </div>
                                    <div className="p-5 rounded-3xl bg-[#0a0d0a] border border-white/5">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-2">Energy Levels</p>
                                        <p className="text-sm leading-relaxed">Based on your carb timing, your energy will be optimal for your <span className="text-[#b0f020] font-bold">5:30 PM workout</span>.</p>
                                    </div>
                                </div>
                                <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                                    View Full Analytics
                                </button>
                            </div>

                            {/* Food Search Tip */}
                            <div className="bg-gradient-to-br from-[#121612] to-[#0a0d0a] p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-[#b0f020]/10 rounded-full flex items-center justify-center mb-4">
                                    <Search size={24} className="text-[#b0f020]" />
                                </div>
                                <h4 className="font-bold mb-2">Quick Log</h4>
                                <p className="text-xs text-gray-500 leading-relaxed mb-6">Can't find your food? Use our barcode scanner in the mobile app for instant logging.</p>
                                <img 
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=200&fit=crop" 
                                    className="w-full h-24 object-cover rounded-2xl border border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-700" 
                                    alt="Food" 
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default MyNutrition;
