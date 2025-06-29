import { motion } from 'framer-motion';
import './BookingSummary.css';

const BookingSummary = ({ bookingData, stay }) => {
  const formatDate = (date) => {
    if (!date) return 'Not selected';
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCelebrationTypeName = (type) => {
    const types = {
      'birthday': 'Birthday Celebration',
      'anniversary': 'Anniversary Celebration',
      'honeymoon': 'Honeymoon Package',
      'wedding': 'Wedding Celebration',
      'corporate': 'Corporate Retreat',
      'graduation': 'Graduation Celebration',
      'reunion': 'Family Reunion',
      'other': 'Custom Celebration'
    };
    return types[type] || 'Celebration';
  };

  const getServiceName = (serviceId) => {
    const services = {
      'decoration': 'Decoration',
      'photography': 'Photography',
      'catering': 'Special Catering',
      'music': 'Music & Entertainment',
      'flowers': 'Fresh Flowers',
      'cake': 'Custom Cake'
    };
    return services[serviceId] || serviceId;
  };

  const getServicePrice = (serviceId) => {
    const prices = {
      'decoration': 1500,
      'photography': 3000,
      'catering': 2500,
      'music': 1000,
      'flowers': 800,
      'cake': 1200
    };
    return prices[serviceId] || 0;
  };

  return (
    <div className="booking-summary">
      <div className="summary-header">
        <h3 className="section-title">Booking Summary</h3>
        <p className="section-subtitle">Review your booking details before confirming</p>
      </div>

      <div className="summary-sections">
        {/* Stay Details */}
        <motion.div 
          className="summary-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="section-header">
            <span className="section-icon">🏠</span>
            Stay Details
          </h4>
          <div className="summary-card">
            <div className="stay-info">
              <div className="stay-name">{stay?.name}</div>
              <div className="stay-location">📍 {stay?.location}</div>
              <div className="stay-type">{stay?.type} • {stay?.capacity}</div>
            </div>
            <div className="stay-rating">
              <span className="rating">⭐ {stay?.rating}</span>
              <span className="reviews">({stay?.reviews} reviews)</span>
            </div>
          </div>
        </motion.div>

        {/* Date & Guest Details */}
        <motion.div 
          className="summary-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="section-header">
            <span className="section-icon">📅</span>
            Dates & Guests
          </h4>
          <div className="summary-card">
            <div className="date-details">
              <div className="date-row">
                <span className="label">Check-in:</span>
                <span className="value">{formatDate(bookingData.dates.checkIn)}</span>
              </div>
              <div className="date-row">
                <span className="label">Check-out:</span>
                <span className="value">{formatDate(bookingData.dates.checkOut)}</span>
              </div>
              <div className="date-row highlight">
                <span className="label">Duration:</span>
                <span className="value">{bookingData.dates.nights} night{bookingData.dates.nights !== 1 ? 's' : ''}</span>
              </div>
            </div>
            
            <div className="guest-details">
              <div className="guest-row">
                <span className="guest-icon">👥</span>
                <span>{bookingData.guests.adults} Adult{bookingData.guests.adults !== 1 ? 's' : ''}</span>
              </div>
              {bookingData.guests.children > 0 && (
                <div className="guest-row">
                  <span className="guest-icon">👶</span>
                  <span>{bookingData.guests.children} Child{bookingData.guests.children !== 1 ? 'ren' : ''}</span>
                </div>
              )}
              {bookingData.guests.infants > 0 && (
                <div className="guest-row">
                  <span className="guest-icon">🍼</span>
                  <span>{bookingData.guests.infants} Infant{bookingData.guests.infants !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Celebration Details */}
        {bookingData.celebration.type && (
          <motion.div 
            className="summary-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="section-header">
              <span className="section-icon">🎉</span>
              Celebration Details
            </h4>
            <div className="summary-card">
              <div className="celebration-type">
                <strong>{getCelebrationTypeName(bookingData.celebration.type)}</strong>
              </div>
              
              {bookingData.celebration.services.length > 0 && (
                <div className="celebration-services">
                  <div className="services-label">Additional Services:</div>
                  {bookingData.celebration.services.map((serviceId) => (
                    <div key={serviceId} className="service-item">
                      <span>{getServiceName(serviceId)}</span>
                      <span>₹{getServicePrice(serviceId).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {bookingData.celebration.description && (
                <div className="celebration-notes">
                  <div className="notes-label">Special Requirements:</div>
                  <div className="notes-text">{bookingData.celebration.description}</div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Pricing Breakdown */}
        <motion.div 
          className="summary-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="section-header">
            <span className="section-icon">💰</span>
            Pricing Breakdown
          </h4>
          <div className="summary-card pricing-card">
            <div className="pricing-details">
              <div className="price-row">
                <span className="price-label">
                  ₹{stay?.price?.toLocaleString()} × {bookingData.pricing.totalNights} night{bookingData.pricing.totalNights !== 1 ? 's' : ''}
                </span>
                <span className="price-value">₹{bookingData.pricing.basePrice.toLocaleString()}</span>
              </div>
              
              {bookingData.pricing.guestCharges > 0 && (
                <div className="price-row">
                  <span className="price-label">Extra guest charges</span>
                  <span className="price-value">₹{bookingData.pricing.guestCharges.toLocaleString()}</span>
                </div>
              )}
              
              {bookingData.pricing.celebrationCharges > 0 && (
                <div className="price-row">
                  <span className="price-label">Celebration services</span>
                  <span className="price-value">₹{bookingData.pricing.celebrationCharges.toLocaleString()}</span>
                </div>
              )}
              
              <div className="price-divider"></div>
              
              <div className="price-row subtotal">
                <span className="price-label">Subtotal</span>
                <span className="price-value">
                  ₹{(bookingData.pricing.basePrice + bookingData.pricing.guestCharges + bookingData.pricing.celebrationCharges).toLocaleString()}
                </span>
              </div>
              
              <div className="price-row">
                <span className="price-label">Taxes & fees (18% GST)</span>
                <span className="price-value">₹{bookingData.pricing.taxes.toLocaleString()}</span>
              </div>
              
              <div className="price-divider"></div>
              
              <div className="price-row total">
                <span className="price-label">Total Amount</span>
                <span className="price-value">₹{bookingData.pricing.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div 
          className="summary-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="section-header">
            <span className="section-icon">📋</span>
            Important Information
          </h4>
          <div className="summary-card">
            <div className="important-notes">
              <div className="note-item">
                <span className="note-icon">🕐</span>
                <span>Check-in: 2:00 PM - 8:00 PM | Check-out: 11:00 AM</span>
              </div>
              <div className="note-item">
                <span className="note-icon">❌</span>
                <span>Free cancellation up to 48 hours before check-in</span>
              </div>
              <div className="note-item">
                <span className="note-icon">💳</span>
                <span>25% advance payment required to confirm booking</span>
              </div>
              <div className="note-item">
                <span className="note-icon">📞</span>
                <span>We'll contact you within 2 hours to confirm details</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSummary;
