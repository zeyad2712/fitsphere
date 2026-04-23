import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChevronUp, MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Gyms = lazy(() => import('./pages/Gyms'));
const Trainers = lazy(() => import('./pages/Trainers'));
const TrainerProfile = lazy(() => import('./pages/TrainerDetails'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const GymDetails = lazy(() => import('./pages/GymDetails'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Login = lazy(() => import('./pages/Auth/Login'));
const ForgetPass = lazy(() => import('./pages/Auth/ForgetPass'));
const ResetPass = lazy(() => import('./pages/Auth/ResetPass'));
// const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const VideoDetails = lazy(() => import('./pages/VideoDetails'));
const OnBoardingVideos = lazy(() => import('./pages/OnBoardingVideos'));
const WorkoutVideos = lazy(() => import('./pages/WorkoutVideos'));
const RecoveryVideos = lazy(() => import('./pages/RecoveryVideos'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const AiCoach = lazy(() => import('./pages/AiCoach'));
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const CheckOutPage = lazy(() => import('./pages/CheckOutPage'));
const ConfirmationPayment = lazy(() => import('./pages/ConfirmationPayment'));
const TrainersBundles = lazy(() => import('./pages/TrainersBundles'));

// Loading component
const PageLoader = () => (
    <div className="bg-[#0a0d0a] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#b0f020]/20 border-t-[#b0f020] rounded-full animate-spin"></div>
    </div>
);

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[9999] bg-[#b0f020] text-black p-3 rounded-2xl shadow-[0_10px_30px_rgba(176,240,32,0.3)] hover:bg-[#9de018] transition-all transform hover:scale-110 active:scale-90 flex items-center justify-center animate-bounce-subtle"
            aria-label="Scroll to top"
        >
            <ChevronUp size={24} strokeWidth={3} />
        </button>
    );
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey there! 👋 I'm your FitSphere AI. How can I help you crush your goals today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = { id: Date.now(), text: inputValue, isBot: false };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");

        // Mock bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "That's a great question! I'm currently in training mode, but soon I'll be able to track your macros and suggest workouts perfectly.",
                isBot: true
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-24 right-8 z-[9999] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] h-[500px] bg-[#121612] border border-[#1c221c] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-[#1c221c] flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#b0f020] rounded-xl flex items-center justify-center text-black">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm text-white">FitSphere AI</h3>
                                    <span className="text-[10px] text-[#b0f020] font-black uppercase tracking-widest">Online Now</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0a0d0a]/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${msg.isBot
                                        ? 'bg-[#1c221c] text-gray-300 rounded-tl-none border border-white/5'
                                        : 'bg-[#b0f020] text-black rounded-tr-none font-bold'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-[#1c221c] border-t border-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full bg-[#0a0d0a] border border-white/5 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-[#b0f020] transition-all"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#b0f020] text-black rounded-lg flex items-center justify-center hover:bg-[#9de018] transition-colors"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 group ${isOpen ? 'bg-[#1c221c] text-[#b0f020] rotate-90' : 'bg-[#1c221c] text-[#b0f020] border border-[#b0f020]/20'
                    }`}
                aria-label="Toggle Chat"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} className="group-hover:animate-pulse" />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b0f020] rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-black rounded-full animate-ping" />
                    </span>
                )}
            </button>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <ChatBot />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gyms" element={<Gyms />} />
                    <Route path="/trainers" element={<Trainers />} />
                    <Route path="/trainer/:id" element={<TrainerProfile />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/gym/:id" element={<GymDetails />} />
                    {/* <Route path="/videos" element={<VideoLibrary />} /> */}
                    <Route path="/video/:id" element={<VideoDetails />} />
                    <Route path="/onboarding-videos" element={<OnBoardingVideos />} />
                    <Route path="/workout-videos" element={<WorkoutVideos />} />
                    <Route path="/recovery-videos" element={<RecoveryVideos />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forget-password" element={<ForgetPass />} />
                    <Route path="/reset-password" element={<ResetPass />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/ai-coach" element={<AiCoach />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/confirmation-payment" element={<ConfirmationPayment />} />
                    <Route path="/bundles" element={<TrainersBundles />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
