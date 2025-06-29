import { useState } from 'react';
import { motion } from 'framer-motion';
import './CelebrationAdd.css';

const CelebrationAdd = ({ celebration, onCelebrationChange }) => {
  const [showCustomType, setShowCustomType] = useState(false);

  const celebrationTypes = [
    { id: 'birthday', name: 'Birthday', icon: '🎂', description: 'Make birthdays unforgettable' },
    { id: 'anniversary', name: 'Anniversary', icon: '💕', description: 'Celebrate love and togetherness' },
    { id: 'honeymoon', name: 'Honeymoon', icon: '🌙', description: 'Romantic getaway for couples' },
    { id: 'wedding', name: 'Wedding', icon: '💒', description: 'Perfect for intimate ceremonies' },
    { id: 'corporate', name: 'Corporate Retreat', icon: '🏢', description: 'Team building and meetings' },
    { id: 'graduation', name: 'Graduation', icon: '🎓', description: 'Celebrate achievements' },
    { id: 'reunion', name: 'Family Reunion', icon: '👨‍👩‍👧‍👦', description: 'Bring family together' },
    { id: 'other', name: 'Other Celebration', icon: '🎉', description: 'Custom celebration needs' }
  ];

  const additionalServices = [
    { 
      id: 'decoration', 
      name: 'Decoration', 
      icon: '🎨', 
      price: 1500,
      description: 'Beautiful themed decorations'
    },
    { 
      id: 'photography', 
      name: 'Photography', 
      icon: '📸', 
      price: 3000,
      description: 'Professional photo & video coverage'
    },
    { 
      id: 'catering', 
      name: 'Special Catering', 
      icon: '🍽️', 
      price: 2500,
      description: 'Customized menu and dining'
    },
    { 
      id: 'music', 
      name: 'Music & Entertainment', 
      icon: '🎵', 
      price: 1000,
      description: 'Sound system and entertainment'
    },
    { 
      id: 'flowers', 
      name: 'Fresh Flowers', 
      icon: '🌸', 
      price: 800,
      description: 'Beautiful floral arrangements'
    },
    { 
      id: 'cake', 
      name: 'Custom Cake', 
      icon: '🎂', 
      price: 1200,
      description: 'Specially designed celebration cake'
    }
  ];

  const handleTypeSelect = (typeId) => {
    if (typeId === 'other') {
      setShowCustomType(true);
    } else {
      setShowCustomType(false);
    }
    
    onCelebrationChange({
      ...celebration,
      type: typeId
    });
  };

  const handleServiceToggle = (serviceId) => {
    const updatedServices = celebration.services.includes(serviceId)
      ? celebration.services.filter(id => id !== serviceId)
      : [...celebration.services, serviceId];
    
    onCelebrationChange({
      ...celebration,
      services: updatedServices
    });
  };

  const handleDescriptionChange = (description) => {
    onCelebrationChange({
      ...celebration,
      description
    });
  };

  const handleBudgetChange = (budget) => {
    onCelebrationChange({
      ...celebration,
      budget
    });
  };

  const getTotalServiceCharges = () => {
    return celebration.services.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service ? service.price : 0);
    }, 0);
  };

  return (
    <div className="celebration-add">
      <div className="celebration-header">
        <h3 className="section-title">Add Celebration Services</h3>
        <p className="section-subtitle">
          Make your stay extra special with our celebration packages
        </p>
      </div>

      {/* Skip Option */}
      <div className="skip-celebration">
        <motion.button
          className="skip-btn"
          onClick={() => onCelebrationChange({ type: '', services: [], description: '', budget: '' })}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Skip celebrations - Just book the stay
        </motion.button>
      </div>

      <div className="celebration-divider">
        <span>OR</span>
      </div>

      {/* Celebration Types */}
      <div className="celebration-types">
        <h4>What are you celebrating?</h4>
        <div className="types-grid">
          {celebrationTypes.map((type) => (
            <motion.div
              key={type.id}
              className={`celebration-type ${celebration.type === type.id ? 'selected' : ''}`}
              onClick={() => handleTypeSelect(type.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="type-icon">{type.icon}</div>
              <div className="type-name">{type.name}</div>
              <div className="type-description">{type.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Type Input */}
      {showCustomType && (
        <motion.div
          className="custom-type-input"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label>What's the occasion?</label>
          <input
            type="text"
            placeholder="e.g., Baby shower, Retirement party, Engagement..."
            value={celebration.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </motion.div>
      )}

      {/* Additional Services */}
      {celebration.type && (
        <motion.div
          className="additional-services"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4>Additional Services</h4>
          <div className="services-grid">
            {additionalServices.map((service) => (
              <motion.div
                key={service.id}
                className={`service-card ${celebration.services.includes(service.id) ? 'selected' : ''}`}
                onClick={() => handleServiceToggle(service.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="service-header">
                  <span className="service-icon">{service.icon}</span>
                  <div className="service-price">₹{service.price}</div>
                </div>
                <div className="service-name">{service.name}</div>
                <div className="service-description">{service.description}</div>
                <div className="service-checkbox">
                  {celebration.services.includes(service.id) ? '✓' : '+'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Special Requirements */}
      {celebration.type && (
        <motion.div
          className="special-requirements"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4>Special Requirements & Notes</h4>
          <textarea
            placeholder="Any special requests, dietary requirements, timing preferences, or other details we should know..."
            value={celebration.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            rows={4}
          />
        </motion.div>
      )}

      {/* Budget Range */}
      {celebration.type && (
        <motion.div
          className="budget-selection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4>Preferred Budget Range for Celebrations</h4>
          <div className="budget-options">
            {['5000-10000', '10000-20000', '20000-50000', 'custom'].map((range) => (
              <motion.button
                key={range}
                className={`budget-btn ${celebration.budget === range ? 'selected' : ''}`}
                onClick={() => handleBudgetChange(range)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {range === 'custom' ? 'Custom Budget' : `₹${range.replace('-', ' - ')}`}
              </motion.button>
            ))}
          </div>
          
          {celebration.budget === 'custom' && (
            <motion.div
              className="custom-budget"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <input
                type="number"
                placeholder="Enter your budget"
                onChange={(e) => handleBudgetChange(e.target.value)}
              />
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Service Summary */}
      {celebration.services.length > 0 && (
        <motion.div
          className="service-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4>Selected Services Summary</h4>
          <div className="summary-items">
            {celebration.services.map((serviceId) => {
              const service = additionalServices.find(s => s.id === serviceId);
              return service ? (
                <div key={serviceId} className="summary-item">
                  <span className="summary-icon">{service.icon}</span>
                  <span className="summary-name">{service.name}</span>
                  <span className="summary-price">₹{service.price}</span>
                </div>
              ) : null;
            })}
          </div>
          
          <div className="total-charges">
            <strong>Total Service Charges: ₹{getTotalServiceCharges().toLocaleString()}</strong>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CelebrationAdd;
