import React from 'react';
import { Dumbbell, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';

const Login = () => {
    return (
        <div>
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

                        <div className="auth-header" style={{ marginBottom: '2rem' }}>
                            <h2>Login to your account</h2>
                            <p>Welcome back! Please enter your details.</p>
                        </div>

                        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                            {/* Email Address */}
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <Mail size={18} className="input-icon" />
                                    <input type="email" placeholder="john@example.com" className="form-input" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <Lock size={18} className="input-icon" />
                                    <input type="password" placeholder="••••••••" className="form-input" />
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="form-group" style={{ alignItems: 'flex-end', marginTop: '-0.5rem' }}>
                                <span style={{ fontSize: '0.8rem', color: '#8b9d7b' }}>
                                    Forgot your password? <Link to="/forget-password" style={{ color: '#baff29', fontWeight: '600' }}>Reset it here</Link>
                                </span>
                            </div>
                            {/* Submit Button */}
                            <button type="submit" className="submit-btn" style={{ transition: 'all 0.3s ease', marginTop: '1rem' }}>
                                Log In
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        <p className="terms-text" style={{ fontSize: '0.875rem' }}>
                            Don't have an account? <Link to="/signup" style={{ color: '#baff29', fontWeight: '600' }}>Sign up</Link>
                        </p>

                        <div className="auth-footer" style={{ marginTop: 'auto' }}>
                            <span>© 2026 FitSphere Inc.</span>
                            <div className="footer-links">
                                <a href="#">Help Center</a>
                                <a href="#">Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
