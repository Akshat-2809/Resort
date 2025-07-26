import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowLeft } from 'lucide-react';

const RestaurantInfo = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const handleBackToBooking = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(headerRef.current, {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });

    gsap.fromTo(cardsRef.current?.children, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back to Booking Button */}
        <motion.button
          onClick={handleBackToBooking}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 group transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-lg font-medium">Back to Booking</span>
        </motion.button>

        {/* Header Section */}
        <div className="text-center mb-16" ref={headerRef}>
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-gray-400"></div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mx-8 tracking-wide">
              FINE DINING AT OUR RESTAURANTS
            </h1>
            <div className="w-16 h-px bg-gray-400"></div>
          </div>
          
          <motion.p 
            className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Embark on a journey of exquisite experiences for the discerning connoisseur,
            seamlessly woven together with impeccable service, sophisticated ambience and
            masterful culinary artistry.
          </motion.p>
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <div className="relative">
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 border border-gray-300 rounded-full items-center justify-center bg-white hover:bg-gray-50 transition-colors duration-300 hidden lg:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 z-10 w-12 h-12 border border-gray-300 rounded-full items-center justify-center bg-white hover:bg-gray-50 transition-colors duration-300 hidden lg:flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={cardsRef}>
            {/* Card 1 - Legendary Restaurants */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=400&fit=crop&crop=center"
                  alt="Restaurant interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-px bg-gray-400 mr-4"></div>
                  <h3 className="text-xl font-light text-gray-800 tracking-wide">
                    LEGENDARY RESTAURANTS
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  A collection of restaurants recognised for unparalleled dining experiences, auth....
                  <span className="text-gray-800 font-medium cursor-pointer hover:text-gray-600">»</span>
                </p>
              </div>
            </motion.div>

            {/* Card 2 - Signature Recipes */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1602253057119-44d745d9b860?q=80&w=1626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Gourmet dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-px bg-gray-400 mr-4"></div>
                  <h3 className="text-xl font-light text-gray-800 tracking-wide">
                    SIGNATURE RECIPES
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Each a testament to our culinary passion and honed over years of dedication. The....
                  <span className="text-gray-800 font-medium cursor-pointer hover:text-gray-600">»</span>
                </p>
              </div>
            </motion.div>

            {/* Card 3 - Premier Global Cuisines */}
            <motion.div 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&h=400&fit=crop&crop=center"
                  alt="Fine dining plate"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-px bg-gray-400 mr-4"></div>
                  <h3 className="text-xl font-light text-gray-800 tracking-wide">
                    PREMIER GLOBAL CUISINES
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Experience the best of local and world flavours where authentic ingredients and ....
                  <span className="text-gray-800 font-medium cursor-pointer hover:text-gray-600">»</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Chat Button */}
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <motion.button
            className="w-14 h-14 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantInfo;