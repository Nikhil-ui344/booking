import { motion } from 'framer-motion';
import './GuestCounter.css';

const GuestCounter = ({ guests, maxGuests, onGuestChange }) => {
  const updateGuests = (type, increment) => {
    const newGuests = { ...guests };
    newGuests[type] = Math.max(0, newGuests[type] + increment);
    
    // Validate total guests
    const totalGuests = newGuests.adults + newGuests.children;
    if (totalGuests <= maxGuests) {
      onGuestChange(newGuests);
    }
  };

  const getTotalGuests = () => {
    return guests.adults + guests.children;
  };

  const canIncrement = (type) => {
    if (type === 'infants') return guests.infants < 3; // Max 3 infants
    
    const totalGuests = getTotalGuests();
    if (type === 'adults') {
      return totalGuests < maxGuests && guests.adults < 8;
    }
    if (type === 'children') {
      return totalGuests < maxGuests && guests.children < 5;
    }
    return false;
  };

  const guestTypes = [
    {
      key: 'adults',
      title: 'Adults',
      subtitle: 'Ages 13 or above',
      icon: '👥',
      min: 1
    },
    {
      key: 'children',
      title: 'Children',
      subtitle: 'Ages 2-12',
      icon: '👶',
      min: 0
    },
    {
      key: 'infants',
      title: 'Infants',
      subtitle: 'Under 2 years',
      icon: '🍼',
      min: 0
    }
  ];

  return (
    <div className="guest-counter">
      <h3 className="section-title">How many guests?</h3>
      
      <div className="guest-info">
        <div className="max-capacity">
          <span className="capacity-icon">🏠</span>
          <span>Maximum capacity: {maxGuests} guests</span>
        </div>
        
        <div className="current-total">
          <span className="total-guests">{getTotalGuests()}</span>
          <span className="total-label">guest{getTotalGuests() !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="guest-types">
        {guestTypes.map((type) => (
          <motion.div 
            key={type.key}
            className="guest-type-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="guest-type-info">
              <div className="guest-type-header">
                <span className="guest-icon">{type.icon}</span>
                <span className="guest-title">{type.title}</span>
              </div>
              <div className="guest-subtitle">{type.subtitle}</div>
            </div>
            
            <div className="guest-counter-controls">
              <motion.button
                className="counter-btn decrease"
                onClick={() => updateGuests(type.key, -1)}
                disabled={guests[type.key] <= type.min}
                whileHover={{ scale: guests[type.key] > type.min ? 1.1 : 1 }}
                whileTap={{ scale: guests[type.key] > type.min ? 0.9 : 1 }}
              >
                −
              </motion.button>
              
              <span className="guest-count">{guests[type.key]}</span>
              
              <motion.button
                className="counter-btn increase"
                onClick={() => updateGuests(type.key, 1)}
                disabled={!canIncrement(type.key)}
                whileHover={{ scale: canIncrement(type.key) ? 1.1 : 1 }}
                whileTap={{ scale: canIncrement(type.key) ? 0.9 : 1 }}
              >
                +
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="guest-notes">
        <div className="note-item">
          <span className="note-icon">ℹ️</span>
          <span>Children 2-12 years: 50% discount on extra guest charges</span>
        </div>
        <div className="note-item">
          <span className="note-icon">🎯</span>
          <span>Infants under 2 years stay free</span>
        </div>
        {getTotalGuests() > 2 && (
          <div className="note-item extra-charges">
            <span className="note-icon">💰</span>
            <span>
              Extra guest charges: ₹500 per additional adult per night
              {guests.children > 0 && ` (₹250 per child)`}
            </span>
          </div>
        )}
      </div>

      {/* Guest Distribution Visualization */}
      <div className="guest-distribution">
        <h4>Guest Summary</h4>
        <div className="distribution-grid">
          {guests.adults > 0 && (
            <div className="distribution-item">
              <span className="distribution-icon">👥</span>
              <span className="distribution-count">{guests.adults}</span>
              <span className="distribution-label">Adult{guests.adults !== 1 ? 's' : ''}</span>
            </div>
          )}
          {guests.children > 0 && (
            <div className="distribution-item">
              <span className="distribution-icon">👶</span>
              <span className="distribution-count">{guests.children}</span>
              <span className="distribution-label">Child{guests.children !== 1 ? 'ren' : ''}</span>
            </div>
          )}
          {guests.infants > 0 && (
            <div className="distribution-item">
              <span className="distribution-icon">🍼</span>
              <span className="distribution-count">{guests.infants}</span>
              <span className="distribution-label">Infant{guests.infants !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestCounter;
