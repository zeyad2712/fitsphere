import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, Calendar, BarChart3, Settings, 
    Bell, Search, Plus, MessageSquare, Clock, TrendingUp, 
    DollarSign, Star, MoreVertical, LogOut, Menu, X,
    ChevronRight, CheckCircle2, AlertCircle, Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SidebarDashboard from '../../components/SidebarDashboard';

const TrainerDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Data
    const stats = [
        { label: 'Total Clients', value: '24', icon: Users, color: '#b0f020', trend: '+12%' },
        { label: 'Active Sessions', value: '8', icon: Clock, color: '#3b82f6', trend: 'Today' },
        { label: 'Monthly Revenue', value: '4,250 EGP', icon: DollarSign, color: '#10b981', trend: '+18%' },
        { label: 'Avg Rating', value: '4.9', icon: Star, color: '#f59e0b', trend: '48 Reviews' }
    ];

    const recentClients = [
        { id: 1, name: 'Alex Johnson', plan: 'Muscle Building', status: 'Active', progress: 75, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop' },
        { id: 2, name: 'Sarah Miller', plan: 'Weight Loss', status: 'Pending', progress: 30, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
        { id: 3, name: 'Mike Ross', plan: 'Endurance', status: 'Active', progress: 90, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
        { id: 4, name: 'Emma Wilson', plan: 'Yoga Flow', status: 'Completed', progress: 100, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }
    ];

    const upcomingSessions = [
        { id: 1, client: 'Alex Johnson', time: '09:00 AM', type: 'Personal Training' },
        { id: 2, client: 'Sarah Miller', time: '11:30 AM', type: 'Nutrition Consult' },
        { id: 3, client: 'David Chen', time: '02:00 PM', type: 'HIIT Session' }
    ];

    // Sidebar is now handled by SidebarDashboard component

    return (
        <div className="flex min-h-screen bg-[#0a0d0a] text-white font-sans">
            {/* Sidebar */}
            <SidebarDashboard 
                isSidebarOpen={isSidebarOpen} 
                role="trainer" 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'}`}>
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0d0a]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden md:block"
                        >
                            <Menu size={20} className="text-gray-400" />
                        </button>
                        {/* <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search clients, plans..." 
                                className="bg-[#121612] border border-white/5 rounded-xl py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-[#b0f020]/50 transition-all"
                            />
                        </div> */}
                    </div>

                    <div className="flex items-center gap-6">
                        {/* <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <Bell size={20} className="text-gray-400" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#b0f020] rounded-full ring-2 ring-[#0a0d0a]"></span>
                        </button> */}
                        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold">Coach Marcus</p>
                                {/* <p className="text-xs text-gray-500">Master Trainer</p> */}
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-[#b0f020]/20 p-0.5">
                                <img 
                                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop" 
                                    alt="Profile" 
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Welcome Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold">Trainer Dashboard</h2>
                            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
                        </div>
                        {/* <button className="bg-[#b0f020] text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_10px_30px_rgba(176,240,32,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 self-start md:self-auto">
                            <Plus size={20} />
                            New Workout Plan
                        </button> */}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#121612] p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#b0f020]/30 transition-all duration-500"
                            >
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#b0f020]/5 rounded-full blur-2xl group-hover:bg-[#b0f020]/10 transition-colors"></div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-500">
                                        <stat.icon size={24} style={{ color: stat.color }} />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Clients Table */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2 bg-[#121612] rounded-3xl border border-white/5 p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold">Active Clients</h3>
                                <Link to="/trainer-dashboard/clients" className="text-[#b0f020] text-sm font-bold hover:underline">View All</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-gray-500 text-left text-sm">
                                            <th className="pb-6 font-medium">Client</th>
                                            <th className="pb-6 font-medium">Current Plan</th>
                                            <th className="pb-6 font-medium">Progress</th>
                                            <th className="pb-6 font-medium text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="space-y-4">
                                        {recentClients.map((client) => (
                                            <tr key={client.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={client.img} alt={client.name} className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                                                        <div>
                                                            <p className="font-bold text-sm">{client.name}</p>
                                                            <p className={`text-[10px] font-bold uppercase tracking-wider ${
                                                                client.status === 'Active' ? 'text-green-500' : 
                                                                client.status === 'Pending' ? 'text-yellow-500' : 'text-blue-500'
                                                            }`}>
                                                                {client.status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm text-gray-400">{client.plan}</td>
                                                <td className="py-4">
                                                    <div className="w-32 flex items-center gap-3">
                                                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${client.progress}%` }}
                                                                transition={{ duration: 1, delay: 0.5 }}
                                                                className="h-full bg-[#b0f020] rounded-full"
                                                            />
                                                        </div>
                                                        <span className="text-xs text-gray-500">{client.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                                        <ChevronRight size={18} className="text-gray-500" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Upcoming Schedule */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#121612] rounded-3xl border border-white/5 p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold">Upcoming</h3>
                                <Calendar size={20} className="text-[#b0f020]" />
                            </div>
                            <div className="space-y-6">
                                {upcomingSessions.map((session) => (
                                    <div key={session.id} className="relative pl-6 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-[#b0f020]/20 before:rounded-full group hover:before:bg-[#b0f020] transition-all">
                                        <p className="text-xs font-bold text-[#b0f020] mb-1">{session.time}</p>
                                        <h4 className="font-bold text-sm">{session.client}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{session.type}</p>
                                    </div>
                                ))}
                                <button className="w-full mt-4 py-4 rounded-2xl border border-white/5 text-sm text-gray-500 hover:bg-white/5 transition-all">
                                    View Full Schedule
                                </button>
                            </div>

                            {/* Weekly Goal Progress */}
                            <div className="mt-12 bg-[#0a0d0a] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#b0f020]/5 rounded-full blur-2xl"></div>
                                <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp size={16} className="text-[#b0f020]" />
                                    Weekly Goal
                                </h4>
                                <div className="flex items-end justify-between mb-2">
                                    <span className="text-2xl font-bold text-[#b0f020]">18/25</span>
                                    <span className="text-xs text-gray-500 pb-1">72%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '72%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-[#b0f020] to-[#8ac41a] rounded-full"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-500 mt-3 flex items-center gap-1">
                                    <AlertCircle size={10} />
                                    7 more sessions to reach your target
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TrainerDashboard;
