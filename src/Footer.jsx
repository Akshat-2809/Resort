import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';

export default function SubtleFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 p-8">
      <footer className="w-full max-w-7xl mx-auto">
        {/* Decorative top border */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-16 opacity-60"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group transform hover:scale-105 transition-transform duration-500">
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                Luxe Escape
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-3 group hover:text-orange-400 transition-colors duration-300">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">+442 (0)20 34 10 34</span>
              </div>
              
              <div className="flex items-center space-x-3 group hover:text-orange-400 transition-colors duration-300">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">luxeescape@support.com</span>
              </div>
              
              <div className="flex items-start space-x-3 group hover:text-orange-400 transition-colors duration-300">
                <MapPin className="w-5 h-5 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-sm leading-relaxed">
                  <div>One infinite loop</div>
                  <div>California</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 relative group">
              About
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h3>
            
            <ul className="space-y-3">
              {['Home', 'Our Story', 'Sleep', 'Inspiration', 'Contact'].map((item, index) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-orange-400 transition-all duration-300 text-sm flex items-center group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 relative group">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h3>
            
            <ul className="space-y-3">
              {['Book a Room', 'Check In', 'Check Out', 'FAQs'].map((item, index) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-orange-400 transition-all duration-300 text-sm flex items-center group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 relative group">
              Newsletter
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed">
              Stay informed through our newsletter & get offers any time.
            </p>
            
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                />
                <button
                  onClick={handleSubscribe}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-orange-500 text-white p-2 rounded-md transition-all duration-300 hover:scale-110"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              {isSubscribed && (
                <div className="text-green-500 text-sm animate-fade-in">
                  ✓ Successfully subscribed!
                </div>
              )}
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              {[
                { icon: Facebook, name: 'facebook' },
                { icon: Instagram, name: 'instagram' },
                { icon: Twitter, name: 'twitter' },
                { icon: Youtube, name: 'youtube' }
              ].map(({ icon: Icon, name }) => (
                <a
                  key={name}
                  href="#"
                  className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-sm"
                  onMouseEnter={() => setHoveredSocial(name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${hoveredSocial === name ? 'scale-125' : ''}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="my-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>© 2025 Luxe Escape. All rights reserved.</span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            {['Terms & Conditions', 'Privacy Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-orange-400 transition-colors duration-300 relative group"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}