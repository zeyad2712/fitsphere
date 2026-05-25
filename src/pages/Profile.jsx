import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Dumbbell,
    Apple,
    Plus,
    X,
    Calendar,
    Weight,
    Ruler,
    Mail,
    Settings,
    ChevronRight,
    Search,
    ChevronLeft,
    Activity,
    Trash2,
    Edit3,
    LineChart,
    Phone,
    LayoutDashboard,
    DollarSign,
    Info,
    Building,
    UserCheck,
    MapPin,
    Map,
    Users,
    LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('personal');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('workout'); // 'workout', 'nutrition', 'edit-profile'
    const [editingItem, setEditingItem] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const passedData = location.state?.userData || {};
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || null);

    // Analytics State
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);

    const handleAnalyzeLogs = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setAnalysisData({
                totalWorkouts: workoutLogs.length,
                totalCalories: nutritionLogs.reduce((acc, log) => acc + (parseInt(log.calories) || 0), 0),
                avgWorkoutWeight: '90kg',
                topExercise: 'Barbell Squat',
                proteinAvg: '45g'
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    // Helper to safely extract string from potentially nested API response objects
    const extractValue = (data, key) => {
        if (!data) return null;
        if (typeof data === 'object') {
            // If the backend returns an object for this field (like phone: {id: 22, phone: '...'}),
            // we try to extract the value by the same key, or fallback to the first string value we find.
            return data[key] || data.value || data.name || JSON.stringify(data);
        }
        return data;
    };

    // Mock User Data combined with passed Data
    const [userData, setUserData] = useState({
        name: extractValue(passedData.name, 'name') || extractValue(passedData.gymName, 'gymName') || 'Ziad Waleed',
        email: extractValue(passedData.email, 'email') || extractValue(passedData.gymEmail, 'gymEmail') || 'ziad.waleed@example.com',
        phone: extractValue(passedData.phone, 'phone') || extractValue(passedData.gymPhone, 'phone') || '+20 123 456 7890',
        dob: extractValue(passedData.birth_date, 'birth_date') || '1999-05-15',
        role: passedData.role || 'member',
        goal: passedData.fitnessGoal || 'Hypertrophy',
        weight: passedData.weight ? `${passedData.weight}kg` : '78kg',
        height: passedData.height ? `${passedData.height}cm` : '182cm',
        age: '24',
        level: 'Intermediate',
        experienceYears: passedData.experienceYears || '5',
        specialization: passedData.specalization || passedData.specialization || 'Yoga, HIIT',
        pricePerMonth: passedData.fair || passedData.pricePerMonth || '50',
        bio: passedData.BIO || passedData.bio || 'Experienced trainer.',
        managerName: passedData.managerName || 'John Manager',
        managerEmail: passedData.managerEmail || 'manager@gym.com',
        city: passedData.city || 'Los Angeles',
        streetName: passedData.streetName || 'Sunset Blvd',
        crowdLevel: passedData.Crowd || 'low',
        pricePerSession: passedData.fair || passedData.pricePerSession || '15',
        description: passedData.description || 'A great place to work out.'
    });

    // Mock Workout Logs
    const [workoutLogs, setWorkoutLogs] = useState([
        { id: 1, date: '2024-04-18', exercise: 'Barbell Squat', sets: 4, reps: 8, weight: '100kg' },
        { id: 2, date: '2024-04-16', exercise: 'Bench Press', sets: 3, reps: 10, weight: '80kg' },
        { id: 3, date: '2024-04-15', exercise: 'Deadlift', sets: 3, reps: 5, weight: '140kg' }
    ]);

    // Mock Nutrition Logs
    const [nutritionLogs, setNutritionLogs] = useState([
        { id: 1, date: '2024-04-19', meal: 'Breakfast', calories: 650, protein: '40g', carbs: '70g', fats: '15g' },
        { id: 2, date: '2024-04-18', meal: 'Lunch', calories: 800, protein: '50g', carbs: '90g', fats: '25g' },
        { id: 3, date: '2024-04-18', meal: 'Dinner', calories: 700, protein: '45g', carbs: '60g', fats: '20g' }
    ]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (modalType === 'workout') {
            if (editingItem) {
                setWorkoutLogs(workoutLogs.map(log => log.id === editingItem.id ? { ...log, ...data } : log));
            } else {
                setWorkoutLogs([{ id: Date.now(), ...data }, ...workoutLogs]);
            }
        } else if (modalType === 'nutrition') {
            if (editingItem) {
                setNutritionLogs(nutritionLogs.map(log => log.id === editingItem.id ? { ...log, ...data } : log));
            } else {
                setNutritionLogs([{ id: Date.now(), ...data }, ...nutritionLogs]);
            }
        } else if (modalType === 'edit-profile') {
            setUserData({ ...userData, ...data });
        }

        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteLog = (id, type) => {
        if (type === 'workout') {
            setWorkoutLogs(workoutLogs.filter(log => log.id !== id));
        } else {
            setNutritionLogs(nutritionLogs.filter(log => log.id !== id));
        }
    };

    const openEditModal = (item, type) => {
        setEditingItem(item);
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleLogout = async () => {
        try {
            await fetch('https://recess-throwaway-unchanged.ngrok-free.dev/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': '69420'
                }
            });
            localStorage.removeItem('isAuthenticated');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('isAuthenticated');
            navigate('/login');
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Information', icon: <User size={20} /> },
        { id: 'workout', label: 'Workout Logs', icon: <Dumbbell size={20} /> },
        { id: 'nutrition', label: 'Nutrition Logs', icon: <Apple size={20} /> },
        { id: 'analytics', label: 'Analytics', icon: <LineChart size={20} /> }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-[#0a0d0a] text-white min-h-screen flex flex-col font-sans text-sm md:text-base">
            <Navbar />

            <motion.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex-1 pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto w-full"
            >
                {successMessage && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#b0f020]/20 border border-[#b0f020] text-[#b0f020] p-4 rounded-2xl mb-8 flex items-center justify-between font-bold"
                    >
                        <span>{successMessage}</span>
                        <button onClick={() => setSuccessMessage(null)} className="text-[#b0f020] hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </motion.div>
                )}
                <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">

                    {/* Sidebar */}
                    <motion.aside variants={itemVariants} className="lg:w-72 flex flex-col gap-2 relative">
                        <div className="sticky top-28 space-y-2">
                            <div className="p-6 bg-[#151a15] rounded-3xl border border-white/5 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#b0f020]/10 flex items-center justify-center border border-[#b0f020]/20 mb-4 mx-auto lg:mx-0">
                                    <User className="text-[#b0f020]" size={32} />
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-xl font-bold truncate">{userData.name}</h2>
                                    <span className="shrink-0 px-2 py-0.5 rounded-md bg-[#b0f020]/10 text-[#b0f020] text-[10px] font-black uppercase tracking-wider border border-[#b0f020]/20">
                                        {userData.role}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate mb-6">{userData.email}</p>
                                
                                <Link 
                                    to={`/${userData.role.toLowerCase()}-dashboard`}
                                    className="w-full bg-[#b0f020] text-black px-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#9de018] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_20px_rgba(176,240,32,0.1)]"
                                >
                                    <LayoutDashboard size={18} />
                                    Go to Dashboard
                                </Link>
                            </div>

                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium ${activeTab === tab.id
                                        ? 'bg-[#b0f020] text-black shadow-[0_10px_20px_rgba(176,240,32,0.1)]'
                                        : 'bg-[#151a15] text-gray-400 hover:bg-[#1e241e] hover:text-white border border-transparent hover:border-white/5'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="flex-1 text-left">{tab.label}</span>
                                    {activeTab === tab.id && <ChevronRight size={16} />}
                                </button>
                            ))}
                            
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-medium bg-[#151a15] text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 mt-2"
                            >
                                <LogOut size={20} />
                                <span className="flex-1 text-left">Logout</span>
                            </button>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.div variants={itemVariants} className="flex-1 bg-[#0f120f] rounded-[2.5rem] border border-white/5 p-6 md:p-10 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {activeTab === 'personal' && (
                                <motion.div
                                    key="personal"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold mb-2">Personal Information</h1>
                                            <p className="text-xs md:text-sm text-gray-500">Manage your physical metrics and goals.</p>
                                        </div>
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <button
                                                onClick={() => {
                                                    setModalType('edit-profile');
                                                    setIsModalOpen(true);
                                                }}
                                                className="flex-1 md:flex-none bg-[#b0f020]/10 text-[#b0f020] px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b0f020] hover:text-black transition-all border border-[#b0f020]/20 text-sm"
                                            >
                                                <Edit3 size={16} /> Edit Profile
                                            </button>
                                            {/* Admin Panel Button */}
                                            <Link
                                                to="/admin-dashboard"
                                                className="flex-1 md:flex-none bg-[#b0f020]/10 text-[#b0f020] px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#b0f020] hover:text-black transition-all border border-[#b0f020]/20 text-sm text-center"
                                            >
                                                Go to Admin Panel
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                                        {userData.role === 'member' && [
                                            { label: 'Full Name', value: userData.name, icon: <User /> },
                                            { label: 'Email Address', value: userData.email, icon: <Mail /> },
                                            { label: 'Phone Number', value: userData.phone, icon: <Phone size={16} /> },
                                            { label: 'Date of Birth', value: userData.dob, icon: <Calendar size={16} /> },
                                            { label: 'Current Height', value: userData.height, icon: <Ruler /> },
                                            { label: 'Current Weight', value: userData.weight, icon: <Weight /> },
                                            { label: 'Fitness Goal', value: userData.goal, icon: <Settings /> },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-[#151a15] p-5 md:p-6 rounded-3xl border border-white/5 hover:border-[#b0f020]/20 transition-all">
                                                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1 md:mb-2">{item.label}</div>
                                                <div className="text-base md:text-lg font-bold truncate">{typeof item.value === 'object' && item.value !== null ? JSON.stringify(item.value) : item.value}</div>
                                            </div>
                                        ))}

                                        {userData.role === 'trainer' && [
                                            { label: 'Full Name', value: userData.name, icon: <User /> },
                                            { label: 'Email Address', value: userData.email, icon: <Mail /> },
                                            { label: 'Phone Number', value: userData.phone, icon: <Phone size={16} /> },
                                            { label: 'Experience', value: `${userData.experienceYears} Years`, icon: <Activity /> },
                                            { label: 'Specialization', value: userData.specialization, icon: <Dumbbell /> },
                                            { label: 'Price per month', value: `${userData.pricePerMonth} EGP`, icon: <DollarSign size={16} /> },
                                            { label: 'Bio', value: userData.bio, icon: <Info size={16} /> },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-[#151a15] p-5 md:p-6 rounded-3xl border border-white/5 hover:border-[#b0f020]/20 transition-all">
                                                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1 md:mb-2">{item.label}</div>
                                                <div className="text-base md:text-lg font-bold truncate">{typeof item.value === 'object' && item.value !== null ? JSON.stringify(item.value) : item.value}</div>
                                            </div>
                                        ))}

                                        {userData.role === 'gym' && [
                                            { label: 'Gym Name', value: userData.name, icon: <Building /> },
                                            { label: 'Gym Email', value: userData.email, icon: <Mail /> },
                                            { label: 'Gym Phone', value: userData.phone, icon: <Phone size={16} /> },
                                            { label: 'Manager Name', value: userData.managerName, icon: <UserCheck /> },
                                            { label: 'Manager Email', value: userData.managerEmail, icon: <Mail /> },
                                            { label: 'City', value: userData.city, icon: <MapPin /> },
                                            { label: 'Street Name', value: userData.streetName, icon: <Map /> },
                                            { label: 'Crowd Level', value: userData.crowdLevel, icon: <Users /> },
                                            { label: 'Price/Session', value: `${userData.pricePerSession} EGP`, icon: <DollarSign size={16} /> },
                                            { label: 'Description', value: userData.description, icon: <Info size={16} /> },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-[#151a15] p-5 md:p-6 rounded-3xl border border-white/5 hover:border-[#b0f020]/20 transition-all">
                                                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1 md:mb-2">{item.label}</div>
                                                <div className="text-base md:text-lg font-bold truncate">{typeof item.value === 'object' && item.value !== null ? JSON.stringify(item.value) : item.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {(activeTab === 'workout' || activeTab === 'nutrition') && (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <div>
                                            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                                {activeTab === 'workout' ? 'Workout Logs' : 'Nutrition Logs'}
                                            </h1>
                                            <p className="text-xs md:text-sm text-gray-500">Track your daily progress and statistics.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingItem(null);
                                                setModalType(activeTab);
                                                setIsModalOpen(true);
                                            }}
                                            className="bg-[#b0f020] text-black px-5 md:px-6 py-2 md:py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#9de018] transition-all transform hover:scale-105 text-sm"
                                        >
                                            <Plus size={16} /> Add Log
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto rounded-3xl border border-white/5 bg-[#151a15]/30">
                                        <table className="w-full text-left min-w-[600px]">
                                            <thead className="bg-[#151a15] text-[10px] md:text-xs text-gray-500 uppercase tracking-widest border-b border-white/5">
                                                <tr>
                                                    <th className="px-6 py-5 font-bold whitespace-nowrap">Date</th>
                                                    {activeTab === 'workout' ? (
                                                        <>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">Exercise</th>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">Sets/Reps</th>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">Weight</th>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">Notes</th>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">Meal</th>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">Calories</th>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">P / C / F</th>
                                                            <th className="px-6 py-5 font-bold whitespace-nowrap">Notes</th>
                                                        </>
                                                    )}
                                                    <th className="px-6 py-5 font-bold whitespace-nowrap text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {(activeTab === 'workout' ? workoutLogs : nutritionLogs).map((log) => (
                                                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                                        <td className="px-6 py-5 font-medium whitespace-nowrap">{log.date}</td>
                                                        {activeTab === 'workout' ? (
                                                            <>
                                                                <td className="px-6 py-5 whitespace-nowrap">{log.exercise}</td>
                                                                <td className="px-6 py-5 whitespace-nowrap">{log.sets} x {log.reps}</td>
                                                                <td className="px-6 py-5 whitespace-nowrap text-[#b0f020] font-bold">{log.weight}</td>
                                                                <td className="px-6 py-5 whitespace-nowrap">{log.notes}</td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td className="px-6 py-5 whitespace-nowrap">{log.meal}</td>
                                                                <td className="px-6 py-5 whitespace-nowrap font-bold text-[#b0f020]">{log.calories} kcal</td>
                                                                <td className="px-6 py-5 whitespace-nowrap text-gray-400">
                                                                    <span className="text-white font-medium">{log.protein}</span> P · <span className="text-white font-medium">{log.carbs}</span> C · <span className="text-white font-medium">{log.fats}</span> F
                                                                </td>
                                                                <td className="px-6 py-5 whitespace-nowrap">{log.notes}</td>
                                                            </>
                                                        )}
                                                        <td className="px-6 py-5 text-right whitespace-nowrap">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => openEditModal(log, activeTab)}
                                                                    className="text-gray-500 hover:text-[#b0f020] transition-colors p-2 bg-white/5 rounded-lg border border-transparent hover:border-[#b0f020]/20"
                                                                >
                                                                    <Edit3 size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteLog(log.id, activeTab)}
                                                                    className="text-gray-500 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-lg border border-transparent hover:border-red-500/20"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {(activeTab === 'workout' ? workoutLogs : nutritionLogs).length === 0 && (
                                            <div className="py-20 text-center text-gray-600 flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                                    <Search size={24} className="text-gray-700" />
                                                </div>
                                                <p>No logs found. Start tracking your journey now!</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'analytics' && (
                                <motion.div
                                    key="analytics"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 border border-white/5 rounded-3xl bg-[#151a15]/30">
                                        {!isAnalyzing && !analysisData && (
                                            <>
                                                <LineChart size={48} className="text-[#b0f020] mb-4" />
                                                <h2 className="text-2xl font-bold mb-2">Ready to Analyze?</h2>
                                                <p className="text-gray-500 mb-6 max-w-md">Get AI-powered insights on your workouts and nutrition to optimize your fitness journey.</p>
                                                <button 
                                                    onClick={handleAnalyzeLogs}
                                                    className="bg-[#b0f020] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#9de018] transition-all transform hover:scale-105"
                                                >
                                                    Analyze my Logs
                                                </button>
                                            </>
                                        )}
                                        
                                        {isAnalyzing && (
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 border-4 border-[#b0f020]/20 border-t-[#b0f020] rounded-full animate-spin mb-4"></div>
                                                <h3 className="text-xl font-bold mb-2">Analyzing your logs...</h3>
                                                <p className="text-sm text-gray-500">Crunching numbers and finding patterns.</p>
                                            </div>
                                        )}
                                        
                                        {!isAnalyzing && analysisData && (
                                            <div className="w-full text-left">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="text-2xl font-bold flex items-center gap-2"><Activity className="text-[#b0f020]" /> Your Dashboard</h3>
                                                    <button onClick={handleAnalyzeLogs} className="text-sm text-[#b0f020] hover:underline font-bold">Re-analyze</button>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    <div className="bg-[#0f120f] p-4 rounded-2xl border border-white/5 shadow-lg">
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total Workouts</p>
                                                        <p className="text-2xl font-black text-white">{analysisData.totalWorkouts}</p>
                                                    </div>
                                                    <div className="bg-[#0f120f] p-4 rounded-2xl border border-white/5 shadow-lg">
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total Calories</p>
                                                        <p className="text-2xl font-black text-[#b0f020]">{analysisData.totalCalories} <span className="text-xs font-medium">kcal</span></p>
                                                    </div>
                                                    <div className="bg-[#0f120f] p-4 rounded-2xl border border-white/5 shadow-lg">
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Avg Protein</p>
                                                        <p className="text-2xl font-black text-white">{analysisData.proteinAvg}</p>
                                                    </div>
                                                    <div className="bg-[#0f120f] p-4 rounded-2xl border border-white/5 shadow-lg">
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Top Exercise</p>
                                                        <p className="text-xl font-bold text-white truncate">{analysisData.topExercise}</p>
                                                    </div>
                                                    <div className="bg-[#0f120f] p-4 rounded-2xl border border-white/5 md:col-span-2 shadow-lg">
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Avg Weight (Workout)</p>
                                                        <p className="text-2xl font-black text-white">{analysisData.avgWorkoutWeight}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-6 p-4 bg-[#b0f020]/10 border border-[#b0f020]/20 rounded-2xl text-sm leading-relaxed">
                                                    <span className="font-bold text-[#b0f020] mr-2">AI Insight:</span> 
                                                    You are incredibly consistent with your Barbell Squats. Try increasing your daily protein intake slightly to match your heavy lifting load and improve recovery!
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.main>

            <Footer />


            {/* The Modals */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditingItem(null);
                            }}
                            className="absolute inset-0 bg-[#0a0d0a]/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0f120f] border border-white/5 rounded-[2.5rem] w-full max-w-lg p-6 md:p-10 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold">
                                    {modalType === 'edit-profile' ? 'Edit Profile' : (editingItem ? `Edit ${modalType === 'workout' ? 'Workout' : 'Nutrition'} Log` : `Add ${modalType === 'workout' ? 'Workout' : 'Nutrition'} Log`)}
                                </h3>
                                <button onClick={() => {
                                    setIsModalOpen(false);
                                    setEditingItem(null);
                                }} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-6">
                                {modalType === 'edit-profile' ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Full Name</label>
                                            <input required name="name" defaultValue={userData.name} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Email Address</label>
                                            <input required name="email" defaultValue={userData.email} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Phone Number</label>
                                                <input required name="phone" defaultValue={userData.phone} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Date of Birth</label>
                                                <input required type="date" name="dob" defaultValue={userData.dob} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Height</label>
                                                <input required name="height" defaultValue={userData.height} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Weight</label>
                                                <input required name="weight" defaultValue={userData.weight} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Fitness Goal</label>
                                            <input required name="goal" defaultValue={userData.goal} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Date</label>
                                            <input required type="date" name="date" defaultValue={editingItem ? editingItem.date : new Date().toISOString().split('T')[0]} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                        </div>
                                        {modalType === 'workout' ? (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Exercise Name</label>
                                                    <input required type="text" name="exercise" defaultValue={editingItem?.exercise || ''} placeholder="e.g. Bench Press" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Sets</label>
                                                        <input required type="number" name="sets" defaultValue={editingItem?.sets || ''} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Reps</label>
                                                        <input required type="number" name="reps" defaultValue={editingItem?.reps || ''} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Weight</label>
                                                        <input required type="text" name="weight" defaultValue={editingItem?.weight || ''} placeholder="kg" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                    </div>
                                                    <div className="col-span-3">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Notes</label>
                                                        <textarea name="notes" id="" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all"></textarea>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Meal Name</label>
                                                    <input required type="text" name="meal" defaultValue={editingItem?.meal || ''} placeholder="e.g. Scrambled Eggs" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-6 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Calories</label>
                                                        <input required type="number" name="calories" defaultValue={editingItem?.calories || ''} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Protein (g)</label>
                                                        <input required type="text" name="protein" defaultValue={editingItem?.protein || ''} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Carbs (g)</label>
                                                        <input required type="text" name="carbs" defaultValue={editingItem?.carbs || ''} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Fats (g)</label>
                                                        <input required type="text" name="fats" defaultValue={editingItem?.fats || ''} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all" />
                                                    </div>
                                                </div>
                                                <div className="col-span-3">
                                                    <label className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">Notes</label>
                                                    <textarea name="notes" id="" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 md:py-4 px-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all"></textarea>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                                <button
                                    type="submit"
                                    className="w-full bg-[#b0f020] text-black font-bold py-4 md:py-5 rounded-2xl hover:bg-[#9de018] shadow-[0_10px_30px_rgba(176,240,32,0.15)] transition-all mt-4 hover:scale-[1.01] active:scale-[0.99] text-sm md:text-base"
                                >
                                    {modalType === 'edit-profile' ? 'Update Profile' : (editingItem ? 'Save Changes' : 'Confirm & Log')}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
