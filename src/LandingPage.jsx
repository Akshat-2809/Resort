import React from 'react';
import { motion } from 'framer-motion';

const LuxeEscape = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      y: 0
    }
  };

  const navItemVariants = {
    hover: {
      y: -2,
      color: "#D97706",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm px-6 py-4 shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="text-xl font-semibold text-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Luxe Escape
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['Hotel', 'Rooms', 'Restaurant', 'Booking'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                variants={navItemVariants}
                whileHover="hover"
                className="text-gray-700 font-medium transition-colors duration-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 text-gray-700"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content Container */}
      <div className="flex flex-col min-h-screen">
        {/* Upper Section - Hero Content */}
        <motion.div 
          className="flex-1 flex items-center justify-center pt-24 pb-8 px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight tracking-tight"
            >
              WELCOME TO
              <br />
              LUXE ESCAPE
            </motion.h1>

            {/* Subtitle */}
            <motion.div 
              variants={itemVariants}
              className="space-y-2"
            >
              <p className="text-lg md:text-xl text-gray-600 font-light">
                Welcome to our Cozy Haven, where Comfort Meets
              </p>
              <p className="text-lg md:text-xl text-gray-600 font-light">
                Style and Exceptional Service Elevates Every Experience
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="pt-4"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-black text-white px-12 py-4 rounded-full text-lg font-medium shadow-lg"
              >
                Book now
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Lower Section - Hotel Lobby Image */}
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="w-full h-1/2 relative rounded-3xl overflow-hidden"
        >
          <img src="/LandingPage.webp" alt="Hotel Lobby" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </div>
  );
};

export default LuxeEscape;