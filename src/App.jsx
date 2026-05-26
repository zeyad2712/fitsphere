import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChevronUp, MessageSquare, X, Send, Bot, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Gyms = lazy(() => import('./pages/GYM/Gyms'));
const Trainers = lazy(() => import('./pages/Trainer/Trainers'));
const TrainerProfile = lazy(() => import('./pages/Trainer/TrainerDetails'));
const Shop = lazy(() => import('./pages/Shop/Shop'));
const ProductDetails = lazy(() => import('./pages/Shop/ProductDetails'));
const GymDetails = lazy(() => import('./pages/GYM/GymDetails'));
// const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const SignUpV2 = lazy(() => import('./pages/Auth/SignUpV2'));
const Login = lazy(() => import('./pages/Auth/Login'));
const ForgetPass = lazy(() => import('./pages/Auth/ForgetPass'));
const ResetPass = lazy(() => import('./pages/Auth/ResetPass'));
// const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const VideoDetails = lazy(() => import('./pages/Videos/VideoDetails'));
const OnBoardingVideos = lazy(() => import('./pages/Videos/OnBoardingVideos'));
const WorkoutVideos = lazy(() => import('./pages/Videos/WorkoutVideos'));
const RecoveryVideos = lazy(() => import('./pages/Videos/RecoveryVideos'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const AiCoach = lazy(() => import('./pages/AI/AiCoach'));
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Shop/Cart'));
const Wishlist = lazy(() => import('./pages/Shop/Wishlist'));
const CheckOutPage = lazy(() => import('./pages/Shop/CheckOutPage'));
const ConfirmationPayment = lazy(() => import('./pages/Shop/ConfirmationPayment'));
const TrainersBundles = lazy(() => import('./pages/TrainersBundles'));
const GymBooking = lazy(() => import('./pages/GYM/Booking'));
const ConfirmationBooking = lazy(() => import('./pages/GYM/ConfirmationBooking'));
const BookingTrainer = lazy(() => import('./pages/Trainer/BookingTrainer'));
const ConfirmationBookingTrainer = lazy(() => import('./pages/Trainer/ConfirmationBookingTrainer'));
// Dashboards
const TrainerDashboard = lazy(() => import('./pages/TrainerDashboard/Dashboard'));
const MemberDashboard = lazy(() => import('./pages/MemberDashboard/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const TrainerClients = lazy(() => import('./pages/TrainerDashboard/Clients'));
const MyWorkouts = lazy(() => import('./pages/MemberDashboard/MyWorkouts'));
const MyNutrition = lazy(() => import('./pages/MemberDashboard/MyNutrition'));
const MyBookings = lazy(() => import('./pages/MemberDashboard/MyBookings'));

// Loading component - Rotating Dumbbell
const PageLoader = () => (
    <div className="bg-[#0a0d0a] min-h-screen flex flex-col items-center justify-center gap-8 overflow-hidden">
        <div className="relative">
            {/* Pulsing Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[#b0f020] blur-[60px] rounded-full"
            />

            {/* Rotating Dumbbell */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative z-10 text-[#b0f020]"
            >
                <Dumbbell size={80} strokeWidth={1.5} />
            </motion.div>
        </div>
    </div>
);

// Scroll-to-top button component
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

// ChatBot component
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey there! 👋 I'm your FitSphere AI. How can I help you crush your goals today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        const newUserMsg = { id: Date.now(), text: userText, isBot: false };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
                throw new Error("API Key not configured. Please add your VITE_GEMINI_API_KEY in the .env file at the project root.");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const modelName = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";
            const model = genAI.getGenerativeModel({ 
                model: modelName,
                systemInstruction: "You are FitSphere AI, a friendly and helpful assistant embedded in the FitSphere fitness portal. Answer user questions about workouts, fitness packages, gyms, and healthy living briefly and engagingly."
            });

            // Map history for Gemini API
            const contents = messages.map(msg => ({
                role: msg.isBot ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }));
            
            contents.push({
                role: 'user',
                parts: [{ text: userText }]
            });

            const result = await model.generateContent({ contents });
            const response = await result.response;
            const responseText = response.text();

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: responseText,
                isBot: true
            }]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            const errorMsg = error.message.includes("API Key not configured")
                ? "⚠️ API Key Missing: Please add your VITE_GEMINI_API_KEY to the .env file at the project root."
                : "Sorry, I ran into an error. Please try again later. Details: " + error.message;
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: errorMsg,
                isBot: true
            }]);
        } finally {
            setIsTyping(false);
        }
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
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-[#1c221c] text-gray-300 rounded-2xl rounded-tl-none border border-white/5 p-3 flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-[#b0f020] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-[#b0f020] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-[#b0f020] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-[#1c221c] border-t border-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full text-white border border-white/5 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-[#b0f020] transition-all"
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


// Main App component
const App = () => {
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAppLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isAppLoading) return <PageLoader />;

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
                    <Route path="/gym/booking" element={<GymBooking />} />
                    <Route path="/gym/confirmation-booking" element={<ConfirmationBooking />} />
                    <Route path="/trainer/booking" element={<BookingTrainer />} />
                    <Route path="/trainer/confirmation-booking" element={<ConfirmationBookingTrainer />} />
                    {/* <Route path="/videos" element={<VideoLibrary />} /> */}
                    <Route path="/video/:id" element={<VideoDetails />} />
                    <Route path="/onboarding-videos" element={<OnBoardingVideos />} />
                    <Route path="/workout-videos" element={<WorkoutVideos />} />
                    <Route path="/recovery-videos" element={<RecoveryVideos />} />
                    <Route path="/signup" element={<SignUpV2 />} />
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
                    {/* Dashboards */}
                    <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
                    <Route path="/trainer-dashboard/clients" element={<TrainerClients />} />
                    <Route path="/member-dashboard" element={<MemberDashboard />} />
                    <Route path="/member-dashboard/workouts" element={<MyWorkouts />} />
                    <Route path="/member-dashboard/nutrition" element={<MyNutrition />} />
                    <Route path="/member-dashboard/my-bookings" element={<MyBookings />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
