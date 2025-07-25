import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const HotelVisualization = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.3]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["30px", "0px"]);
  const y = useTransform(scrollYProgress, [0, 0.5], [150, 0]);

  // Handle video loaded
  const handleVideoLoaded = () => {
    setIsLoaded(true);
    setVideoError(false);
  };

  // Handle video error
  const handleVideoError = (e) => {
    console.error('Video failed to load:', e);
    setVideoError(true);
    setIsLoaded(true);
  };

  // Handle video ended event
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Auto-play when in view with Safari compatibility
  useEffect(() => {
    if (isInView && videoRef.current && !videoError) {
      const playVideo = async () => {
        try {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };
      playVideo();
    }
  }, [isInView, videoError]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const overlayVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      ref={sectionRef} 
      className="relative min-h-screen overflow-hidden"
    > 
      {/* Video Background with Enhanced Scroll Animation */}
      <motion.div 
        className="absolute inset-0 origin-center"
        style={{
          scale,
          opacity,
          y,
          borderRadius,
          willChange: 'transform, opacity'
        }}
      >
        <motion.div
          className="w-full h-full relative overflow-hidden"
          initial={{ 
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            filter: "brightness(0.85) contrast(1.1)"
          }}
          animate={{ 
            boxShadow: isInView ? "0 30px 60px rgba(0,0,0,0.4)" : "0 0 0 rgba(0,0,0,0)",
            filter: "brightness(0.85) contrast(1.1)"
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {!videoError ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
              onEnded={handleVideoEnded}
              webkit-playsinline="true"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                filter: 'saturate(1.0) contrast(1.0) brightness(1.0)'
              }}
            >
              <source src="/video.mp4" type="video/mp4" />
              <source src="/video.webm" type="video/webm" />
            </video>
          ) : (
            // Elegant fallback background instead of gray
            <div 
              className="w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)
                `,
                backgroundSize: '400px 400px, 300px 300px, 200px 200px'
              }}
            />
          )}

          {/* Subtle gradient overlay that responds to scroll */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.1, 0.4])
            }}
          />
        </motion.div>
      </motion.div>

      {/* Dynamic Overlay that changes with scroll */}
      <motion.div 
        className="absolute inset-0 bg-black/15 z-5"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 0.2, 0.2, 0.5])
        }}
        variants={overlayVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      {/* Content Container with Parallax Effect */}
      <motion.div 
        className="relative z-20 flex items-start justify-start min-h-screen px-6 sm:px-8 lg:px-12 pt-24 sm:pt-32 lg:pt-40"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          y: useTransform(scrollYProgress, [0, 0.5], [80, -20]),
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7])
        }}
      >
        <div className="text-left max-w-3xl">
          
          {/* Main Title with Dynamic Animation */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white leading-[0.9] tracking-[0.02em] mb-8"
            variants={textVariants}
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], [120, -30]),
              opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.8], [0, 1, 0.9]),
              textShadow: "0 4px 20px rgba(0,0,0,0.6)"
            }}
          >
            <motion.span 
              className="block"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              VISUALIZE OUR
            </motion.span>
            <motion.span 
              className="block font-light"
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              MODERN HOTEL
            </motion.span>
          </motion.h2>

          {/* Subtitle with Scroll-based Animation */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-white/90 font-light tracking-wide leading-relaxed max-w-xl"
            initial={{ y: 120, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
            transition={{ duration: 1.6, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              y: useTransform(scrollYProgress, [0, 0.5], [100, -10]),
              opacity: useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0.8]),
              textShadow: "0 2px 15px rgba(0,0,0,0.5)"
            }}
          >
            Experience luxury redefined through immersive visuals and cutting-edge design
          </motion.p>

          {/* Animated accent line */}
          <motion.div
            className="w-24 h-1 bg-white/80 mt-8 origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            style={{
              scaleX: useTransform(scrollYProgress, [0.3, 0.7], [1, 0.5])
            }}
          />
        </div>
      </motion.div>

      {/* Loading Overlay - More elegant */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 2 }}
          style={{ 
            display: isLoaded ? 'none' : 'flex'
          }}
        >
          <motion.div
            className="relative"
          >
            <motion.div
              className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 w-12 h-12 border-2 border-transparent border-r-white/40 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Floating elements that move with scroll */}
      <motion.div
        className="absolute top-1/4 right-10 w-2 h-2 bg-white/30 rounded-full z-10"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
      
      <motion.div
        className="absolute top-1/2 right-20 w-1 h-1 bg-white/40 rounded-full z-10"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          opacity: useTransform(scrollYProgress, [0.2, 0.7, 1], [0, 1, 0])
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 2 }}
      />

      {/* Additional floating particles */}
      <motion.div
        className="absolute top-3/4 left-10 w-1.5 h-1.5 bg-white/25 rounded-full z-10"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
          x: useTransform(scrollYProgress, [0, 1], [0, 30]),
          opacity: useTransform(scrollYProgress, [0.1, 0.6, 1], [0, 1, 0])
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 1.8 }}
      />
    </div>
  );
};

export default HotelVisualization;