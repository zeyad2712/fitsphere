import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="bg-[#0a0d0a] text-white min-h-screen font-sans">
            <Navbar />

            <motion.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="pt-24"
            >
                {/* Hero Section */}
                <section className="relative py-20 px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/contact_hero.png" 
                            alt="Contact FitSphere" 
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d0a] via-transparent to-[#0a0d0a]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto text-center">
                        <motion.h1 
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                        >
                            GET IN <span className="text-[#b0f020]">TOUCH</span>
                        </motion.h1>
                        <motion.p 
                            variants={itemVariants}
                            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
                        >
                            Have a question or want to partner with us? Our team is here to help you 
                            push your boundaries. Reach out through any of the channels below.
                        </motion.p>
                    </div>
                </section>

                <section className="py-20 px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-16">
                        {/* Contact Info */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                                <p className="text-gray-400 mb-8">
                                    Fill out the form and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#151a15] border border-[#b0f020]/20 flex items-center justify-center group-hover:bg-[#b0f020]/10 transition-colors">
                                        <Mail className="text-[#b0f020] w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-xl font-medium">support@fitsphere.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#151a15] border border-[#b0f020]/20 flex items-center justify-center group-hover:bg-[#b0f020]/10 transition-colors">
                                        <Phone className="text-[#b0f020] w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="text-xl font-medium">+1 (555) 000-FIT</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-[#151a15] border border-[#b0f020]/20 flex items-center justify-center group-hover:bg-[#b0f020]/10 transition-colors">
                                        <MapPin className="text-[#b0f020] w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Visit Us</p>
                                        <p className="text-xl font-medium">Silicon Valley, CA, USA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 block">
                                <h3 className="text-lg font-bold mb-4">Follow Our Journey</h3>
                                <div className="flex gap-4">
                                    {['IG', 'X', 'FB', 'LI'].map((social) => (
                                        <a key={social} href="#" className="w-10 h-10 rounded-xl bg-[#151a15] border border-white/5 flex items-center justify-center hover:border-[#b0f020] hover:text-[#b0f020] transition-all">
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div variants={itemVariants} className="lg:col-span-3">
                            <form onSubmit={handleSubmit} className="bg-[#0f120f] border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
                                {isSubmitted && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-[#0f120f]/95 z-20 flex flex-col items-center justify-center text-center p-8"
                                    >
                                        <div className="w-20 h-20 bg-[#b0f020]/10 rounded-full flex items-center justify-center mb-6">
                                            <Send className="text-[#b0f020] w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-3">Message Sent!</h3>
                                        <p className="text-gray-400">Thanks for reaching out. Our team will contact you shortly.</p>
                                        <button 
                                            type="button"
                                            onClick={() => setIsSubmitted(false)}
                                            className="mt-8 text-[#b0f020] font-bold underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                            <User size={14} className="text-[#b0f020]" /> Full Name
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full bg-[#151a15] border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                            <AtSign size={14} className="text-[#b0f020]" /> Email Address
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full bg-[#151a15] border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 mb-10">
                                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                        <MessageSquare size={14} className="text-[#b0f020]" /> Your Message
                                    </label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        placeholder="Tell us how we can help..."
                                        className="w-full bg-[#151a15] border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-[#b0f020] focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-[#b0f020] text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#9de018] shadow-[0_10px_30px_rgba(176,240,32,0.15)] transition-all hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Link or Map section could go here */}
            </motion.main>

            <Footer />
        </div>
    );
};

export default ContactUs;
