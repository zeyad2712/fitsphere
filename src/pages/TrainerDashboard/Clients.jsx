import React, { useState } from 'react';
import {
    LayoutDashboard, Users, Calendar, BarChart3, Settings,
    Bell, Search, Plus, MessageSquare, Clock, LogOut, Menu, X,
    ChevronRight, MoreVertical, Edit3, Trash2, Mail, Phone,
    Filter, Download, Dumbbell, Apple
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SidebarDashboard from '../../components/SidebarDashboard';

const Clients = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredAction, setHoveredAction] = useState(null);
    const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
    const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [workoutData, setWorkoutData] = useState({
        name: '',
        exercises: [{ id: Date.now(), name: '', sets: '', reps: '' }]
    });
    const [nutritionData, setNutritionData] = useState({
        name: '',
        meals: [{ id: Date.now(), type: 'Breakfast', name: '', calories: '', macros: '' }]
    });

    const addExerciseRow = () => {
        setWorkoutData({
            ...workoutData,
            exercises: [...workoutData.exercises, { id: Date.now(), name: '', sets: '', reps: '' }]
        });
    };

    const removeExerciseRow = (id) => {
        if (workoutData.exercises.length > 1) {
            setWorkoutData({
                ...workoutData,
                exercises: workoutData.exercises.filter(ex => ex.id !== id)
            });
        }
    };

    const handleExerciseChange = (id, field, value) => {
        setWorkoutData({
            ...workoutData,
            exercises: workoutData.exercises.map(ex =>
                ex.id === id ? { ...ex, [field]: value } : ex
            )
        });
    };

    const addMealRow = () => {
        setNutritionData({
            ...nutritionData,
            meals: [...nutritionData.meals, { id: Date.now(), type: 'Snack', name: '', calories: '', macros: '' }]
        });
    };

    const removeMealRow = (id) => {
        if (nutritionData.meals.length > 1) {
            setNutritionData({
                ...nutritionData,
                meals: nutritionData.meals.filter(meal => meal.id !== id)
            });
        }
    };

    const handleMealChange = (id, field, value) => {
        setNutritionData({
            ...nutritionData,
            meals: nutritionData.meals.map(meal =>
                meal.id === id ? { ...meal, [field]: value } : meal
            )
        });
    };

    // Mock Data
    const clients = [
        { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', phone: '+1 555-0101', plan: 'Muscle Building', assignedWorkout: 'Yes', assignedNutrition: 'Yes', joined: 'Mar 12, 2024', progress: 75, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop' },
        { id: 2, name: 'Sarah Miller', email: 'sarah.m@example.com', phone: '+1 555-0102', plan: 'Weight Loss', assignedWorkout: 'No', assignedNutrition: 'No', joined: 'Apr 05, 2024', progress: 30, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
        { id: 3, name: 'Mike Ross', email: 'mike.r@example.com', phone: '+1 555-0103', plan: 'Endurance', assignedWorkout: 'Yes', assignedNutrition: 'Yes', joined: 'Feb 20, 2024', progress: 90, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
        { id: 4, name: 'Emma Wilson', email: 'emma.w@example.com', phone: '+1 555-0104', plan: 'Yoga Flow', assignedWorkout: 'Yes', assignedNutrition: 'No', joined: 'Jan 15, 2024', progress: 100, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        { id: 5, name: 'David Chen', email: 'david.c@example.com', phone: '+1 555-0105', plan: 'HIIT Expert', assignedWorkout: 'Yes', assignedNutrition: 'Yes', joined: 'Mar 28, 2024', progress: 45, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
        { id: 6, name: 'Olivia Brown', email: 'olivia.b@example.com', phone: '+1 555-0106', plan: 'Post-Rehab', assignedWorkout: 'Yes', assignedNutrition: 'Yes', joined: 'Apr 10, 2024', progress: 15, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' }
    ];

    // Filter and Export Logic
    const handleExportCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Plan', 'Assigned Workout', 'Joined Date', 'Progress'];
        const csvRows = [headers.join(',')];

        clients.forEach(client => {
            const row = [
                client.id,
                `"${client.name}"`,
                `"${client.email}"`,
                `"${client.phone}"`,
                `"${client.plan}"`,
                `"${client.assignedWorkout}"`,
                `"${client.joined}"`,
                `${client.progress}%`
            ];
            csvRows.push(row.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'fitsphere_clients.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex min-h-screen bg-[#0a0d0a] text-white font-sans">
            {/* Sidebar */}
            <SidebarDashboard
                isSidebarOpen={isSidebarOpen}
                role="trainer"
                activeTab="clients"
            />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'}`}>
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0d0a]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden md:block">
                            <Menu size={20} className="text-gray-400" />
                        </button>
                        <h2 className="text-xl font-bold">My Clients</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search clients..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#121612] border border-white/5 rounded-xl py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-[#b0f020]/50 transition-all"
                            />
                        </div> */}
                        <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <Bell size={20} className="text-gray-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#b0f020] rounded-full ring-2 ring-[#0a0d0a]"></span>
                        </button>
                        <div className="w-10 h-10 rounded-full border-2 border-[#b0f020]/20 p-0.5">
                            <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                <input
                                    type="text"
                                    placeholder="Filter by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white/5 border border-white/10 pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-[#b0f020]/50 transition-all w-48"
                                />
                            </div>
                            <button
                                onClick={handleExportCSV}
                                className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-all text-gray-300 hover:text-[#b0f020]"
                            >
                                <Download size={16} /> Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Clients Table Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#121612] rounded-3xl border border-white/5 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-gray-500 text-left text-sm border-b border-white/5">
                                        <th className="p-6 font-medium">Client Info</th>
                                        <th className="p-6 font-medium">Joined Date</th>
                                        <th className="p-6 font-medium">Current Goal</th>
                                        <th className="p-6 font-medium">Progress</th>
                                        <th className="p-6 font-medium">Assigned Workout</th>
                                        <th className="p-6 font-medium">Assigned Nutrition</th>
                                        <th className="p-6 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                                    {clients.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((client) => (
                                        <motion.tr key={client.id} variants={itemVariants} className="border-b border-white/5 last:border-0 group hover:bg-white/[0.02] transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <img src={client.img} alt={client.name} className="w-11 h-11 rounded-xl object-cover border border-white/10" />
                                                    <div>
                                                        <p className="font-bold text-sm">{client.name}</p>
                                                        <p className="text-xs text-gray-500">{client.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-sm text-gray-400">{client.joined}</td>
                                            <td className="p-6 text-sm text-gray-400">{client.plan}</td>
                                            <td className="p-6">
                                                <div className="w-32 flex items-center gap-3">
                                                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${client.progress}%` }}
                                                            transition={{ duration: 1 }}
                                                            className="h-full bg-[#b0f020] rounded-full"
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-500">{client.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${client.assignedWorkout === 'Yes' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    {client.assignedWorkout}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border ${client.assignedNutrition === 'Yes' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    {client.assignedNutrition}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <div className="relative">
                                                        <motion.button
                                                            onClick={() => {
                                                                setSelectedClient(client);
                                                                setIsWorkoutModalOpen(true);
                                                            }}
                                                            onMouseEnter={() => setHoveredAction(`add-${client.id}`)}
                                                            onMouseLeave={() => setHoveredAction(null)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 bg-[#b0f020]/10 text-[#b0f020] rounded-lg border border-[#b0f020]/20 hover:bg-[#b0f020] hover:text-black transition-all"
                                                        >
                                                            <Plus size={18} />
                                                        </motion.button>

                                                        <AnimatePresence>
                                                            {hoveredAction === `add-${client.id}` && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#b0f020] text-black text-[10px] font-black uppercase tracking-wider rounded-lg shadow-xl z-50 whitespace-nowrap"
                                                                >
                                                                    ADD Workout
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#b0f020]"></div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    <div className="relative">
                                                        <motion.button
                                                            onClick={() => {
                                                                setSelectedClient(client);
                                                                setIsNutritionModalOpen(true);
                                                            }}
                                                            onMouseEnter={() => setHoveredAction(`nutri-${client.id}`)}
                                                            onMouseLeave={() => setHoveredAction(null)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="p-2 bg-orange-500/10 text-orange-500 rounded-lg border border-orange-500/20 hover:bg-orange-500 hover:text-black transition-all"
                                                        >
                                                            <Apple size={18} />
                                                        </motion.button>

                                                        <AnimatePresence>
                                                            {hoveredAction === `nutri-${client.id}` && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-orange-500 text-black text-[10px] font-black uppercase tracking-wider rounded-lg shadow-xl z-50 whitespace-nowrap"
                                                                >
                                                                    ADD Nutrition
                                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-orange-500"></div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    {/* <button className="p-2 bg-white/5 text-gray-400 rounded-lg border border-white/5 hover:border-white/10 hover:text-white transition-all">
                                                        <MessageSquare size={18} />
                                                    </button> */}
                                                    <button className="p-2 bg-white/5 text-gray-400 rounded-lg border border-white/5 hover:border-white/10 hover:text-white transition-all">
                                                        <Edit3 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Add Workout Modal */}
            <AnimatePresence>
                {isWorkoutModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsWorkoutModalOpen(false)}
                            className="absolute inset-0 bg-[#0a0d0a]/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#121612] border border-white/5 rounded-[2.5rem] w-full max-w-2xl p-8 md:p-10 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Add Workout Plan</h3>
                                    <p className="text-gray-500 text-sm mt-1">Assigning to: <span className="text-[#b0f020] font-bold">{selectedClient?.name}</span></p>
                                </div>
                                <button onClick={() => setIsWorkoutModalOpen(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsWorkoutModalOpen(false); }}>
                                <div className="space-y-3">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black px-1">Workout Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Monday Push Day"
                                        value={workoutData.name}
                                        onChange={(e) => setWorkoutData({ ...workoutData, name: e.target.value })}
                                        className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#b0f020] outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Exercises List</label>
                                        <button
                                            type="button"
                                            onClick={addExerciseRow}
                                            className="text-[#b0f020] text-xs font-bold hover:underline flex items-center gap-1"
                                        >
                                            <Plus size={14} /> Add Exercise
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {workoutData.exercises.map((ex, index) => (
                                            <motion.div
                                                key={ex.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0a0d0a] p-5 rounded-3xl border border-white/5 group relative"
                                            >
                                                <div className="md:col-span-6 space-y-1">
                                                    <span className="text-[9px] text-gray-600 uppercase font-bold">Exercise Name</span>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Exercise name"
                                                        value={ex.name}
                                                        onChange={(e) => handleExerciseChange(ex.id, 'name', e.target.value)}
                                                        className="w-full bg-transparent border-b border-white/5 py-1 focus:border-[#b0f020] outline-none transition-colors text-sm"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 space-y-1">
                                                    <span className="text-[9px] text-gray-600 uppercase font-bold">Sets</span>
                                                    <input
                                                        required
                                                        type="number"
                                                        placeholder="0"
                                                        value={ex.sets}
                                                        onChange={(e) => handleExerciseChange(ex.id, 'sets', e.target.value)}
                                                        className="w-full bg-transparent border-b border-white/5 py-1 focus:border-[#b0f020] outline-none transition-colors text-sm"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 space-y-1">
                                                    <span className="text-[9px] text-gray-600 uppercase font-bold">Reps</span>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="8-12"
                                                        value={ex.reps}
                                                        onChange={(e) => handleExerciseChange(ex.id, 'reps', e.target.value)}
                                                        className="w-full bg-transparent border-b border-white/5 py-1 focus:border-[#b0f020] outline-none transition-colors text-sm"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 flex items-end justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExerciseRow(ex.id)}
                                                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsWorkoutModalOpen(false)}
                                        className="flex-1 py-4 rounded-2xl border border-white/5 text-gray-400 font-bold hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 rounded-2xl bg-[#b0f020] text-black font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(176,240,32,0.3)] transition-all"
                                    >
                                        Assign Workout
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add Nutrition Modal */}
            <AnimatePresence>
                {isNutritionModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsNutritionModalOpen(false)}
                            className="absolute inset-0 bg-[#0a0d0a]/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#121612] border border-white/5 rounded-[2.5rem] w-full max-w-2xl p-8 md:p-10 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Add Nutrition Plan</h3>
                                    <p className="text-gray-500 text-sm mt-1">Assigning to: <span className="text-orange-500 font-bold">{selectedClient?.name}</span></p>
                                </div>
                                <button onClick={() => setIsNutritionModalOpen(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsNutritionModalOpen(false); }}>
                                <div className="space-y-3">
                                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black px-1">Plan Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. High Protein Bulk"
                                        value={nutritionData.name}
                                        onChange={(e) => setNutritionData({ ...nutritionData, name: e.target.value })}
                                        className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Meals List</label>
                                        <button
                                            type="button"
                                            onClick={addMealRow}
                                            className="text-orange-500 text-xs font-bold hover:underline flex items-center gap-1"
                                        >
                                            <Plus size={14} /> Add Meal
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {nutritionData.meals.map((meal, index) => (
                                            <motion.div
                                                key={meal.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0a0d0a] p-5 rounded-3xl border border-white/5 group relative"
                                            >
                                                <div className="md:col-span-3 space-y-1">
                                                    <span className="text-[9px] text-gray-600 uppercase font-bold">Meal Type</span>
                                                    <select
                                                        value={meal.type}
                                                        onChange={(e) => handleMealChange(meal.id, 'type', e.target.value)}
                                                        className="w-full bg-transparent border-b border-white/5 py-1 focus:border-orange-500 outline-none transition-colors text-sm text-gray-300"
                                                    >
                                                        <option value="Breakfast">Breakfast</option>
                                                        <option value="Lunch">Lunch</option>
                                                        <option value="Dinner">Dinner</option>
                                                        <option value="Snack">Snack</option>
                                                        <option value="Pre-Workout">Pre-Workout</option>
                                                    </select>
                                                </div>
                                                <div className="md:col-span-4 space-y-1">
                                                    <span className="text-[9px] text-gray-600 uppercase font-bold">Meal Name</span>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="e.g. Scrambled Eggs"
                                                        value={meal.name}
                                                        onChange={(e) => handleMealChange(meal.id, 'name', e.target.value)}
                                                        className="w-full bg-transparent border-b border-white/5 py-1 focus:border-orange-500 outline-none transition-colors text-sm"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 space-y-1">
                                                    <span className="text-[9px] text-gray-600 uppercase font-bold">Kcal</span>
                                                    <input
                                                        required
                                                        type="number"
                                                        placeholder="0"
                                                        value={meal.calories}
                                                        onChange={(e) => handleMealChange(meal.id, 'calories', e.target.value)}
                                                        className="w-full bg-transparent border-b border-white/5 py-1 focus:border-orange-500 outline-none transition-colors text-sm"
                                                    />
                                                </div>
                                                <div className="md:col-span-2 space-y-1">
                                                    <span className="text-[9px] text-gray-600 uppercase font-bold">Macros</span>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="P/C/F"
                                                        value={meal.macros}
                                                        onChange={(e) => handleMealChange(meal.id, 'macros', e.target.value)}
                                                        className="w-full bg-transparent border-b border-white/5 py-1 focus:border-orange-500 outline-none transition-colors text-sm"
                                                    />
                                                </div>
                                                <div className="md:col-span-1 flex items-end justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMealRow(meal.id)}
                                                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsNutritionModalOpen(false)}
                                        className="flex-1 py-4 rounded-2xl border border-white/5 text-gray-400 font-bold hover:bg-white/5 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 rounded-2xl bg-orange-500 text-black font-black uppercase tracking-widest hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] transition-all"
                                    >
                                        Assign Nutrition
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Clients;
