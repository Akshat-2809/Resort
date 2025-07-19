import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

const BookingPage = () => {
  const [checkIn, setCheckIn] = useState('11.03.2025');
  const [checkOut, setCheckOut] = useState('15.03.2025');
  const [guests, setGuests] = useState('2 guests, 0 children');
  const [selectedRoom, setSelectedRoom] = useState(null);
  
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const roomsRef = useRef(null);
  const roomCardRefs = useRef([]);

  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      beds: "1 bed",
      sleeps: "2 sleeps",
      price: "$299",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "deluxe"
    },
    {
      id: 2,
      name: "Junior Suite",
      beds: "1 bed",
      sleeps: "2 sleeps",
      price: "$399",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "junior-suite"
    },
    {
      id: 3,
      name: "Suite",
      beds: "1 bed",
      sleeps: "2 sleeps",
      price: "$549",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "suite"
    },
    {
      id: 4,
      name: "Twin Room",
      beds: "2 beds",
      sleeps: "4 sleeps",
      price: "$199",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      category: "twin"
    },
    {
      id: 5,
      name: "Superior Room",
      beds: "1 bed",
      sleeps: "2 sleeps",
      price: "$249",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "superior"
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Form animation
    tl.fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Room cards stagger animation
    tl.fromTo(roomCardRefs.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out" 
      },
      "-=0.3"
    );

  }, []);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    
    // Animate selection
    gsap.to(roomCardRefs.current[room.id - 1], {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const handleApply = () => {
    // Apply button animation
    gsap.to(formRef.current.querySelector('.apply-btn'), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-2 tracking-tight">
            BOOKING
          </h1>
        </div>

        {/* Booking Form */}
        <div ref={formRef} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            
            {/* Check-in */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Check-in</label>
              <div className="relative">
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 transition-all duration-200"
                />
                <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Check-out</label>
              <div className="relative">
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 transition-all duration-200"
                />
                <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <div className="relative">
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 transition-all duration-200"
                />
                <Users className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="apply-btn bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div ref={roomsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Large Deluxe Room */}
          <div 
            ref={el => roomCardRefs.current[0] = el}
            className="md:col-span-1 lg:col-span-2 md:row-span-1 cursor-pointer group"
            onClick={() => handleRoomSelect(rooms[0])}
          >
            <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-200 transition-all duration-500 group-hover:shadow-2xl">
              <img
                src={rooms[0].image}
                alt={rooms[0].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-light mb-2">{rooms[0].name}</h3>
                <p className="text-sm opacity-90 mb-1">{rooms[0].beds} | {rooms[0].sleeps}</p>
              </div>
              
              <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Junior Suite */}
          <div 
            ref={el => roomCardRefs.current[1] = el}
            className="cursor-pointer group"
            onClick={() => handleRoomSelect(rooms[1])}
          >
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-200 transition-all duration-500 group-hover:shadow-2xl">
              <img
                src={rooms[1].image}
                alt={rooms[1].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-light mb-2">{rooms[1].name}</h3>
                <p className="text-sm opacity-90">{rooms[1].beds} | {rooms[1].sleeps}</p>
              </div>
              
              <button className="absolute top-6 right-6 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Suite */}
          <div 
            ref={el => roomCardRefs.current[2] = el}
            className="cursor-pointer group"
            onClick={() => handleRoomSelect(rooms[2])}
          >
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-200 transition-all duration-500 group-hover:shadow-2xl">
              <img
                src={rooms[2].image}
                alt={rooms[2].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-light mb-1">{rooms[2].name}</h3>
                <p className="text-xs opacity-90">{rooms[2].beds} | {rooms[2].sleeps}</p>
              </div>
              
              <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Twin Room */}
          <div 
            ref={el => roomCardRefs.current[3] = el}
            className="cursor-pointer group"
            onClick={() => handleRoomSelect(rooms[3])}
          >
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-200 transition-all duration-500 group-hover:shadow-2xl">
              <img
                src={rooms[3].image}
                alt={rooms[3].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-light mb-1">{rooms[3].name}</h3>
                <p className="text-xs opacity-90">{rooms[3].beds} | {rooms[3].sleeps}</p>
              </div>
              
              <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Superior Room - Spans 2 columns */}
          <div 
            ref={el => roomCardRefs.current[4] = el}
            className="md:col-span-2 lg:col-span-1 cursor-pointer group"
            onClick={() => handleRoomSelect(rooms[4])}
          >
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-gray-200 transition-all duration-500 group-hover:shadow-2xl">
              <img
                src={rooms[4].image}
                alt={rooms[4].name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-light mb-2">{rooms[4].name}</h3>
                <p className="text-sm opacity-90">{rooms[4].beds} | {rooms[4].sleeps}</p>
              </div>
              
              <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Room Info */}
        {selectedRoom && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{selectedRoom.name}</h3>
                <p className="text-gray-600">{selectedRoom.beds} | {selectedRoom.sleeps}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-light text-gray-900">{selectedRoom.price}</p>
                <p className="text-sm text-gray-500">per night</p>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02]">
              Book {selectedRoom.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;