import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Bot,
    User,
    Sparkles,
    Plus,
    History,
    Trash2,
    Mic,
    Settings,
    MoreVertical,
    Activity
} from 'lucide-react';
import Navbar from '../components/Navbar';

const AiCoach = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hello! I'm your FitSphere AI Coach. How can I help you optimize your training today?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            role: 'user',
            content: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = {
                role: 'assistant',
                content: generateAiResponse(input),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const generateAiResponse = (query) => {
        const q = query.toLowerCase();
        if (q.includes('leg') || q.includes('workout')) {
            return "Analysis complete. Based on your current VO2 Max and recovery metrics, I recommend 4 sets of Barbell Squats (85% 1RM) followed by 3 sets of Bulgarian Split Squats. Focus on explosive concentric movements.";
        }
        if (q.includes('diet') || q.includes('eat') || q.includes('protein')) {
            return "Processing nutritional data... Aim for 2.0g of protein per kg of body mass today. Incorporate complex carbohydrates like sweet potatoes 2 hours pre-workout to maximize glycogen stores.";
        }
        return "Acknowledged. I'm analyzing your performance data to provide the best recommendation. Could you clarify if you're prioritizing metabolic conditioning or maximum strength today?";
    };

    const history = [
        { title: "Leg Day Optimization", date: "Today" },
        { title: "Keto Meal Planning", date: "Yesterday" },
        { title: "Running Form Analysis", date: "2 days ago" },
        { title: "Upper Body Split", date: "Jan 12" }
    ];

    // Animation Variants
    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 }
    };

    const sidebarVariants = {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 100 } }
    };

    const mainAreaVariants = {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } }
    };

    const headerVariants = {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.4 } }
    };

    const inputAreaVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.6 } }
    };

    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            className="bg-[#0a0d0a] text-white h-screen flex flex-col font-sans overflow-hidden relative"
        >
            <Navbar />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Scanner Line */}
                <motion.div
                    animate={{ y: ['0%', '1000%', '0%'] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#b0f020]/20 to-transparent blur-sm"
                />

                {/* Floating Glow Points */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-64 h-64 bg-[#b0f020]/5 rounded-full blur-[100px]"
                    />
                ))}

                <img
                    src="/ai_gym_bg.png"
                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                    alt=""
                />
            </div>

            <div className="flex flex-1 pt-20 overflow-hidden relative z-10">
                {/* Sidebar */}
                <motion.aside
                    variants={sidebarVariants}
                    className="hidden lg:flex flex-col w-80 border-r border-white/5 bg-[#0f120f]/30 backdrop-blur-5xl p-6"
                >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 w-full bg-[#b0f020] text-black font-bold py-3.5 px-4 rounded-xl hover:bg-[#9de018] transition-all mb-8 shadow-[0_10px_30px_rgba(176,240,32,0.15)]"
                    >
                        <Plus size={18} /> New Conversation
                    </motion.button>

                    <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                        <div>
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <History size={12} /> Recommended Plans
                            </h3>
                            <div className="space-y-3">
                                {history.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#b0f020]/40 group-hover:bg-[#b0f020] transition-colors" />
                                            <span className="text-sm font-medium text-gray-400 group-hover:text-white truncate transition-colors">{item.title}</span>
                                        </div>
                                        <MoreVertical size={14} className="text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-1">
                        <div className="flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all">
                            <Settings size={18} /> <span className="text-sm font-medium">Settings</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 text-red-400/60 hover:text-red-400 hover:bg-red-400/5 rounded-xl cursor-pointer transition-all">
                            <Trash2 size={18} /> <span className="text-sm font-medium">Delete Chats</span>
                        </div>
                    </div>
                </motion.aside>

                {/* Main Chat Area */}
                <motion.main
                    variants={mainAreaVariants}
                    className="flex-1 flex flex-col relative"
                >
                    {/* Chat Header */}
                    <motion.header
                        variants={headerVariants}
                        className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0a0d0a]/40 backdrop-blur-5xl"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <motion.div
                                    animate={{ boxShadow: ['0 0 0px rgba(176,240,32,0)', '0 0 20px rgba(176,240,32,0.3)', '0 0 0px rgba(176,240,32,0)'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="w-12 h-12 rounded-2xl bg-[#b0f020]/10 flex items-center justify-center border border-[#b0f020]/20"
                                >
                                    <Bot className="text-[#b0f020]" size={24} />
                                </motion.div>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#0a0d0a] rounded-full"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
                                    FITSPHERE CORE <Sparkles size={14} className="text-[#b0f020] animate-pulse" />
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">System Operational</p>
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-6 md:px-12 md:py-8 space-y-10 scrollbar-hide">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-5 max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center border transition-all ${msg.role === 'user'
                                            ? 'bg-white/5 border-white/10'
                                            : 'bg-[#b0f020]/5 border-[#b0f020]/20 shadow-[0_0_20px_rgba(176,240,32,0.05)]'
                                            }`}>
                                            {msg.role === 'user' ? <User size={18} className="text-gray-400" /> : <Bot size={18} className="text-[#b0f020]" />}
                                        </div>
                                        <div className={`space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                                            <div className={`relative p-5 md:p-6 rounded-3xl md:rounded-[2rem] text-sm md:text-base leading-[1.6] ${msg.role === 'user'
                                                ? 'bg-[#151a15] border border-white/10 text-white rounded-tr-none'
                                                : 'bg-[#0f120f]/60 backdrop-blur-xl border border-white/5 text-gray-200 rounded-tl-none shadow-2xl overflow-hidden group'
                                                }`}>
                                                {msg.role === 'assistant' && (
                                                    <motion.div
                                                        animate={{ x: ['-100%', '200%'] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#b0f020]/5 to-transparent skew-x-12"
                                                    />
                                                )}
                                                {msg.content}
                                            </div>
                                            <span className="text-[10px] text-gray-600 font-black tracking-widest px-2">{msg.time}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className="w-10 h-10 rounded-xl bg-[#b0f020]/5 border border-[#b0f020]/20 flex items-center justify-center">
                                            <Bot size={18} className="text-[#b0f020]" />
                                        </div>
                                        <div className="flex gap-2 p-5 bg-[#0f120f]/40 backdrop-blur-md border border-white/5 rounded-2xl rounded-tl-none">
                                            {[0, 1, 2].map((dot) => (
                                                <motion.div
                                                    key={dot}
                                                    animate={{
                                                        y: [0, -6, 0],
                                                        backgroundColor: ['#b0f02033', '#b0f020', '#b0f02033']
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        repeat: Infinity,
                                                        delay: dot * 0.15
                                                    }}
                                                    className="w-2 h-2 rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <motion.div
                        variants={inputAreaVariants}
                        className="p-6 md:p-12 pt-0"
                    >
                        <form
                            onSubmit={handleSend}
                            className="max-w-4xl mx-auto relative group"
                        >
                            <div className="absolute inset-0 bg-[#b0f020]/10 blur-3xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative bg-[#111611]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 flex items-center gap-3 group-focus-within:border-[#b0f020]/30 transition-all duration-500 shadow-2xl">
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    type="button"
                                    className="p-3 text-gray-500 hover:text-[#b0f020] transition-colors"
                                >
                                    <Plus size={22} />
                                </motion.button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Enter biological objective or query..."
                                    className="flex-1 bg-transparent border-none outline-none py-4 px-2 text-sm md:text-base font-medium placeholder:text-gray-700 tracking-tight"
                                />
                                <div className="flex items-center gap-2 pr-2">
                                    <button type="button" className="hidden md:flex p-3 text-gray-600 hover:text-[#b0f020] transition-all">
                                        <Mic size={20} />
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={!input.trim()}
                                        className={`p-4 rounded-2xl transition-all ${input.trim()
                                            ? 'bg-[#b0f020] text-black shadow-[0_0_30px_rgba(176,240,32,0.4)]'
                                            : 'bg-white/5 text-gray-800 cursor-not-allowed opacity-50'
                                            }`}
                                    >
                                        <Send size={18} />
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </motion.main>
            </div>
        </motion.div>
    );
};

export default AiCoach;
