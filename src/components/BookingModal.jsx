import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StayDetails from './booking/StayDetails';
import DateSelector from './booking/DateSelector';
import GuestCounter from './booking/GuestCounter';
import CelebrationAdd from './booking/CelebrationAdd';
import BookingSummary from './booking/BookingSummary';
import ContactForm from './booking/ContactForm';
import './BookingModal.css';

const BookingModal = ({ stay, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    stay: stay,
    dates: {
      checkIn: null,
      checkOut: null,
      nights: 0
    },
    guests: {
      adults: 2,
      children: 0,
      infants: 0
    },
    celebration: {
      type: '',
      description: '',
      services: [],
      budget: ''
    },
    pricing: {
      basePrice: 0,
      totalNights: 0,
      guestCharges: 0,
      celebrationCharges: 0,
      taxes: 0,
      total: 0
    },
    customer: {
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    }
  });

  const steps = [
    { id: 1, title: 'Stay Details', component: 'details' },
    { id: 2, title: 'Dates & Guests', component: 'booking' },
    { id: 3, title: 'Celebrations', component: 'celebration' },
    { id: 4, title: 'Summary', component: 'summary' },
    { id: 5, title: 'Contact', component: 'contact' }
  ];

  // Calculate pricing whenever booking data changes
  useEffect(() => {
    calculatePricing();
  }, [bookingData.dates, bookingData.guests, bookingData.celebration]);

  const calculatePricing = () => {
    if (!stay || !bookingData.dates.nights) return;

    const basePrice = stay.price * bookingData.dates.nights;
    const guestCharges = Math.max(0, (bookingData.guests.adults - 2)) * 500 * bookingData.dates.nights;
    const celebrationCharges = calculateCelebrationCharges();
    const subtotal = basePrice + guestCharges + celebrationCharges;
    const taxes = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + taxes;

    setBookingData(prev => ({
      ...prev,
      pricing: {
        basePrice,
        totalNights: bookingData.dates.nights,
        guestCharges,
        celebrationCharges,
        taxes,
        total
      }
    }));
  };

  const calculateCelebrationCharges = () => {
    if (!bookingData.celebration.type) return 0;
    
    let charges = 0;
    const services = bookingData.celebration.services;
    
    // Base celebration charge
    charges += 2000;
    
    // Additional service charges
    if (services.includes('decoration')) charges += 1500;
    if (services.includes('photography')) charges += 3000;
    if (services.includes('catering')) charges += 2500;
    if (services.includes('music')) charges += 1000;
    
    return charges;
  };

  const updateBookingData = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingSubmit = () => {
    // Handle final booking submission
    console.log('Booking submitted:', bookingData);
    alert('Booking request submitted successfully! We will contact you soon.');
    onClose();
  };

  const renderStepContent = () => {
    const step = steps[currentStep - 1];
    
    switch (step.component) {
      case 'details':
        return (
          <StayDetails 
            stay={stay} 
            onNext={handleNext}
          />
        );
      
      case 'booking':
        return (
          <div className="booking-step">
            <DateSelector 
              dates={bookingData.dates}
              onDateChange={(dates) => updateBookingData('dates', dates)}
            />
            <GuestCounter 
              guests={bookingData.guests}
              maxGuests={stay?.capacity || 8}
              onGuestChange={(guests) => updateBookingData('guests', guests)}
            />
          </div>
        );
      
      case 'celebration':
        return (
          <CelebrationAdd 
            celebration={bookingData.celebration}
            onCelebrationChange={(celebration) => updateBookingData('celebration', celebration)}
          />
        );
      
      case 'summary':
        return (
          <BookingSummary 
            bookingData={bookingData}
            stay={stay}
          />
        );
      
      case 'contact':
        return (
          <ContactForm 
            customer={bookingData.customer}
            onCustomerChange={(customer) => updateBookingData('customer', customer)}
            onSubmit={handleBookingSubmit}
          />
        );
      
      default:
        return null;
    }
  };

  if (!isOpen || !stay) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="booking-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="booking-modal"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="booking-modal-close" onClick={onClose}>
            <span>×</span>
          </button>

          {/* Progress Indicator */}
          <div className="booking-progress">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`progress-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
              >
                <div className="step-number">{step.id}</div>
                <div className="step-title">{step.title}</div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="booking-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {currentStep > 1 && currentStep < steps.length && (
            <div className="booking-navigation">
              <button 
                className="btn-secondary"
                onClick={handleBack}
              >
                Back
              </button>
              <button 
                className="btn-primary"
                onClick={handleNext}
                disabled={currentStep === 2 && (!bookingData.dates.checkIn || !bookingData.dates.checkOut)}
              >
                {currentStep === steps.length - 1 ? 'Review Booking' : 'Continue'}
              </button>
            </div>
          )}

          {/* Sticky Pricing Summary */}
          {currentStep > 1 && bookingData.pricing.total > 0 && (
            <div className="sticky-pricing">
              <div className="pricing-summary">
                <span className="total-label">Total Amount:</span>
                <span className="total-amount">₹{bookingData.pricing.total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
