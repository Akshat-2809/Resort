import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Calendar, Users, CreditCard, Lock, Check, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const InputField = React.memo(({ label, name, type = 'text', placeholder, className = '', maxLength, onChange, value, error, ...props }) => (
  <div className={className}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label} *
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value || ''}
      onChange={onChange}
      maxLength={maxLength}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
        error ? 'border-red-300 bg-red-50' : 'border-gray-200'
      }`}
      placeholder={placeholder}
      autoComplete="off"
      spellCheck="false"
      {...props}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
  </div>
));

const CheckoutPage = ({ onBack }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const bookingData = location.state;
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', country: '', zipCode: '',
    cardNumber: '', expiryDate: '', cvv: '', cardName: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    [headerRef, summaryRef, formRef].forEach((ref, i) => {
      if (ref.current) {
        ref.current.style.animation = `fadeInUp 0.8s ease-out ${i * 0.2}s both`;
      }
    });
  }, []);

  const defaultBooking = {
    room: {
      name: "Luxury Suite",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
      beds: "King bed",
      sleeps: "Sleeps 2",
      price: "$299"
    },
    checkIn: "2025-08-01",
    checkOut: "2025-08-03",
    adults: 2,
    children: 0
  };

  const booking = bookingData || defaultBooking;
  const { room, checkIn, checkOut, adults, children = 0 } = booking;
  const handleBack = onBack || (() => navigate('/'));

  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const roomPrice = parseFloat(room.price.replace('$', ''));
  const subtotal = roomPrice * nights;
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { 
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const formatCardNumber = useCallback((value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.match(/.{1,4}/g)?.join(' ') || v;
  }, []);

  const formatExpiryDate = useCallback((value) => {
    const v = value.replace(/\D/g, '');
    return v.length >= 2 ? v.substring(0, 2) + '/' + v.substring(2, 4) : v;
  }, []);

  const handleCardNumberChange = useCallback((e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setFormData(prev => ({ ...prev, cardNumber: formatted }));
      
      if (errors.cardNumber) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.cardNumber;
          return newErrors;
        });
      }
    }
  }, [formatCardNumber, errors.cardNumber]);

  const handleExpiryChange = useCallback((e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setFormData(prev => ({ ...prev, expiryDate: formatted }));
      
      if (errors.expiryDate) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.expiryDate;
          return newErrors;
        });
      }
    }
  }, [formatExpiryDate, errors.expiryDate]);

  const validateForm = useCallback(() => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'country', 'zipCode', 'cardNumber', 'expiryDate', 'cvv', 'cardName'];
    const newErrors = {};
    
    required.forEach(field => {
      if (!formData[field].trim()) {
        const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase();
        newErrors[field] = `${fieldName} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Card number is invalid';
    if (formData.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Expiry date is invalid';
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        const confirmationNumber = `HTL${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        alert(`Booking confirmed! Confirmation: ${confirmationNumber}`);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }, 2000);
    }, 2000);
  }, [validateForm, navigate]);

  if (!bookingData && !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">No booking data found</h2>
          <p className="text-gray-600 mb-4">Please start your booking from the rooms page.</p>
          <button 
            onClick={() => navigate('/booking')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Booking Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .processing-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div ref={headerRef} className="mb-8">
            <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Booking
            </button>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">CHECKOUT</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Booking Summary */}
            <div ref={summaryRef} className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Booking Summary</h2>
                
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-1">{room.beds} | {room.sleeps}</p>
                  <p className="text-gray-600">{room.price}/night</p>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    { icon: Calendar, label: 'Check-in', value: formatDate(checkIn) },
                    { icon: Calendar, label: 'Check-out', value: formatDate(checkOut) },
                    { icon: Users, label: 'Guests', value: `${adults} adults${children > 0 ? `, ${children} children` : ''}` }
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center text-gray-600">
                      <Icon className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>{room.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & fees</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div ref={formRef} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Personal Information */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="First Name" 
                      name="firstName" 
                      placeholder="Your" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                    />
                    <InputField 
                      label="Last Name" 
                      name="lastName" 
                      placeholder="Name" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                    />
                    <InputField 
                      label="Email Address" 
                      name="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <InputField 
                      label="Phone Number" 
                      name="phone" 
                      type="tel" 
                      placeholder="+1 (555) 123-4567" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                    />
                    <InputField 
                      label="Address" 
                      name="address" 
                      placeholder="123 Main Street" 
                      className="md:col-span-2" 
                      value={formData.address}
                      onChange={handleInputChange}
                      error={errors.address}
                    />
                    <InputField 
                      label="City" 
                      name="city" 
                      placeholder="New York" 
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                    />
                    <InputField 
                      label="Country" 
                      name="country" 
                      placeholder="United States" 
                      value={formData.country}
                      onChange={handleInputChange}
                      error={errors.country}
                    />
                    <InputField 
                      label="ZIP Code" 
                      name="zipCode" 
                      placeholder="10001" 
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      error={errors.zipCode}
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-6">
                    <CreditCard className="w-6 h-6 mr-3 text-gray-900" />
                    <h2 className="text-xl font-medium text-gray-900">Payment Information</h2>
                    <Lock className="w-4 h-4 ml-2 text-gray-500" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <InputField 
                      label="Card Number" 
                      name="cardNumber" 
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      error={errors.cardNumber}
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <InputField 
                        label="Expiry Date" 
                        name="expiryDate" 
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        error={errors.expiryDate}
                      />
                      <InputField 
                        label="CVV" 
                        name="cvv" 
                        placeholder="123" 
                        maxLength="4" 
                        value={formData.cvv}
                        onChange={handleInputChange}
                        error={errors.cvv}
                      />
                    </div>
                    <InputField 
                      label="Cardholder Name" 
                      name="cardName" 
                      placeholder="Your Name" 
                      value={formData.cardName}
                      onChange={handleInputChange}
                      error={errors.cardName}
                    />
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600">
                      <Lock className="w-4 h-4 mr-2" />
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-black flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="processing-pulse w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : showSuccess ? (
                    <>
                      <Check className="w-5 h-5 mr-3" />
                      Payment Successful!
                    </>
                  ) : (
                    `Complete Booking • $${total.toFixed(2)}`
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  By completing this booking, you agree to our terms and conditions
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;