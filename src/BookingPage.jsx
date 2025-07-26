import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowUpRight, Plus, Minus, ChevronDown, Loader2 } from 'lucide-react';

// Room data
const ROOMS = [
  {
    id: 1,
    name: "Deluxe Room",
    beds: "1 bed",
    sleeps: "2 sleeps",
    maxGuests: 2,
    price: "$299",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "deluxe"
  },
  {
    id: 2,
    name: "Junior Suite",
    beds: "1 bed",
    sleeps: "2 sleeps",
    maxGuests: 2,
    price: "$399",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "junior-suite"
  },
  {
    id: 3,
    name: "Suite",
    beds: "1 bed",
    sleeps: "2 sleeps",
    maxGuests: 2,
    price: "$549",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "suite"
  },
  {
    id: 4,
    name: "Twin Room",
    beds: "2 beds",
    sleeps: "4 sleeps",
    maxGuests: 4,
    price: "$199",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    category: "twin"
  },
  {
    id: 5,
    name: "Presidential Suite",
    beds: "2 bed",
    sleeps: "6 sleeps",
    maxGuests: 6,
    price: "$899",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "suite"
  }
];

// Date utility functions
const getFormattedDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

const getTodayDate = () => {
  return getFormattedDate(new Date());
};

const getMinCheckOutDate = (checkInDate) => {
  if (!checkInDate) return getTodayDate();
  const date = new Date(checkInDate);
  date.setDate(date.getDate() + 1);
  return getFormattedDate(date);
};

const isDateValid = (checkIn, checkOut) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return checkInDate >= today && checkOutDate > checkInDate;
};

// Guest Counter Component
const GuestCounter = ({ label, description, count, onDecrement, onIncrement, minCount = 0, maxCount = 10 }) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <div className="font-medium text-gray-900">{label}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
    <div className="flex items-center space-x-3">
      <button
        type="button"
        onClick={onDecrement}
        disabled={count <= minCount}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:scale-105 transition-all duration-200"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center font-medium">{count}</span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={count >= maxCount}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 hover:scale-105 transition-all duration-200"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Room Card Component
