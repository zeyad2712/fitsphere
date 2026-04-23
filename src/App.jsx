import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

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

const App = () => {
    return (
        <Router>
            <ScrollToTop />
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
