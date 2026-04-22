import React from 'react';
import { Dumbbell, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const ForgetPass = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the email sending logic
        navigate('/reset-password');
    };

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
                            Don't<br />
                            sweat the<br />
                            small <span>stuff.</span><br />
                            <span>Recovery starts here.</span>
                        </h1>
                        <p className="hero-subtitle">
                            We'll help you get back into your account in no time.<br />
                            Stay focused on your goals.
                        </p>
                    </div>

                    <div className="hero-footer">
                        <div className="avatars">
                            <div className="avatar avatar-1"></div>
                            <div className="avatar avatar-2"></div>
                            <div className="avatar avatar-3"></div>
                        </div>
                        <span>Supported by 50k+ athletes</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="auth-right">
                    <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '2rem' }} className="hover:text-[#baff29] transition-colors">
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>

                    <div className="auth-header" style={{ marginBottom: '2rem' }}>
                        <h2>Forgot Password?</h2>
                        <p>Enter your email address and we'll send you a link to reset your password.</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {/* Email Address */}
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input type="email" placeholder="john@example.com" className="form-input" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn" style={{ transition: 'all 0.3s ease', marginTop: '1.5rem' }}>
                            Reset My Password
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <p className="terms-text" style={{ fontSize: '0.875rem', marginTop: '2rem' }}>
                        Remembered your password? <Link to="/login" style={{ color: '#baff29', fontWeight: '600' }}>Log in</Link>
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
    );
};

export default ForgetPass;
