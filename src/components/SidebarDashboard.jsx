import React from 'react';
import { 
    LayoutDashboard, Users, Calendar, BarChart3, Settings, 
    MessageSquare, LogOut, Dumbbell, Globe, Package, Tags, Layers, Video
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const SidebarDashboard = ({ isSidebarOpen, role = 'trainer', activeTab, setActiveTab }) => {
    const location = useLocation();

    // Menu items configuration based on role
    const menuConfigs = {
        trainer: [
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/trainer-dashboard' },
            { id: 'clients', label: 'My Clients', icon: Users, path: '/trainer-dashboard/clients' },
            // { id: 'schedule', label: 'Schedule', icon: Calendar, path: '#' },
            // { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '#' },
            // { id: 'messages', label: 'Messages', icon: MessageSquare, path: '#' },
            { id: 'settings', label: 'Settings', icon: Settings, path: '#' },
        ],
        member: [
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/member-dashboard' },
            { id: 'bookings', label: 'My Bookings', icon: Calendar, path: '/member-dashboard/my-bookings' },
            { id: 'workouts', label: 'My Workouts', icon: Dumbbell, path: '/member-dashboard/workouts' },
            { id: 'nutrition', label: 'Nutrition', icon: BarChart3, path: '/member-dashboard/nutrition' },
            // { id: 'messages', label: 'Messages', icon: MessageSquare, path: '#' },
            { id: 'settings', label: 'Settings', icon: Settings, path: '#' },
        ],
        admin: [
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/admin-dashboard' },
            { id: 'users', label: 'Manage Users', icon: Users, path: '/admin-dashboard' },
            { id: 'products', label: 'Manage Products', icon: Package, path: '/admin-dashboard' },
            { id: 'productCategories', label: 'Product Categories', icon: Tags, path: '/admin-dashboard' },
            { id: 'videoCategories', label: 'Video Categories', icon: Layers, path: '/admin-dashboard' },
            { id: 'videos', label: 'Video Library', icon: Video, path: '/admin-dashboard' },
        ]
    };

    const menuItems = menuConfigs[role] || menuConfigs.trainer;

    const isActive = (item) => {
        if (role === 'admin') {
            return activeTab === item.id;
        }
        if (item.path !== '#' && location.pathname === item.path) return true;
        return activeTab === item.id;
    };

    return (
        <motion.aside 
            initial={false}
            animate={{ width: isSidebarOpen ? 260 : 80 }}
            className="fixed left-0 top-0 h-full bg-[#121612] border-r border-white/5 z-50 overflow-hidden hidden md:block shadow-2xl"
        >
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#b0f020] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(176,240,32,0.3)]">
                    <Dumbbell className="text-black" size={20} />
                </div>
                {isSidebarOpen && (
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-bold text-xl tracking-tight text-white"
                    >
                        FitSphere
                    </motion.span>
                )}
            </div>

            <nav className="mt-8 px-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => {
                            if (setActiveTab && item.id !== 'clients') {
                                setActiveTab(item.id);
                            }
                        }}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
                            isActive(item)
                            ? 'bg-[#b0f020] text-black shadow-[0_10px_20px_rgba(176,240,32,0.15)]' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        <item.icon size={20} className={`shrink-0 transition-transform duration-300 ${!isActive(item) && 'group-hover:scale-110'}`} />
                        {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="absolute bottom-8 left-0 w-full px-4 space-y-2">
                <Link 
                    to="/" 
                    className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 group"
                >
                    <Globe size={20} className="shrink-0 group-hover:rotate-12 transition-transform" />
                    {isSidebarOpen && <span className="font-medium whitespace-nowrap">Back to Website</span>}
                </Link>

                <button className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group">
                    <LogOut size={20} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
                    {isSidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default SidebarDashboard;
