import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Gyms = lazy(() => import('./pages/Gyms'));
const Trainers = lazy(() => import('./pages/Trainers'));
const TrainerProfile = lazy(() => import('./pages/TrainerProfile'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const GymDetails = lazy(() => import('./pages/GymDetails'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));
const Login = lazy(() => import('./pages/Auth/Login'));
// const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const VideoDetails = lazy(() => import('./pages/VideoDetails'));
const OnBoardingVideos = lazy(() => import('./pages/OnBoardingVideos'));
const WorkoutVideos = lazy(() => import('./pages/WorkoutVideos'));
const RecoveryVideos = lazy(() => import('./pages/RecoveryVideos'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const AiCoach = lazy(() => import('./pages/AiCoach'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

// Loading component
const PageLoader = () => (
    <div className="bg-[#0a0d0a] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#b0f020]/20 border-t-[#b0f020] rounded-full animate-spin"></div>
    </div>
);

const App = () => {
    return (
        <Router>
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
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/ai-coach" element={<AiCoach />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
