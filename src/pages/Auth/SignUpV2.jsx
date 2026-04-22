import React, { useState } from 'react';
import { Dumbbell, User, Mail, Lock, Target, ArrowRight, ChevronDown, ArrowLeft, Calendar, Phone, Building, MapPin, Info, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';

const SignUp = () => {
    const [role, setRole] = useState('member');

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                {/* Left Section */}
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

                {/* Right Section */}
                <div className="auth-right">
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '2rem' }} className="hover:text-[#baff29] transition-colors">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    <div className="auth-header">
                        <h2>Create an account</h2>
                        <p>Start your fitness journey with FitSphere today.</p>
                    </div>

                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        {/* Role Selection */}
                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label>Role</label>
                            <div className="role-group">
                                <div className="role-option">
                                    <input 
                                        type="radio" 
                                        id="role-member" 
                                        name="role" 
                                        value="member" 
                                        checked={role === 'member'}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="role-member" className="role-label">Member</label>
                                </div>
                                <div className="role-option">
                                    <input 
                                        type="radio" 
                                        id="role-trainer" 
                                        name="role" 
                                        value="trainer" 
                                        checked={role === 'trainer'}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="role-trainer" className="role-label">Trainer</label>
                                </div>
                                <div className="role-option">
                                    <input 
                                        type="radio" 
                                        id="role-gym" 
                                        name="role" 
                                        value="gym" 
                                        checked={role === 'gym'}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="role-gym" className="role-label">GYM</label>
                                </div>
                            </div>
                        </div>

                        {role !== 'gym' ? (
                            <>
                                {/* Full Name */}
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-wrapper">
                                        <User size={18} className="input-icon" />
                                        <input type="text" placeholder="John Doe" className="form-input" />
                                    </div>
                                </div>

                                {/* Date of Birth & Phone Number */}
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <div className="input-wrapper">
                                            <Calendar size={18} className="input-icon" />
                                            <input type="date" className="form-input" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <div className="input-wrapper">
                                            <Phone size={18} className="input-icon" />
                                            <input type="tel" placeholder="+1 (555) 000-0000" className="form-input" />
                                        </div>
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-wrapper">
                                        <Mail size={18} className="input-icon" />
                                        <input type="email" placeholder="john@example.com" className="form-input" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Gym Specific Fields */}
                                <div className="form-group">
                                    <label>GYM Name</label>
                                    <div className="input-wrapper">
                                        <Building size={18} className="input-icon" />
                                        <input type="text" placeholder="Iron Paradise Gym" className="form-input" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City</label>
                                        <div className="input-wrapper">
                                            <MapPin size={18} className="input-icon" />
                                            <input type="text" placeholder="Los Angeles" className="form-input" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Street Name</label>
                                        <div className="input-wrapper">
                                            <MapPin size={18} className="input-icon" />
                                            <input type="text" placeholder="Sunset Blvd" className="form-input" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Manager Name</label>
                                        <div className="input-wrapper">
                                            <User size={18} className="input-icon" />
                                            <input type="text" placeholder="Full Name" className="form-input" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Manager Email</label>
                                        <div className="input-wrapper">
                                            <Mail size={18} className="input-icon" />
                                            <input type="email" placeholder="manager@gym.com" className="form-input" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <div className="input-wrapper">
                                            <Phone size={18} className="input-icon" />
                                            <input type="tel" placeholder="+1 (555) 000-0000" className="form-input" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Crowd Level (Expected)</label>
                                        <div className="input-wrapper">
                                            <Users size={18} className="input-icon" />
                                            <select className="form-input" style={{ appearance: 'none', paddingRight: '2.5rem' }}>
                                                <option value="low">Low (Chill)</option>
                                                <option value="medium">Medium (Busy)</option>
                                                <option value="high">High (Energetic)</option>
                                            </select>
                                            <ChevronDown size={14} style={{ position: 'absolute', right: '1rem', color: '#5c6e4e' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Gym Description</label>
                                    <div className="input-wrapper" style={{ alignItems: 'flex-start' }}>
                                        <Info size={18} className="input-icon" style={{ marginTop: '0.85rem' }} />
                                        <textarea 
                                            placeholder="Tell potential members what makes your gym special (equipment, vibe, community)..." 
                                            className="form-input" 
                                            style={{ minHeight: '100px', paddingTop: '0.75rem', resize: 'none', lineHeight: '1.6' }}
                                        ></textarea>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Password & Confirm Password (Shared) */}
                        <div className="form-row">
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input type="password" placeholder="••••••••" className="form-input" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input type="password" placeholder="••••••••" className="form-input" />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-btn" style={{ transition: 'all 0.3s ease', marginTop: '1rem' }}>
                            Sign Up
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    {/* Already have an account? */}
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
