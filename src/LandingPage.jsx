import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const LuxeEscape = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Function to scroll to booking section
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to scroll to rooms section
  const scrollToRooms = () => {
    const roomsSection = document.getElementById('rooms-section');
    if (roomsSection) {
      roomsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
    },
    scrollHidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    scrollVisible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to handle navigation item clicks
  const handleNavItemClick = (item) => {
    if (item === 'Booking') {
      scrollToBooking();
    } else if (item === 'Rooms') {
      scrollToRooms();
    }
    // For other items, they will use Link component navigation
  };

  // Helper function to handle mobile navigation item clicks
  const handleMobileNavItemClick = (item) => {
    if (item === 'Booking') {
      scrollToBooking();
    } else if (item === 'Rooms') {
      scrollToRooms();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate={isNavVisible ? "scrollVisible" : "scrollHidden"}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm px-6 py-4 shadow-sm mobile-menu-container"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="text-xl font-semibold text-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Luxe Escape
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['Hotel', 'Rooms', 'Restaurant', 'Booking'].map((item, index) => {
              // For items that need scroll functionality
              if (item === 'Booking' || item === 'Rooms') {
                return (
                  <motion.button
                    key={item}
                    variants={navItemVariants}
                    whileHover="hover"
                    className="text-gray-700 font-medium transition-colors duration-200 cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item}
                  </motion.button>
                );
              }
              
              // For items that need Link navigation
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={item === 'Restaurant' ? '/restaurantinfo' : '#'}
                    className="text-gray-700 font-medium transition-colors duration-200 block"
                  >
                    <motion.span
                      variants={navItemVariants}
                      whileHover="hover"
                      className="block"
                    >
                      {item}
                    </motion.span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 text-gray-700 relative z-60"
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
          >
            <motion.div
              animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg rounded-b-2xl border-t border-gray-100"
            >
              <div className="px-6 py-4 space-y-4">
                {['Hotel', 'Rooms', 'Restaurant', 'Booking'].map((item, index) => {
                  // For items that need scroll functionality
                  if (item === 'Booking' || item === 'Rooms') {
                    return (
                      <motion.button
                        key={item}
                        variants={mobileMenuItemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        className="block w-full text-left text-gray-700 font-medium py-2 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => handleMobileNavItemClick(item)}
                      >
                        {item}
                      </motion.button>
                    );
                  }
                  
                  // For items that need Link navigation
                  return (
                    <motion.div
                      key={item}
                      variants={mobileMenuItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <Link
                        to={item === 'Restaurant' ? '/restaurantinfo' : '#'}
                        className="block text-gray-700 font-medium py-2 hover:text-orange-600 transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.button
                  variants={mobileMenuItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                  className="w-full bg-black text-white px-6 py-3 rounded-full text-sm font-medium mt-4"
                  onClick={() => handleMobileNavItemClick('Booking')}
                >
                  Book now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
                onClick={scrollToBooking}
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
          className="w-full h-1/2 relative overflow-hidden px-6"
        >
          <img src="/LandingPage.webp" alt="Hotel Lobby" className="w-full h-full object-cover rounded-3xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default LuxeEscape;