const RoomCard = ({ room, isLarge = false, onClick, cardRef }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(room);
    }
  };

  const cardHeight = isLarge ? 'h-80 lg:h-96' : 'h-64 lg:h-80';
  const cardCols = room.id === 1 ? 'md:col-span-1 lg:col-span-2' : room.id === 5 ? 'md:col-span-2 lg:col-span-1' : '';
  const textSize = isLarge ? 'text-2xl' : 'text-lg';
  const priceSize = isLarge ? 'text-lg' : 'text-base';
  const padding = isLarge ? 'bottom-6 left-6' : 'bottom-4 left-4';
  const buttonSize = isLarge ? 'w-10 h-10 top-6 right-6' : 'w-8 h-8 top-4 right-4';
  const iconSize = isLarge ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div 
      ref={cardRef}
      className={`cursor-pointer group ${cardCols}`}
      onClick={() => onClick(room)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Select ${room.name} - ${room.price} per night`}
    >
      <div className={`relative ${cardHeight} rounded-2xl overflow-hidden bg-gray-200 transition-all duration-500 group-hover:shadow-2xl focus:ring-2 focus:ring-gray-900`}>
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className={`absolute ${padding} text-white`}>
          <h3 className={`${textSize} font-light mb-2`}>{room.name}</h3>
          <p className="text-sm opacity-90 mb-1">{room.beds} | {room.sleeps}</p>
          <p className={`${priceSize} font-medium`}>
            {room.price}
            <span className="text-sm font-normal opacity-75">/night</span>
          </p>
        </div>
        
        <button 
          className={`absolute ${buttonSize} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110`}
          aria-label="View room details"
          tabIndex={-1}
        >
          <ArrowUpRight className={iconSize} />
        </button>
      </div>
    </div>
  );
};

// Date Input Component
const DateInput = ({ id, label, value, onChange, min }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 transition-all duration-200"
      />
    </div>
  </div>
);

// Guest Dropdown Component
const GuestDropdown = ({ 
  adults, 
  children, 
  onGuestChange, 
  showDropdown, 
  onToggleDropdown, 
  dropdownRef 
}) => {
  const getGuestText = () => {
    const totalGuests = adults + children;
    const guestText = totalGuests === 1 ? 'guest' : 'guests';
    const childText = children > 0 ? `, ${children} ${children === 1 ? 'child' : 'children'}` : '';
    return `${totalGuests} ${guestText}${childText}`;
  };

  const handleGuestChange = (type, operation) => {
    if (type === 'adults') {
      if (operation === 'increment' && adults < 10) {
        onGuestChange(adults + 1, children);
      } else if (operation === 'decrement' && adults > 1) {
        onGuestChange(adults - 1, children);
      }
    } else if (type === 'children') {
      if (operation === 'increment' && children < 10) {
        onGuestChange(adults, children + 1);
      } else if (operation === 'decrement' && children > 0) {
        onGuestChange(adults, children - 1);
      }
    }
  };

  return (
    <div className="space-y-2 relative z-50" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700">
        Guests
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={onToggleDropdown}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 transition-all duration-200 text-left bg-white hover:bg-gray-50"
        >
          {getGuestText()}
        </button>
        <ChevronDown className={`absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
        
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] p-4">
            <GuestCounter
              label="Adults"
              description="Ages 13 or above"
              count={adults}
              onDecrement={() => handleGuestChange('adults', 'decrement')}
              onIncrement={() => handleGuestChange('adults', 'increment')}
              minCount={1}
            />
            <div className="my-3 border-t border-gray-100"></div>
            <GuestCounter
              label="Children"
              description="Ages 2-12"
              count={children}
              onDecrement={() => handleGuestChange('children', 'decrement')}
              onIncrement={() => handleGuestChange('children', 'increment')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Validation Messages Component
const ValidationMessages = ({ isValid }) => {
  if (isValid) return null;
  
  return (
    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-600">
        Please select valid dates. Check-in must be today or later, and check-out must be after check-in.
      </p>
    </div>
  );
};

// Selected Room Info Component
const SelectedRoomInfo = ({ room, adults, children, onBookRoom, isDateValid, isBookingLoading, selectedRoomRef }) => {
  const totalGuests = adults + children;
  const exceedsCapacity = totalGuests > room.maxGuests;
  const canBook = isDateValid && !exceedsCapacity;

  return (
    <div ref={selectedRoomRef} className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">{room.name}</h3>
          <p className="text-gray-600">{room.beds} | {room.sleeps}</p>
          <p className="text-sm text-gray-500 mt-1">Maximum {room.maxGuests} guests</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light text-gray-900">{room.price}</p>
          <p className="text-sm text-gray-500">per night</p>
        </div>
      </div>
      
      {exceedsCapacity && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-700">
            This room accommodates up to {room.maxGuests} guests. You have selected {totalGuests} guests.
          </p>
        </div>
      )}
      
      <button 
        onClick={onBookRoom}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black flex items-center justify-center"
        disabled={!canBook || isBookingLoading}
      >
        {isBookingLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Booking...
          </>
        ) : (
          `Book ${room.name}`
        )}
      </button>
    </div>
  );
};

