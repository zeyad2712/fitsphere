import React, { useState, useEffect, useMemo } from 'react';
import { 
    LayoutDashboard, Users, Package, Tags, Layers, Video,
    Search, Plus, Trash2, Edit3, X, ShieldAlert, 
    TrendingUp, CheckCircle, AlertTriangle, Menu, Bell, 
    Play, Globe, ShoppingBag, PlusCircle, LogOut, Check, HelpCircle,
    UserPlus, Eye, ShieldCheck, ShoppingCart, RefreshCw, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SidebarDashboard from '../../components/SidebarDashboard';
import { productsData as initialProducts } from '../../data/shop';
import { videos as initialVideos } from '../../data/videos';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // ----------------------------------------------------
    // Persisted Mock Database Setup
    // ----------------------------------------------------
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('fs_admin_users');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Ziad Waleed', email: 'ziad.waleed@example.com', role: 'Admin', status: 'Active', joinedDate: '2024-01-15' },
            { id: 2, name: 'Coach Marcus', email: 'marcus.trainer@example.com', role: 'Trainer', status: 'Active', joinedDate: '2024-02-10' },
            { id: 3, name: 'Emma Wilson', email: 'emma.y@example.com', role: 'Trainer', status: 'Active', joinedDate: '2024-02-12' },
            { id: 4, name: 'John Doe', email: 'john.doe@example.com', role: 'Member', status: 'Active', joinedDate: '2024-03-01' },
            { id: 5, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Member', status: 'Suspended', joinedDate: '2024-03-15' },
            { id: 6, name: 'Iron Paradise Gym', email: 'iron.paradise@example.com', role: 'Gym', status: 'Active', joinedDate: '2024-04-02' }
        ];
    });

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('fs_admin_products');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    const [productCategories, setProductCategories] = useState(() => {
        const saved = localStorage.getItem('fs_admin_product_categories');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'SUPPLEMENTS', description: 'Protein, pre-workout, and fitness supplements' },
            { id: 2, name: 'APPAREL', description: 'Tees, leggings, and training clothing' },
            { id: 3, name: 'GEAR', description: 'Resistance bands, shakers, and gym gear' }
        ];
    });

    const [videoCategories, setVideoCategories] = useState(() => {
        const saved = localStorage.getItem('fs_admin_video_categories');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Workout', description: 'HIIT, Strength, Core, and leg day workouts' },
            { id: 2, name: 'Recovery', description: 'Deep stretching, yoga, and active recovery mobility flows' },
            { id: 3, name: 'Onboarding', description: 'Introductory and setup videos for new members' }
        ];
    });

    const [videos, setVideos] = useState(() => {
        const saved = localStorage.getItem('fs_admin_videos');
        return saved ? JSON.parse(saved) : initialVideos;
    });

    const [activities, setActivities] = useState(() => {
        const saved = localStorage.getItem('fs_admin_activities');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: 'Ziad Waleed updated admin profile settings', time: '5 minutes ago', type: 'system' },
            { id: 2, text: 'New member registration: John Doe', time: '2 hours ago', type: 'user' },
            { id: 3, text: 'Product stock updated for HydroWhey Protein', time: '5 hours ago', type: 'product' },
            { id: 4, text: 'Video uploaded: Brutal Leg Day Finisher', time: '1 day ago', type: 'video' }
        ];
    });

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('fs_admin_users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('fs_admin_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('fs_admin_product_categories', JSON.stringify(productCategories));
    }, [productCategories]);

    useEffect(() => {
        localStorage.setItem('fs_admin_video_categories', JSON.stringify(videoCategories));
    }, [videoCategories]);

    useEffect(() => {
        localStorage.setItem('fs_admin_videos', JSON.stringify(videos));
    }, [videos]);

    useEffect(() => {
        localStorage.setItem('fs_admin_activities', JSON.stringify(activities));
    }, [activities]);

    const logActivity = (text, type = 'system') => {
        const newAct = {
            id: Date.now(),
            text,
            time: 'Just now',
            type
        };
        setActivities(prev => [newAct, ...prev.slice(0, 19)]); // Keep latest 20
    };

    // ----------------------------------------------------
    // Toast Notification System
    // ----------------------------------------------------
    const [toasts, setToasts] = useState([]);
    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    // ----------------------------------------------------
    // Modal Configuration
    // ----------------------------------------------------
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: 'user', // user, product, productCategory, videoCategory, video
        action: 'add', // add, edit
        data: null
    });

    // ----------------------------------------------------
    // Search and Filter States
    // ----------------------------------------------------
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState('All');

    // Reset search queries when changing tabs
    useEffect(() => {
        setSearchQuery('');
        setFilterOption('All');
    }, [activeTab]);

    // Unsplash Preset Images for convenient adding
    const presetImages = {
        products: [
            { name: 'Protein (Blue)', url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600' },
            { name: 'Shaker Bottle', url: 'https://images.unsplash.com/photo-1526502769970-13d80a13e2bb?auto=format&fit=crop&q=80&w=600' },
            { name: 'Resistance Bands', url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=600' },
            { name: 'Training Tee', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600' },
            { name: 'Leggings', url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=600' },
            { name: 'Pre-Workout (Ignition)', url: 'https://images.unsplash.com/photo-1579722822168-5221b66b4929?auto=format&fit=crop&q=80&w=600' }
        ],
        videos: [
            { name: 'HIIT Workout', url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' },
            { name: 'Strength Training', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
            { name: 'Core Focus', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800' },
            { name: 'Legs/Glutes Workout', url: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&q=80&w=800' },
            { name: 'Yoga Session', url: 'https://images.unsplash.com/photo-1599901860904-17e0ed3af3ea?auto=format&fit=crop&q=80&w=800' },
            { name: 'Deep Stretching', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' }
        ]
    };

    // ----------------------------------------------------
    // Actions & Handlers
    // ----------------------------------------------------
    const openAddModal = (type) => {
        setModalConfig({ type, action: 'add', data: null });
        setIsModalOpen(true);
    };

    const openEditModal = (type, item) => {
        setModalConfig({ type, action: 'edit', data: item });
        setIsModalOpen(true);
    };

    const handleDelete = (type, id, displayName) => {
        if (!window.confirm(`Are you sure you want to delete "${displayName}"?`)) return;

        if (type === 'user') {
            setUsers(prev => prev.filter(x => x.id !== id));
            logActivity(`Deleted user account: ${displayName}`, 'user');
            showToast(`User "${displayName}" deleted successfully.`);
        } else if (type === 'product') {
            setProducts(prev => prev.filter(x => x.id !== id));
            logActivity(`Deleted product: ${displayName}`, 'product');
            showToast(`Product "${displayName}" deleted successfully.`);
        } else if (type === 'productCategory') {
            setProductCategories(prev => prev.filter(x => x.id !== id));
            logActivity(`Deleted product category: ${displayName}`, 'system');
            showToast(`Product category "${displayName}" deleted successfully.`);
        } else if (type === 'videoCategory') {
            setVideoCategories(prev => prev.filter(x => x.id !== id));
            logActivity(`Deleted video category: ${displayName}`, 'system');
            showToast(`Video category "${displayName}" deleted successfully.`);
        } else if (type === 'video') {
            setVideos(prev => prev.filter(x => x.id !== id));
            logActivity(`Deleted video: ${displayName}`, 'video');
            showToast(`Video "${displayName}" removed from library.`);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        const { type, action, data: editingItem } = modalConfig;

        if (type === 'user') {
            if (action === 'add') {
                const newUser = {
                    id: Date.now(),
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    status: data.status,
                    joinedDate: new Date().toISOString().split('T')[0]
                };
                setUsers(prev => [newUser, ...prev]);
                logActivity(`Registered new user: ${data.name} (${data.role})`, 'user');
                showToast(`User "${data.name}" added successfully.`);
            } else {
                setUsers(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...data } : x));
                logActivity(`Updated user details: ${data.name}`, 'user');
                showToast(`User "${data.name}" updated successfully.`);
            }
        } 
        
        else if (type === 'product') {
            const price = parseFloat(data.price) || 0.00;
            const originalPrice = data.originalPrice ? parseFloat(data.originalPrice) : null;
            if (action === 'add') {
                const newProduct = {
                    id: Date.now(),
                    name: data.name,
                    category: data.category.toUpperCase(),
                    price,
                    originalPrice,
                    badge: data.badge || null,
                    description: data.description,
                    image: data.image || presetImages.products[0].url,
                    rating: 5.0,
                    reviews: 0,
                    dietary: []
                };
                setProducts(prev => [newProduct, ...prev]);
                logActivity(`Created product: ${data.name}`, 'product');
                showToast(`Product "${data.name}" added to shop.`);
            } else {
                setProducts(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...data, price, originalPrice } : x));
                logActivity(`Updated product: ${data.name}`, 'product');
                showToast(`Product "${data.name}" updated successfully.`);
            }
        } 
        
        else if (type === 'productCategory') {
            if (action === 'add') {
                const newCat = {
                    id: Date.now(),
                    name: data.name.toUpperCase(),
                    description: data.description
                };
                setProductCategories(prev => [...prev, newCat]);
                logActivity(`Added product category: ${data.name}`, 'system');
                showToast(`Category "${data.name}" created.`);
            } else {
                setProductCategories(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...data, name: data.name.toUpperCase() } : x));
                logActivity(`Updated product category: ${data.name}`, 'system');
                showToast(`Category "${data.name}" updated.`);
            }
        } 
        
        else if (type === 'videoCategory') {
            if (action === 'add') {
                const newCat = {
                    id: Date.now(),
                    name: data.name,
                    description: data.description
                };
                setVideoCategories(prev => [...prev, newCat]);
                logActivity(`Added video category: ${data.name}`, 'system');
                showToast(`Video category "${data.name}" created.`);
            } else {
                setVideoCategories(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...data } : x));
                logActivity(`Updated video category: ${data.name}`, 'system');
                showToast(`Video category "${data.name}" updated.`);
            }
        } 
        
        else if (type === 'video') {
            if (action === 'add') {
                const newVideo = {
                    id: Date.now(),
                    title: data.title,
                    category: data.category,
                    targetedMuscle: data.targetedMuscle,
                    thumbnail: data.thumbnail || presetImages.videos[0].url,
                    videoUrl: data.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4',
                    description: data.description,
                    duration: data.duration || '15:00'
                };
                setVideos(prev => [newVideo, ...prev]);
                logActivity(`Uploaded video: ${data.title}`, 'video');
                showToast(`Video "${data.title}" added to library.`);
            } else {
                setVideos(prev => prev.map(x => x.id === editingItem.id ? { ...x, ...data } : x));
                logActivity(`Updated video settings: ${data.title}`, 'video');
                showToast(`Video "${data.title}" updated.`);
            }
        }

        setIsModalOpen(false);
    };

    // ----------------------------------------------------
    // Filters & Memos
    // ----------------------------------------------------
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = filterOption === 'All' || user.role === filterOption;
            return matchesSearch && matchesRole;
        });
    }, [users, searchQuery, filterOption]);

    const filteredProducts = useMemo(() => {
        return products.filter(prod => {
            const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 prod.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCat = filterOption === 'All' || prod.category === filterOption.toUpperCase();
            return matchesSearch && matchesCat;
        });
    }, [products, searchQuery, filterOption]);

    const filteredVideos = useMemo(() => {
        return videos.filter(vid => {
            const matchesSearch = vid.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 vid.targetedMuscle.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCat = filterOption === 'All' || vid.category === filterOption;
            return matchesSearch && matchesCat;
        });
    }, [videos, searchQuery, filterOption]);

    // System overview counts
    const overviewStats = useMemo(() => {
        return {
            totalUsers: users.length,
            activeUsersPct: Math.round((users.filter(u => u.status === 'Active').length / users.length) * 100),
            totalProducts: products.length,
            totalVideos: videos.length
        };
    }, [users, products, videos]);

    // Categories list for select inputs
    const pCategoryOptions = useMemo(() => productCategories.map(c => c.name), [productCategories]);
    const vCategoryOptions = useMemo(() => videoCategories.map(c => c.name), [videoCategories]);

    const resetDatabase = () => {
        if (!window.confirm('Reset all admin dashboard data to defaults? This will erase custom additions.')) return;
        localStorage.removeItem('fs_admin_users');
        localStorage.removeItem('fs_admin_products');
        localStorage.removeItem('fs_admin_product_categories');
        localStorage.removeItem('fs_admin_video_categories');
        localStorage.removeItem('fs_admin_videos');
        localStorage.removeItem('fs_admin_activities');
        window.location.reload();
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0a0d0a] text-white font-sans overflow-x-hidden selection:bg-[#b0f020] selection:text-black">
            
            {/* Custom Toast Container */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                            className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-semibold backdrop-blur-xl ${
                                toast.type === 'error' 
                                ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                                : 'bg-[#151a15] border-[#b0f020]/20 text-white'
                            }`}
                        >
                            <CheckCircle size={18} className="text-[#b0f020] shrink-0" />
                            <span>{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Sidebar */}
            <SidebarDashboard 
                isSidebarOpen={isSidebarOpen} 
                role="admin" 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />

            {/* Main Content Area */}
            <main className={`flex-1 min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'} flex flex-col`}>
                
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-[#0a0d0a]/80 backdrop-blur-xl sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors hidden md:block"
                        >
                            <Menu size={20} className="text-gray-400" />
                        </button>
                        <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span className="text-xs uppercase font-black px-2.5 py-1 bg-[#b0f020]/15 text-[#b0f020] rounded-lg tracking-wider border border-[#b0f020]/20">Admin Panel</span>
                            <span className="text-gray-600 hidden sm:inline">/</span>
                            <span className="capitalize text-gray-300 font-semibold text-sm md:text-base hidden sm:inline">
                                {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.replace(/([A-Z])/g, ' $1')}
                            </span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <button 
                            onClick={resetDatabase}
                            title="Reset Database to Defaults"
                            className="p-2 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 rounded-xl transition-all text-gray-400 hover:text-red-400 flex items-center justify-center"
                        >
                            <RefreshCw size={16} />
                        </button> */}
                        <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-white">System Admin</p>
                                <p className="text-[10px] text-gray-500 font-semibold tracking-wider">Super Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-[#b0f020]/30 p-0.5 bg-[#b0f020]/10 flex items-center justify-center font-bold text-[#b0f020]">
                                SA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Tab Content Container */}
                <motion.div 
                    key={activeTab}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="p-6 md:p-8 flex-1 flex flex-col gap-8 max-w-[1400px] w-full mx-auto"
                >
                    
                    {/* Mobile Tabs selector (since SidebarDashboard is hidden on small screens) */}
                    <div className="md:hidden w-full bg-[#121612] border border-white/5 p-2 rounded-2xl flex flex-col gap-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-gray-500 px-3 pt-1">Navigate Dashboard</label>
                        <select 
                            value={activeTab} 
                            onChange={(e) => setActiveTab(e.target.value)}
                            className="bg-[#0a0d0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#b0f020] text-white"
                        >
                            <option value="overview">Dashboard Overview</option>
                            <option value="users">Manage Users</option>
                            <option value="products">Manage Products</option>
                            <option value="productCategories">Manage Product Categories</option>
                            <option value="videoCategories">Manage Video Categories</option>
                            <option value="videos">Manage Video Library</option>
                        </select>
                    </div>

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="flex flex-col gap-8">
                            {/* Hero Intro */}
                            <div className="bg-gradient-to-r from-[#121612] via-[#121612] to-[#151d15] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-[#b0f020]/5 rounded-full blur-[100px] pointer-events-none"></div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">System Controls & Analytics</h2>
                                    <p className="text-gray-400 text-sm max-w-xl">Welcome to your administration control room. Here you can efficiently manage users, products, classes, categories, and video library assets.</p>
                                </div>
                                <div className="flex gap-3 shrink-0 flex-wrap justify-center">
                                    <button 
                                        onClick={() => openAddModal('product')} 
                                        className="bg-[#b0f020] text-black px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-[#9de018] shadow-[0_8px_20px_rgba(176,240,32,0.15)] transition-all transform hover:-translate-y-0.5 active:scale-95"
                                    >
                                        <PlusCircle size={15} /> Add Product
                                    </button>
                                    <button 
                                        onClick={() => openAddModal('video')} 
                                        className="bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95"
                                    >
                                        <Play size={14} className="text-[#b0f020]" /> Add Video
                                    </button>
                                </div>
                            </div>

                            {/* Overview Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-[#121612] p-6 rounded-[1.75rem] border border-white/5 flex items-center justify-between relative overflow-hidden group hover:border-[#b0f020]/25 transition-all">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Accounts</p>
                                        <h3 className="text-3xl font-bold">{overviewStats.totalUsers}</h3>
                                        <p className="text-[10px] text-gray-400">{overviewStats.activeUsersPct}% Active Accounts</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] border border-[#3b82f6]/15">
                                        <Users size={22} />
                                    </div>
                                </div>
                                <div className="bg-[#121612] p-6 rounded-[1.75rem] border border-white/5 flex items-center justify-between relative overflow-hidden group hover:border-[#b0f020]/25 transition-all">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Shop Products</p>
                                        <h3 className="text-3xl font-bold">{overviewStats.totalProducts}</h3>
                                        <p className="text-[10px] text-gray-400">{productCategories.length} Main Categories</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#b0f020]/10 flex items-center justify-center text-[#b0f020] border border-[#b0f020]/15">
                                        <Package size={22} />
                                    </div>
                                </div>
                                <div className="bg-[#121612] p-6 rounded-[1.75rem] border border-white/5 flex items-center justify-between relative overflow-hidden group hover:border-[#b0f020]/25 transition-all">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Video Library</p>
                                        <h3 className="text-3xl font-bold">{overviewStats.totalVideos}</h3>
                                        <p className="text-[10px] text-gray-400">{videoCategories.length} Video Series Categories</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#a855f7]/10 flex items-center justify-center text-[#a855f7] border border-[#a855f7]/15">
                                        <Video size={22} />
                                    </div>
                                </div>
                                <div className="bg-[#121612] p-6 rounded-[1.75rem] border border-white/5 flex items-center justify-between relative overflow-hidden group hover:border-[#b0f020]/25 transition-all">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Categories</p>
                                        <h3 className="text-3xl font-bold">{productCategories.length + videoCategories.length}</h3>
                                        <p className="text-[10px] text-gray-400">System Taxonomies</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#06b6d4]/10 flex items-center justify-center text-[#06b6d4] border border-[#06b6d4]/15">
                                        <Tags size={22} />
                                    </div>
                                </div>
                            </div>

                            {/* Detailed split: Activity Log & Quick System shortcuts */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                
                                {/* Recent Activities */}
                                <div className="lg:col-span-2 bg-[#121612] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col">
                                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                        <TrendingUp size={18} className="text-[#b0f020]" />
                                        Recent Activity Logs
                                    </h3>
                                    <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                                        {activities.map((act) => (
                                            <div key={act.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                                                    act.type === 'user' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' :
                                                    act.type === 'product' ? 'bg-[#b0f020]/10 text-[#b0f020]' :
                                                    act.type === 'video' ? 'bg-[#a855f7]/10 text-[#a855f7]' :
                                                    'bg-gray-500/10 text-gray-400'
                                                }`}>
                                                    {act.type === 'user' && <Users size={14} />}
                                                    {act.type === 'product' && <Package size={14} />}
                                                    {act.type === 'video' && <Video size={14} />}
                                                    {act.type === 'system' && <ShieldAlert size={14} />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-200 font-medium truncate">{act.text}</p>
                                                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">{act.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Shortcuts */}
                                <div className="bg-[#121612] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                            <ShieldAlert size={18} className="text-[#b0f020]" />
                                            Admin Shortcuts
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-6">Instantly access specific operations or register new objects within the platform system.</p>
                                        <div className="space-y-3">
                                            <button 
                                                onClick={() => openAddModal('user')}
                                                className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-[#b0f020]/10 hover:border-[#b0f020]/30 transition-all text-left text-xs font-bold flex items-center justify-between group"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <UserPlus size={16} className="text-blue-400" />
                                                    Register New Account
                                                </span>
                                                <ChevronRight size={14} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button 
                                                onClick={() => openAddModal('productCategory')}
                                                className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-[#b0f020]/10 hover:border-[#b0f020]/30 transition-all text-left text-xs font-bold flex items-center justify-between group"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <Tags size={16} className="text-green-400" />
                                                    Create Product Category
                                                </span>
                                                <ChevronRight size={14} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <button 
                                                onClick={() => openAddModal('videoCategory')}
                                                className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-[#b0f020]/10 hover:border-[#b0f020]/30 transition-all text-left text-xs font-bold flex items-center justify-between group"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <Layers size={16} className="text-purple-400" />
                                                    Create Video Category
                                                </span>
                                                <ChevronRight size={14} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">System Status: healthy</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <div className="flex flex-col gap-6">
                            {/* Search/Filter Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#121612] p-4 rounded-3xl border border-white/5">
                                <div className="relative group w-full sm:max-w-xs">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Search by name or email..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-[#b0f020] transition-all text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <select 
                                        value={filterOption}
                                        onChange={(e) => setFilterOption(e.target.value)}
                                        className="bg-[#0a0d0a] border border-white/5 rounded-2xl px-4 py-2.5 text-xs text-gray-400 focus:outline-none focus:border-[#b0f020] cursor-pointer"
                                    >
                                        <option value="All">All Roles</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Trainer">Trainer</option>
                                        <option value="Gym">Gym</option>
                                        <option value="Member">Member</option>
                                    </select>
                                    <button 
                                        onClick={() => openAddModal('user')}
                                        className="bg-[#b0f020] text-black px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#9de018] shadow-lg shadow-[#b0f020]/10 transition-colors"
                                    >
                                        <Plus size={14} strokeWidth={3} /> Add User
                                    </button>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#121612]">
                                <table className="w-full text-left min-w-[700px]">
                                    <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-5">User</th>
                                            <th className="px-6 py-5">Email</th>
                                            <th className="px-6 py-5">Role</th>
                                            <th className="px-6 py-5">Status</th>
                                            <th className="px-6 py-5">Joined Date</th>
                                            <th className="px-6 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-xl bg-[#b0f020]/10 border border-[#b0f020]/20 flex items-center justify-center font-bold text-xs text-[#b0f020]">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-bold text-sm">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-xs text-gray-400 font-medium whitespace-nowrap">{user.email}</td>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
                                                        user.role === 'Admin' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                                        user.role === 'Trainer' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                                        user.role === 'Gym' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                        'bg-green-500/10 border-green-500/20 text-green-400'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-[#b0f020]' : 'bg-red-500'}`}></span>
                                                        <span className="text-xs font-semibold text-gray-300">{user.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-xs text-gray-500 font-medium whitespace-nowrap">{user.joinedDate}</td>
                                                <td className="px-6 py-5 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => openEditModal('user', user)}
                                                            className="text-gray-400 hover:text-[#b0f020] transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-[#b0f020]/25"
                                                        >
                                                            <Edit3 size={13} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete('user', user.id, user.name)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-red-500/25"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredUsers.length === 0 && (
                                    <div className="py-20 text-center text-gray-500 flex flex-col items-center gap-3">
                                        <Users className="text-gray-600" size={32} />
                                        <p className="text-xs">No users found matching filters.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* PRODUCTS TAB */}
                    {activeTab === 'products' && (
                        <div className="flex flex-col gap-6">
                            {/* Search/Filter Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#121612] p-4 rounded-3xl border border-white/5">
                                <div className="relative group w-full sm:max-w-xs">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Search products..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-[#b0f020] transition-all text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <select 
                                        value={filterOption}
                                        onChange={(e) => setFilterOption(e.target.value)}
                                        className="bg-[#0a0d0a] border border-white/5 rounded-2xl px-4 py-2.5 text-xs text-gray-400 focus:outline-none focus:border-[#b0f020] cursor-pointer"
                                    >
                                        <option value="All">All Categories</option>
                                        {pCategoryOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={() => openAddModal('product')}
                                        className="bg-[#b0f020] text-black px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#9de018] shadow-lg shadow-[#b0f020]/10 transition-colors"
                                    >
                                        <Plus size={14} strokeWidth={3} /> Add Product
                                    </button>
                                </div>
                            </div>

                            {/* Table List */}
                            <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#121612]">
                                <table className="w-full text-left min-w-[750px]">
                                    <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-5">Product Name</th>
                                            <th className="px-6 py-5">Category</th>
                                            <th className="px-6 py-5">Price</th>
                                            <th className="px-6 py-5">Promo Price</th>
                                            <th className="px-6 py-5">Badge</th>
                                            <th className="px-6 py-5">Rating/Reviews</th>
                                            <th className="px-6 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredProducts.map((prod) => (
                                            <tr key={prod.id} className="hover:bg-white/[0.01] transition-colors group">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/5 shrink-0">
                                                            <img src={prod.image} className="w-full h-full object-cover" alt="Product" />
                                                        </div>
                                                        <div className="max-w-[220px]">
                                                            <p className="font-bold text-sm truncate">{prod.name}</p>
                                                            <p className="text-[10px] text-gray-500 truncate">{prod.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-black uppercase text-gray-400 border border-white/5">{prod.category}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-[#b0f020]">${prod.price.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {prod.originalPrice ? `$${prod.originalPrice.toFixed(2)}` : '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {prod.badge ? (
                                                        <span className="px-2 py-0.5 rounded bg-[#b0f020]/15 text-[9px] font-bold text-[#b0f020] uppercase tracking-wider border border-[#b0f020]/10">
                                                            {prod.badge}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-600 text-xs">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                                                    ⭐ {prod.rating} <span className="text-gray-500 font-semibold">({prod.reviews})</span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => openEditModal('product', prod)}
                                                            className="text-gray-400 hover:text-[#b0f020] transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-[#b0f020]/25"
                                                        >
                                                            <Edit3 size={13} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete('product', prod.id, prod.name)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-red-500/25"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredProducts.length === 0 && (
                                    <div className="py-20 text-center text-gray-500 flex flex-col items-center gap-3">
                                        <Package className="text-gray-600" size={32} />
                                        <p className="text-xs">No products found matching filters.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* PRODUCT CATEGORIES TAB */}
                    {activeTab === 'productCategories' && (
                        <div className="flex flex-col gap-6">
                            {/* Toolbar */}
                            <div className="flex justify-between items-center bg-[#121612] p-4 rounded-3xl border border-white/5">
                                <h3 className="text-sm font-bold text-gray-300">Shop Categories System</h3>
                                <button 
                                    onClick={() => openAddModal('productCategory')}
                                    className="bg-[#b0f020] text-black px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#9de018] shadow-lg shadow-[#b0f020]/10 transition-colors"
                                >
                                    <Plus size={14} strokeWidth={3} /> Add Category
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#121612]">
                                <table className="w-full text-left min-w-[500px]">
                                    <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-5">Category Title</th>
                                            <th className="px-6 py-5">Description</th>
                                            <th className="px-6 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {productCategories.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-white/[0.01] transition-colors group">
                                                <td className="px-6 py-5 whitespace-nowrap font-bold text-sm tracking-wide text-white">
                                                    {cat.name}
                                                </td>
                                                <td className="px-6 py-5 text-xs text-gray-400 leading-relaxed">{cat.description}</td>
                                                <td className="px-6 py-5 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => openEditModal('productCategory', cat)}
                                                            className="text-gray-400 hover:text-[#b0f020] transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-[#b0f020]/25"
                                                        >
                                                            <Edit3 size={13} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete('productCategory', cat.id, cat.name)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-red-500/25"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* VIDEO CATEGORIES TAB */}
                    {activeTab === 'videoCategories' && (
                        <div className="flex flex-col gap-6">
                            {/* Toolbar */}
                            <div className="flex justify-between items-center bg-[#121612] p-4 rounded-3xl border border-white/5">
                                <h3 className="text-sm font-bold text-gray-300">Video Library Taxonomies</h3>
                                <button 
                                    onClick={() => openAddModal('videoCategory')}
                                    className="bg-[#b0f020] text-black px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#9de018] shadow-lg shadow-[#b0f020]/10 transition-colors"
                                >
                                    <Plus size={14} strokeWidth={3} /> Add Video Category
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#121612]">
                                <table className="w-full text-left min-w-[500px]">
                                    <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-5">Category Title</th>
                                            <th className="px-6 py-5">Description</th>
                                            <th className="px-6 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {videoCategories.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-white/[0.01] transition-colors group">
                                                <td className="px-6 py-5 whitespace-nowrap font-bold text-sm tracking-wide text-white">
                                                    {cat.name}
                                                </td>
                                                <td className="px-6 py-5 text-xs text-gray-400 leading-relaxed">{cat.description}</td>
                                                <td className="px-6 py-5 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => openEditModal('videoCategory', cat)}
                                                            className="text-gray-400 hover:text-[#b0f020] transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-[#b0f020]/25"
                                                        >
                                                            <Edit3 size={13} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete('videoCategory', cat.id, cat.name)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-red-500/25"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* VIDEO LIBRARY TAB */}
                    {activeTab === 'videos' && (
                        <div className="flex flex-col gap-6">
                            {/* Search/Filter Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#121612] p-4 rounded-3xl border border-white/5">
                                <div className="relative group w-full sm:max-w-xs">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#b0f020] transition-colors" size={16} />
                                    <input 
                                        type="text" 
                                        placeholder="Search videos by title or muscle..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#0a0d0a] border border-white/5 rounded-2xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-[#b0f020] transition-all text-white"
                                    />
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <select 
                                        value={filterOption}
                                        onChange={(e) => setFilterOption(e.target.value)}
                                        className="bg-[#0a0d0a] border border-white/5 rounded-2xl px-4 py-2.5 text-xs text-gray-400 focus:outline-none focus:border-[#b0f020] cursor-pointer"
                                    >
                                        <option value="All">All Video Series</option>
                                        {vCategoryOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={() => openAddModal('video')}
                                        className="bg-[#b0f020] text-black px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#9de018] shadow-lg shadow-[#b0f020]/10 transition-colors"
                                    >
                                        <Plus size={14} strokeWidth={3} /> Add Video
                                    </button>
                                </div>
                            </div>

                            {/* Table List */}
                            <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#121612]">
                                <table className="w-full text-left min-w-[700px]">
                                    <thead className="bg-white/[0.02] text-[10px] text-gray-500 uppercase tracking-widest font-black border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-5">Video Item</th>
                                            <th className="px-6 py-5">Series Category</th>
                                            <th className="px-6 py-5">Targeted Muscle</th>
                                            <th className="px-6 py-5">Duration</th>
                                            <th className="px-6 py-5">Video Resource</th>
                                            <th className="px-6 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredVideos.map((vid) => (
                                            <tr key={vid.id} className="hover:bg-white/[0.01] transition-colors group">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-8 rounded-lg overflow-hidden bg-white/5 border border-white/5 shrink-0 relative">
                                                            <img src={vid.thumbnail} className="w-full h-full object-cover" alt="Video" />
                                                            <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                                                                <Play size={10} className="text-white fill-white" />
                                                            </div>
                                                        </div>
                                                        <div className="max-w-[200px]">
                                                            <p className="font-bold text-sm truncate">{vid.title}</p>
                                                            <p className="text-[10px] text-gray-500 truncate">{vid.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[9px] font-bold border border-purple-500/15">{vid.category}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-300 font-semibold">{vid.targetedMuscle}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-bold">{vid.duration}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-[10px] text-blue-400 font-medium truncate max-w-[120px]" title={vid.videoUrl}>
                                                    {vid.videoUrl}
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => openEditModal('video', vid)}
                                                            className="text-gray-400 hover:text-[#b0f020] transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-[#b0f020]/25"
                                                        >
                                                            <Edit3 size={13} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete('video', vid.id, vid.title)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-xl border border-transparent hover:border-red-500/25"
                                                        >
                                                            <Trash2 size={13} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredVideos.length === 0 && (
                                    <div className="py-20 text-center text-gray-500 flex flex-col items-center gap-3">
                                        <Video className="text-gray-600" size={32} />
                                        <p className="text-xs">No videos found matching filters.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </motion.div>
            </main>

            {/* DYNAMIC FORM MODAL (Add / Edit) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#0a0d0a]/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0f120f] border border-white/5 rounded-[2.5rem] w-full max-w-lg p-6 md:p-8 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                    <span className="text-[#b0f020] uppercase text-[10px] tracking-widest font-black px-2 py-0.5 bg-[#b0f020]/10 rounded border border-[#b0f020]/15">
                                        {modalConfig.action}
                                    </span>
                                    <span>
                                        {modalConfig.type === 'user' && 'User Account'}
                                        {modalConfig.type === 'product' && 'Shop Product'}
                                        {modalConfig.type === 'productCategory' && 'Product Category'}
                                        {modalConfig.type === 'videoCategory' && 'Video Category'}
                                        {modalConfig.type === 'video' && 'Video Library Item'}
                                    </span>
                                </h3>
                                <button 
                                    onClick={() => setIsModalOpen(false)} 
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-5">
                                
                                {/* USER FORM */}
                                {modalConfig.type === 'user' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Full Name</label>
                                            <input required name="name" defaultValue={modalConfig.data?.name || ''} placeholder="e.g. John Doe" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email Address</label>
                                            <input required type="email" name="email" defaultValue={modalConfig.data?.email || ''} placeholder="e.g. john@example.com" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Role</label>
                                                <select name="role" defaultValue={modalConfig.data?.role || 'Member'} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#b0f020] outline-none transition-all text-white cursor-pointer">
                                                    <option value="Member">Member</option>
                                                    <option value="Trainer">Trainer</option>
                                                    <option value="Gym">Gym</option>
                                                    <option value="Admin">Admin</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Status</label>
                                                <select name="status" defaultValue={modalConfig.data?.status || 'Active'} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#b0f020] outline-none transition-all text-white cursor-pointer">
                                                    <option value="Active">Active</option>
                                                    <option value="Suspended">Suspended</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* PRODUCT FORM */}
                                {modalConfig.type === 'product' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Product Title</label>
                                            <input required name="name" defaultValue={modalConfig.data?.name || ''} placeholder="e.g. HydroWhey Protein Isolate" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Category</label>
                                                <select name="category" defaultValue={modalConfig.data?.category || 'SUPPLEMENTS'} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#b0f020] outline-none transition-all text-white cursor-pointer">
                                                    {pCategoryOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Special Badge</label>
                                                <select name="badge" defaultValue={modalConfig.data?.badge || ''} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#b0f020] outline-none transition-all text-white cursor-pointer">
                                                    <option value="">None</option>
                                                    <option value="BEST SELLER">BEST SELLER</option>
                                                    <option value="NEW">NEW</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Retail Price ($)</label>
                                                <input required type="number" step="0.01" name="price" defaultValue={modalConfig.data?.price || ''} placeholder="e.g. 39.99" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Compare at Price ($)</label>
                                                <input type="number" step="0.01" name="originalPrice" defaultValue={modalConfig.data?.originalPrice || ''} placeholder="e.g. 49.99 (Optional)" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Image Asset URL</label>
                                            <input name="image" defaultValue={modalConfig.data?.image || ''} placeholder="Paste custom URL or select a preset below..." className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" id="prodImgUrl" />
                                            
                                            {/* Preset Selector */}
                                            <div className="pt-2">
                                                <span className="text-[10px] text-gray-500 font-bold block mb-1">Preset Options:</span>
                                                <div className="flex gap-2 flex-wrap max-h-24 overflow-y-auto custom-scrollbar p-1">
                                                    {presetImages.products.map((preset, pIdx) => (
                                                        <button 
                                                            key={pIdx}
                                                            type="button" 
                                                            onClick={() => {
                                                                const el = document.getElementById('prodImgUrl');
                                                                if (el) el.value = preset.url;
                                                            }}
                                                            className="text-[9px] px-2 py-1 bg-white/5 hover:bg-[#b0f020]/25 rounded border border-white/5 transition-colors font-medium"
                                                        >
                                                            {preset.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Description Details</label>
                                            <textarea required name="description" defaultValue={modalConfig.data?.description || ''} placeholder="Write product brief summary..." rows={3} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white resize-none" />
                                        </div>
                                    </>
                                )}

                                {/* PRODUCT CATEGORY & VIDEO CATEGORY FORMS (identical structure) */}
                                {(modalConfig.type === 'productCategory' || modalConfig.type === 'videoCategory') && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Category Title Name</label>
                                            <input required name="name" defaultValue={modalConfig.data?.name || ''} placeholder="e.g. Strength Training" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Description Details</label>
                                            <textarea required name="description" defaultValue={modalConfig.data?.description || ''} placeholder="Write brief category role..." rows={3} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white resize-none" />
                                        </div>
                                    </>
                                )}

                                {/* VIDEO FORM */}
                                {modalConfig.type === 'video' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Video Title</label>
                                            <input required name="title" defaultValue={modalConfig.data?.title || ''} placeholder="e.g. Full Body HIIT Workout" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Library Category</label>
                                                <select name="category" defaultValue={modalConfig.data?.category || 'Workout'} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#b0f020] outline-none transition-all text-white cursor-pointer">
                                                    {vCategoryOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Targeted Muscle(s)</label>
                                                <input required name="targetedMuscle" defaultValue={modalConfig.data?.targetedMuscle || ''} placeholder="e.g. Abs, Core" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Session Duration</label>
                                                <input required name="duration" defaultValue={modalConfig.data?.duration || '15:00'} placeholder="e.g. 20:00" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Video File/Resource Link</label>
                                                <input required name="videoUrl" defaultValue={modalConfig.data?.videoUrl || ''} placeholder="e.g. mp4 link or YouTube URL" className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Thumbnail Asset URL</label>
                                            <input name="thumbnail" defaultValue={modalConfig.data?.thumbnail || ''} placeholder="Paste custom image URL or select a preset..." className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white" id="vidThumbUrl" />
                                            
                                            {/* Preset Selector */}
                                            <div className="pt-2">
                                                <span className="text-[10px] text-gray-500 font-bold block mb-1">Preset Options:</span>
                                                <div className="flex gap-2 flex-wrap max-h-24 overflow-y-auto custom-scrollbar p-1">
                                                    {presetImages.videos.map((preset, pIdx) => (
                                                        <button 
                                                            key={pIdx}
                                                            type="button" 
                                                            onClick={() => {
                                                                const el = document.getElementById('vidThumbUrl');
                                                                if (el) el.value = preset.url;
                                                            }}
                                                            className="text-[9px] px-2 py-1 bg-white/5 hover:bg-[#b0f020]/25 rounded border border-white/5 transition-colors font-medium"
                                                        >
                                                            {preset.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Description Details</label>
                                            <textarea required name="description" defaultValue={modalConfig.data?.description || ''} placeholder="Write workout details description..." rows={3} className="w-full bg-[#151a15] border border-white/5 rounded-2xl py-3 px-5 text-sm focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all text-white resize-none" />
                                        </div>
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-[#b0f020] text-black font-extrabold py-4 rounded-2xl hover:bg-[#9de018] shadow-lg shadow-[#b0f020]/15 transition-all mt-4 hover:scale-[1.01] active:scale-[0.99] text-xs uppercase tracking-wider"
                                >
                                    {modalConfig.action === 'add' ? 'Confirm and Add' : 'Save Changes'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
