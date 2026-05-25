import React, { useState } from 'react';
import {
    Dumbbell, User, Mail, Lock, Target, ArrowRight, ChevronDown, ArrowLeft,
    Calendar, Phone, Building, MapPin, Info, Users, Scale, Ruler,
    Award, DollarSign, Briefcase, UserCheck, Clock, Map
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Auth.css';

const SignUp = () => {
    const [role, setRole] = useState('member');
    const [step, setStep] = useState(1);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    // Form state to persist data across steps
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', password_confirmation: '', birth_date: '', phone: '',
        fitnessGoal: '', weight: '', height: '',
        experienceYears: '', specalization: '', BIO: '', fair: '',
        gymName: '', gymEmail: '', gymPhone: '', managerName: '', managerEmail: '',
        city: '', streetName: '', description: '', Crowd: 'low', fair: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setStep(1);
    };

    const nextStep = () => setStep(2);
    const prevStep = () => setStep(1);

    const handleSubmit = async () => {
        setApiError(null);
        try {
            let endpoint = '';
            if (role === 'member') {
                endpoint = 'https://recess-throwaway-unchanged.ngrok-free.dev/api/register/member';
            } else if (role === 'trainer') {
                endpoint = 'https://recess-throwaway-unchanged.ngrok-free.dev/api/register/trainer';
            } else if (role === 'gym') {
                endpoint = 'https://recess-throwaway-unchanged.ngrok-free.dev/api/register/gym';
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'ngrok-skip-browser-warning': '69420'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/profile', { state: { successMessage: 'Registration successful!', userData: { ...formData, role: role } } });
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                let errorMessage = 'Registration failed. Please check your details and try again.';
                if (errorData.message) errorMessage = errorData.message;
                else if (typeof errorData === 'string') errorMessage = errorData;
                else if (errorData.errors) {
                    errorMessage = Object.values(errorData.errors).flat().join(', ');
                }
                setApiError(errorMessage);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setApiError('An error occurred during registration. Please check your connection.');
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const renderStep1 = () => {
        if (role === 'member' || role === 'trainer') {
            return (
                <motion.div
                    key="member-step-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div variants={itemVariants} className="form-group">
                        <label>Full Name</label>
                        <motion.div
                            className="input-wrapper"
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <User size={18} className="input-icon" />
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="form-input" required />
                        </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="form-group">
                        <label>Email Address</label>
                        <motion.div
                            className="input-wrapper"
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Mail size={18} className="input-icon" />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="form-input" required />
                        </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange} placeholder="••••••••" className="form-input" required />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <div className="input-wrapper">
                                <Calendar size={18} className="input-icon" />
                                <input type="date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <div className="input-wrapper">
                                <Phone size={18} className="input-icon" />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="form-input" required />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            );
        } else {
            return (
                <motion.div
                    key="gym-step-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div variants={itemVariants} className="form-group">
                        <label>GYM Name</label>
                        <div className="input-wrapper">
                            <Building size={18} className="input-icon" />
                            <input type="text" name="gymName" value={formData.gymName} onChange={handleInputChange} placeholder="Iron Paradise Gym" className="form-input" required />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="form-group">
                        <label>GYM Email</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="input-icon" />
                            <input type="email" name="gymEmail" value={formData.gymEmail} onChange={handleInputChange} placeholder="contact@gym.com" className="form-input" required />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleInputChange} placeholder="••••••••" className="form-input" required />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="form-group">
                        <label>GYM Phone</label>
                        <div className="input-wrapper">
                            <Phone size={18} className="input-icon" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="form-input" required />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>Manager Name</label>
                            <div className="input-wrapper">
                                <UserCheck size={18} className="input-icon" />
                                <input type="text" name="managerName" value={formData.managerName} onChange={handleInputChange} placeholder="Manager Name" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Manager Email</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input type="email" name="managerEmail" value={formData.managerEmail} onChange={handleInputChange} placeholder="manager@gym.com" className="form-input" required />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            );
        }
    };

    const renderStep2 = () => {
        if (role === 'member') {
            return (
                <motion.div
                    key="member-step-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div variants={itemVariants} className="form-group">
                        <label>Fitness Goal</label>
                        <motion.div
                            className="input-wrapper"
                            whileFocusWithin={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Target size={18} className="input-icon" />
                            <input type="text" name="fitnessGoal" value={formData.fitnessGoal} onChange={handleInputChange} placeholder="e.g. Lose weight, Build muscle" className="form-input" required />
                        </motion.div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>Weight (kg)</label>
                            <motion.div
                                className="input-wrapper"
                                whileFocusWithin={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Scale size={18} className="input-icon" />
                                <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="70" className="form-input" required />
                            </motion.div>
                        </div>
                        <div className="form-group">
                            <label>Height (cm)</label>
                            <motion.div
                                className="input-wrapper"
                                whileFocusWithin={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Ruler size={18} className="input-icon" />
                                <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="175" className="form-input" required />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            );
        } else if (role === 'trainer') {
            return (
                <motion.div
                    key="trainer-step-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>Experience Years</label>
                            <div className="input-wrapper">
                                <Clock size={18} className="input-icon" />
                                <input type="number" name="experienceYears" value={formData.experienceYears} onChange={handleInputChange} placeholder="5" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Specialization</label>
                            <div className="input-wrapper">
                                <Award size={18} className="input-icon" />
                                <input type="text" name="specalization" value={formData.specalization} onChange={handleInputChange} placeholder="e.g. Yoga, HIIT" className="form-input" required />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="form-group">
                        <label>Price per month (EGP)</label>
                        <div className="input-wrapper">
                            <DollarSign size={18} className="input-icon" />
                            <input type="number" name="fair" value={formData.fair} onChange={handleInputChange} placeholder="50" className="form-input" required />
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="form-group">
                        <label>BIO</label>
                        <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                            <Info size={18} className="input-icon" style={{ marginTop: '0.85rem' }} />
                            <textarea name="BIO" value={formData.BIO} onChange={handleInputChange} placeholder="Tell us about yourself..." className="form-input" style={{ minHeight: '100px', paddingTop: '0.75rem', resize: 'none' }} required></textarea>
                        </div>
                    </motion.div>
                </motion.div>
            );
        } else {
            return (
                <motion.div
                    key="gym-step-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>City</label>
                            <div className="input-wrapper">
                                <MapPin size={18} className="input-icon" />
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Los Angeles" className="form-input" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Street Name</label>
                            <div className="input-wrapper">
                                <Map size={18} className="input-icon" />
                                <input type="text" name="streetName" value={formData.streetName} onChange={handleInputChange} placeholder="Sunset Blvd" className="form-input" required />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="form-row">
                        <div className="form-group">
                            <label>Crowd Level</label>
                            <div className="input-wrapper">
                                <Users size={18} className="input-icon" />
                                <select name="Crowd" value={formData.Crowd} onChange={handleInputChange} className="form-input" style={{ appearance: 'none', paddingRight: '2.5rem' }} required>
                                    <option value="low">🟢 Low</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="high">🔴 High</option>
                                </select>
                                <ChevronDown size={14} style={{ position: 'absolute', right: '1rem', color: '#5c6e4e' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Price per session ($)</label>
                            <div className="input-wrapper">
                                <DollarSign size={18} className="input-icon" />
                                <input type="number" name="fair" value={formData.fair} onChange={handleInputChange} placeholder="15" className="form-input" required />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="form-group">
                        <label>Description</label>
                        <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                            <Info size={18} className="input-icon" style={{ marginTop: '0.85rem' }} />
                            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe your gym..." className="form-input" style={{ minHeight: '100px', paddingTop: '0.75rem', resize: 'none' }} required></textarea>
                        </div>
                    </motion.div>
                </motion.div>
            );
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-left">
                    <Link to="/" className="brand-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="brand-icon">
                            <Dumbbell size={20} strokeWidth={2.5} />
                        </div>
                        FitSphere
                    </Link>

                    <div className="hero-content">
                        <div className="hero-number">,,</div>
                        <h1 className="hero-title">
                            The only bad<br />
                            workout is the one<br />
                            that <span>didn't</span><br />
                            <span>happen.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Join 50,000+ members transforming their lives<br />
                            through data-driven fitness.
                        </p>
                    </div>

                    <div className="hero-footer">
                        <div className="avatars">
                            <div className="avatar avatar-1"></div>
                            <div className="avatar avatar-2"></div>
                            <div className="avatar avatar-3"></div>
                        </div>
                        <span>Joined by athletes worldwide</span>
                    </div>
                </div>

                <div className="auth-right">
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '2rem' }} className="hover:text-[#baff29] transition-colors">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    <div className="auth-header">
                        <motion.h2
                            key={step}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Create an account
                        </motion.h2>
                        <motion.p
                            key={step + "-p"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {step === 1 ? 'Step 1: Personal Information' : 'Step 2: Additional Details'}
                        </motion.p>
                    </div>

                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        {step === 1 && (
                            <motion.div
                                className="form-group"
                                style={{ marginBottom: '1rem' }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="role-group">
                                    {['member', 'trainer', 'gym'].map((r) => (
                                        <div key={r} className="role-option">
                                            <input
                                                type="radio"
                                                id={`role-${r}`}
                                                name="role"
                                                value={r}
                                                checked={role === r}
                                                onChange={(e) => handleRoleChange(e.target.value)}
                                            />
                                            <label htmlFor={`role-${r}`} className="role-label">{r.toUpperCase()}</label>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <div className="steps-container" style={{ minHeight: '320px', position: 'relative' }}>
                            <AnimatePresence mode="wait">
                                {step === 1 ? renderStep1() : renderStep2()}
                            </AnimatePresence>
                        </div>

                        {apiError && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ color: '#ff4d4d', marginTop: '1rem', fontSize: '0.875rem', textAlign: 'center', backgroundColor: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '8px' }}
                            >
                                {apiError}
                            </motion.div>
                        )}

                        <div className="form-footer" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                            {step === 2 && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={prevStep}
                                    className="submit-btn"
                                    style={{ flex: 1, backgroundColor: '#232c1e', color: '#ffffff' }}
                                >
                                    <ArrowLeft size={18} />
                                    Back
                                </motion.button>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={step === 1 ? nextStep : handleSubmit}
                                className="submit-btn"
                                style={{ flex: step === 1 ? 1 : 2 }}
                            >
                                {step === 1 ? 'Next Step' : 'Complete Sign Up'}
                                <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </form>

                    <p className="terms-text" style={{ fontSize: '0.875rem', marginTop: '1.5rem' }}>
                        Already have an account? <Link to="/login" style={{ color: '#baff29', fontWeight: '600' }}>Log in</Link>
                    </p>

                    <div className="auth-footer" style={{ marginTop: '1.5rem' }}>
                        <span>© 2026 FitSphere Inc.</span>
                        <div className="footer-links">
                            <a href="#">Help Center</a>
                            <a href="#">Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
