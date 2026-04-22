import React from 'react';
import { Dumbbell, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const ResetPass = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the password reset logic
        navigate('/login');
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
                            Secure your<br />
                            progress.<br />
                            <span>New chapter</span><br />
                            <span>starts now.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Choose a strong password to keep your fitness data<br />
                            safe and secure.
                        </p>
                    </div>

                    <div className="hero-footer">
                        <div className="avatars">
                            <div className="avatar avatar-1"></div>
                            <div className="avatar avatar-2"></div>
                            <div className="avatar avatar-3"></div>
                        </div>
                        <span>Securing 50k+ accounts</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="auth-right">
                    <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '2rem' }} className="hover:text-[#baff29] transition-colors">
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>

                    <div className="auth-header" style={{ marginBottom: '2rem' }}>
                        <h2>Reset Password</h2>
                        <p>Please enter your new password below.</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {/* New Password */}
                        <div className="form-group">
                            <label>New Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input type="password" placeholder="••••••••" className="form-input" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input type="password" placeholder="••••••••" className="form-input" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn" style={{ transition: 'all 0.3s ease', marginTop: '1.5rem' }}>
                            Update Password
                            <ArrowRight size={20} />
                        </button>
                    </form>

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

export default ResetPass;