const BookingPage = () => {
  // React Router navigation
  const navigate = useNavigate();
  
  // State management
  const [checkIn, setCheckIn] = useState(getTodayDate());
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);
    return getFormattedDate(tomorrow);
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isApplyLoading, setIsApplyLoading] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  // const [showToast, setShowToast] = useState(false); // Uncomment for pop-up message approach

  // Refs
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const roomCardRefs = useRef([]);
  const guestDropdownRef = useRef(null);
  const selectedRoomRef = useRef(null);

  // Effects
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Apply CSS animations
    if (headerRef.current) {
      headerRef.current.style.animation = 'fadeInUp 1s ease-out';
    }
    if (formRef.current) {
      formRef.current.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
    }
    roomCardRefs.current.forEach((card, index) => {
      if (card) {
        card.style.animation = `fadeInUp 0.6s ease-out ${0.4 + index * 0.1}s both`;
      }
    });
  }, []);

  // Scroll to SelectedRoomInfo when selectedRoom changes
  useEffect(() => {
    if (selectedRoom && selectedRoomRef.current) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        const element = selectedRoomRef.current;
        const offset = 100; // Adjust offset to account for fixed headers or padding
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        });
      }, 0);
    }
  }, [selectedRoom]);

  // Event handlers
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    
    // Add selection animation
    const card = roomCardRefs.current[room.id - 1];
    if (card) {
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 100);
    }

    // Scroll is handled by useEffect
    // Alternative: Show toast message
    /*
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Hide toast after 3 seconds
    */
  };

  const handleApply = async () => {
    setIsApplyLoading(true);
    
    console.log('Searching rooms:', {
      checkIn,
      checkOut,
      adults,
      children
    });
    
    // Simulate search/loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowGuestDropdown(false);
    setIsApplyLoading(false);
  };

  const handleBookRoom = async () => {
    if (!selectedRoom || !isDateValid(checkIn, checkOut) || (adults + children) > selectedRoom.maxGuests) {
      return;
    }

    setIsBookingLoading(true);

    // Create booking data to pass to checkout
    const bookingData = {
      room: selectedRoom,
      checkIn,
      checkOut,
      adults,
      children,
      totalGuests: adults + children
    };

    // Simulate booking process delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Navigate to checkout page with booking data as state
    navigate('/checkout', { 
      state: { bookingData } 
    });
  };

  const handleGuestChange = (newAdults, newChildren) => {
    setAdults(newAdults);
    setChildren(newChildren);
  };

  // Computed values
  const dateValid = isDateValid(checkIn, checkOut);
  const minCheckOutDate = getMinCheckOutDate(checkIn);

  return (
    <div id="booking-section">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header ref={headerRef} className="mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-2 tracking-tight">
              BOOKING
            </h1>
          </header>

          {/* Booking Form */}
          <section ref={formRef} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12 relative overflow-visible">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              
              <DateInput
                id="checkin"
                label="Check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={getTodayDate()}
              />

              <DateInput
                id="checkout"
                label="Check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={minCheckOutDate}
              />

              <GuestDropdown
                adults={adults}
                children={children}
                onGuestChange={handleGuestChange}
                showDropdown={showGuestDropdown}
                onToggleDropdown={() => setShowGuestDropdown(!showGuestDropdown)}
                dropdownRef={guestDropdownRef}
              />

              <button
                onClick={handleApply}
                disabled={!dateValid || isApplyLoading}
                className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black flex items-center justify-center"
              >
                {isApplyLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Apply'
                )}
              </button>
            </div>
            
            <ValidationMessages isValid={dateValid} />
          </section>

          {/* Room Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                isLarge={room.id === 1 || room.id === 2}
                onClick={handleRoomSelect}
                cardRef={el => roomCardRefs.current[room.id - 1] = el}
              />
            ))}
          </section>

          {/* Selected Room Info */}
          {selectedRoom && (
            <SelectedRoomInfo
              room={selectedRoom}
              adults={adults}
              children={children}
              onBookRoom={handleBookRoom}
              isDateValid={dateValid}
              isBookingLoading={isBookingLoading}
              selectedRoomRef={selectedRoomRef}
            />
          )}

          {/* Toast Notification (Alternative to Auto-Scroll) */}
          {/*
          {showToast && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-[toastSlideIn_0.5s_ease-out]">
              <p className="text-sm">Scroll down to complete your booking for {selectedRoom.name}!</p>
            </div>
          )}
          */}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;