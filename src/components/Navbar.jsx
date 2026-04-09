import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Activity, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0f120f]/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <Activity className="h-8 w-8 text-[#b0f020] group-hover:scale-110 transition-transform" />
          <span className="text-white text-2xl font-bold tracking-tight">FitSphere</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/gyms" className="hover:text-[#b0f020] transition-colors">GYM Finder</Link>
          <Link to="/trainers" className="hover:text-[#b0f020] transition-colors">Trainers</Link>
          <a href="#aicoach" className="hover:text-[#b0f020] transition-colors">AI Coach</a>
          <Link to="/shop" className="hover:text-[#b0f020] transition-colors">Shop</Link>
          <Link to="/videos" className="hover:text-[#b0f020] transition-colors">Videos Library</Link>
          <Link to="/wishlist" className="hover:text-[#b0f020] transition-colors"><Heart size={18} /></Link>
          <Link to="/cart" className="hover:text-[#b0f020] transition-colors"><ShoppingCart size={18} /></Link>
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-white hover:text-[#b0f020] font-medium transition-colors text-sm">
            Log in
          </Link>
          <Link to="/signup" className="bg-[#b0f020] text-[#0f120f] px-6 py-2 rounded-full font-bold hover:bg-[#9de018] hover:shadow-[0_0_15px_rgba(176,240,32,0.4)] transition-all transform hover:-translate-y-0.5 text-sm">
            Sign up
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-[#b0f020]"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[#151915] border-t border-[#2a2f2a] mt-4 p-4 flex flex-col gap-4 absolute w-full"
        >
          <Link to="/gyms" className="text-gray-300 hover:text-[#b0f020] p-2" onClick={() => setMobileMenuOpen(false)}>GYM Finder</Link>
          <Link to="/trainers" className="text-gray-300 hover:text-[#b0f020] p-2" onClick={() => setMobileMenuOpen(false)}>Trainers</Link>
          <a href="#aicoach" className="text-gray-300 hover:text-[#b0f020] p-2" onClick={() => setMobileMenuOpen(false)}>AI Coach</a>
          <Link to="/shop" className="text-gray-300 hover:text-[#b0f020] p-2" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
          <Link to="/videos" className="text-gray-300 hover:text-[#b0f020] p-2" onClick={() => setMobileMenuOpen(false)}>Videos Library</Link>
          <Link to="/wishlist" className="text-gray-300 hover:text-[#b0f020] p-2 flex gap-2" onClick={() => setMobileMenuOpen(false)}><Heart size={18} />Wishlist</Link>
          <Link to="/cart" className="text-gray-300 hover:text-[#b0f020] p-2 flex gap-2" onClick={() => setMobileMenuOpen(false)}><ShoppingCart size={18} />Cart</Link>
          <div className="flex flex-col gap-2 pt-4 border-t border-[#2a2f2a]">
            <Link to="/login" className="w-full text-center py-2 text-white hover:text-[#b0f020] font-medium" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
            <Link to="/signup" className="w-full text-center py-2 bg-[#b0f020] text-[#0f120f] rounded-lg font-bold" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
