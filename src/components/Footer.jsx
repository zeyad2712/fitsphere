import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f120f] border-t border-[#1c221c] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Activity className="h-6 w-6 text-[#b0f020]" />
              <span className="text-white text-xl font-bold tracking-tight">FitSphere</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The ultimate fitness app, pushing boundaries, redefining performance. Start your journey with us and achieve your goals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-[#1c221c] flex items-center justify-center text-gray-400 hover:bg-[#b0f020] hover:text-[#0f120f] transition-colors text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1c221c] flex items-center justify-center text-gray-400 hover:bg-[#b0f020] hover:text-[#0f120f] transition-colors text-xs font-bold">
                X
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1c221c] flex items-center justify-center text-gray-400 hover:bg-[#b0f020] hover:text-[#0f120f] transition-colors text-xs font-bold">
                FB
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1c221c] flex items-center justify-center text-gray-400 hover:bg-[#b0f020] hover:text-[#0f120f] transition-colors text-xs font-bold">
                YT
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Online Coaching</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">AI Personal Trainer</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Gym Finder</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">About Us</Link></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Press</a></li>
              <li><Link to="/contact" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 text-sm hover:text-[#b0f020] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1c221c] text-center">
          <p className="text-gray-500 text-xs">
            © 2026 FitSphere Technologies Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
