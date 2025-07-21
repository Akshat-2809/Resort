import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Bed, Users, Wifi, Coffee, Bath } from 'lucide-react';

const HotelRooms = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const rooms = [
    {
      id: 1,
      name: "Standard Room",
      beds: "1 bed",
      sleeps: "2 sleeps",
      size: "32 m²",
      price: "$199",
      description: "Elegantly appointed with contemporary furnishings and premium amenities for the perfect urban retreat.",
      amenities: [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Coffee Machine" },
        { icon: Bath, label: "Luxury Bath" }
      ],
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    },
    {
      id: 2,
      name: "Junior Suite",
      beds: "1 bed",
      sleeps: "2 sleeps",
      size: "45 m²",
      price: "$299",
      description: "Spacious suite with separate living area, offering enhanced comfort and stunning city views.",
      amenities: [
        { icon: Wifi, label: "Premium WiFi" },
        { icon: Coffee, label: "Nespresso" },
        { icon: Bath, label: "Spa Bathroom" }
      ],
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      name: "Deluxe Suite",
      beds: "1 bed",
      sleeps: "4 sleeps",
      size: "65 m²",
      price: "$449",
      description: "Sophisticated luxury with premium finishes, state-of-the-art technology, and personalized service.",
      amenities: [
        { icon: Wifi, label: "Ultra WiFi" },
        { icon: Coffee, label: "Full Kitchen" },
        { icon: Bath, label: "Master Spa" }
      ],
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      name: "Presidential Suite",
      beds: "2 beds",
      sleeps: "6 sleeps",
      size: "120 m²",
      price: "$899",
      description: "The epitome of luxury with private terrace, butler service, and exclusive amenities.",
      amenities: [
        { icon: Wifi, label: "Elite WiFi" },
        { icon: Coffee, label: "Full Bar" },
        { icon: Bath, label: "Private Spa" }
      ],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: 45, 
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const currentRoom = rooms[currentSlide];

  return (
    <motion.div 
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-slate-50 to-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
        <motion.div 
          className="flex-1 mb-8 lg:mb-0"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            OUR ROOMS
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-md leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The hotel offers different room categories that are suitable for both business travelers and vacationers.
          </motion.p>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div 
          className="flex items-center gap-4"
          variants={itemVariants}
        >
          <motion.button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Featured Room - Larger */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative group cursor-pointer"
            >
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gray-200">
                <motion.img
                  src={currentRoom.image}
                  alt={currentRoom.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Room Info Overlay */}
                <motion.div 
                  className="absolute bottom-6 left-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-3xl font-light mb-3">{currentRoom.name}</h3>
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{currentRoom.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{currentRoom.sleeps}</span>
                    </div>
                    <span className="text-sm">{currentRoom.size}</span>
                  </div>
                  <div className="text-2xl font-light">{currentRoom.price}<span className="text-sm">/night</span></div>
                </motion.div>

                {/* Expand Button */}
                <motion.button
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div variants={iconVariants}>
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col justify-between space-y-8">
          
          {/* Room Info Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${currentSlide}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              <motion.h4 
                className="text-xl font-medium text-gray-900 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {currentRoom.name}
              </motion.h4>
              
              <motion.p 
                className="text-gray-600 text-sm leading-relaxed mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {currentRoom.description}
              </motion.p>
              
              {/* Amenities */}
              <div className="space-y-3">
                {currentRoom.amenities.map((amenity, index) => (
                  <motion.div
                    key={`${currentSlide}-${index}`}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                    >
                      <amenity.icon className="w-4 h-4 text-gray-600" />
                    </motion.div>
                    <span className="text-sm text-gray-700">{amenity.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Secondary Room Preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`secondary-${currentSlide}`}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut",
                delay: 0.1
              }}
            >
              <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-200">
                <motion.img
                  src={rooms[(currentSlide + 1) % rooms.length].image}
                  alt={rooms[(currentSlide + 1) % rooms.length].name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div 
                  className="absolute bottom-4 left-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-lg font-medium mb-1">{rooms[(currentSlide + 1) % rooms.length].name}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <motion.div 
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Bed className="w-3 h-3" />
                      <span>{rooms[(currentSlide + 1) % rooms.length].beds}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Users className="w-3 h-3" />
                      <span>{rooms[(currentSlide + 1) % rooms.length].sleeps}</span>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.button
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div variants={iconVariants}>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Book Now Button */}
          <motion.button
            className="w-full bg-black text-white py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 relative overflow-hidden group"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.span
              className="relative z-10"
              initial={{ y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Book now
            </motion.span>
            
            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: -100, opacity: 0 }}
              whileHover={{ x: 300, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.button>
        </div>
      </div>

      {/* Room Indicators */}
      <motion.div 
        className="flex justify-center mt-12 gap-3"
        variants={itemVariants}
      >
        {rooms.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-gray-900 w-8' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
export default HotelRooms;