import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RestaurantHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Optimized images with faster loading
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&crop=center&auto=format&q=75',
      alt: 'Gourmet dish with wine'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&crop=center&auto=format&q=75',
      alt: 'Fine dining restaurant interior'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop&crop=center&auto=format&q=75',
      alt: 'Elegant plated dish'
    }
  ];

  // Auto-slide functionality with increased timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Increased interval to 7 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const leftContentVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const rightContentVariants = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    idle: { 
      scale: 1,
      backgroundColor: "#000000"
    },
    hover: { 
      scale: 1.02,
      backgroundColor: "#1f1f1f",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: { 
      scale: 0.98
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center">
      <motion.div 
        className="container mx-auto px-6 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8 max-w-xl"
            variants={leftContentVariants}
          >
            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-wide"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              RESTAURANT
              <br />
              AT THE HOTEL
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-gray-600 text-base lg:text-lg leading-relaxed font-light"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Our chefs offer both international and local dishes, 
              prepared only with fresh ingredients. In the cozy 
              atmosphere of the restaurant, you can enjoy not only 
              delicious food but also pleasant music and a friendly 
              ambiance.
            </motion.p>

            {/* Reservation Button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.button
                className="bg-black text-white px-12 py-4 rounded-full font-medium text-sm tracking-wider uppercase hover:shadow-lg transition-shadow duration-300"
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                Reservation
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Carousel */}
          <motion.div 
            className="relative h-[400px] md:h-[500px] lg:h-[600px]"
            variants={rightContentVariants}
          >
            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence exitBeforeEnter>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0"
                >
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].alt}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors duration-300 z-10"
                onClick={prevSlide}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors duration-300 z-10"
                onClick={nextSlide}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Slide Indicators */}
              <motion.div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RestaurantHero;