import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight, Star } from 'lucide-react';

export default function LuxuryFooter() {
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
    <div className="bg-black text-white p-8">
      <footer className="w-full max-w-7xl mx-auto">
        {/* Decorative top border */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent mb-16 opacity-60"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group transform hover:scale-105 transition-transform duration-500">
              <div className="relative">
                <Star className="w-8 h-8 text-orange-500 group-hover:rotate-180 transition-transform duration-700" />
                <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 group-hover:scale-150 transition-all duration-700"></div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Luxe Escape
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
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
            <h3 className="text-xl font-semibold text-orange-400 relative">
              About
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </h3>
            
            <ul className="space-y-3">
              {['Home', 'Our Story', 'Sleep', 'Inspiration', 'Contact'].map((item, index) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 text-sm flex items-center group"
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
            <h3 className="text-xl font-semibold text-orange-400 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-orange-500"></div>
            </h3>
            
            <ul className="space-y-3">
              {['Book a Room', 'Check In', 'Check Out', 'FAQs'].map((item, index) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-orange-400 transition-all duration-300 text-sm flex items-center group"
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
            <h3 className="text-xl font-semibold text-orange-400 relative">
              Newsletter
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-orange-500"></div>
            </h3>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Stay informed through our newsletter & get offers any time.
            </p>
            
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                />
                <button
                  onClick={handleSubscribe}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-all duration-300 hover:scale-110"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              {isSubscribed && (
                <div className="text-green-400 text-sm animate-fade-in">
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
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12"
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
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <div className="flex justify-center -mt-3">
            <div className="bg-black px-4">
              <Star className="w-6 h-6 text-orange-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            
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

        {/* Floating decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-500 rounded-full opacity-30 animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-ping" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-orange-600 rounded-full opacity-20 animate-ping" style={{ animationDelay: '6s' }}></div>
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