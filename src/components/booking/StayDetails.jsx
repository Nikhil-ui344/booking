import { useState } from 'react';
import { motion } from 'framer-motion';
import './StayDetails.css';

const StayDetails = ({ stay, onNext }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample images for each stay (in a real app, this would come from the stay data)
  const getStayImages = (stayType) => {
    const imageMap = {
      'coorg-villa': [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
      ],
      'coorg-resort': [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop'
      ],
      default: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
      ]
    };
    
    return imageMap[stay.image] || imageMap.default;
  };

  const images = getStayImages(stay.image);

  return (
    <div className="stay-details">
      {/* Image Gallery */}
      <div className="stay-gallery">
        <div className="main-image">
          <img 
            src={images[selectedImageIndex]} 
            alt={stay.name}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
            }}
          />
          <div className="image-counter">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
        
        <div className="thumbnail-grid">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img 
                src={image} 
                alt={`${stay.name} ${index + 1}`}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stay Information */}
      <div className="stay-info">
        <div className="stay-header">
          <div className="stay-title-section">
            <h2 className="stay-name">{stay.name}</h2>
            <div className="stay-location">
              <span className="location-icon">📍</span>
              {stay.location}
            </div>
          </div>
          
          <div className="stay-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(stay.rating) ? 'star filled' : 'star'}>
                  ⭐
                </span>
              ))}
              <span className="rating-number">{stay.rating}</span>
            </div>
            <div className="review-count">({stay.reviews} reviews)</div>
          </div>
        </div>

        <div className="stay-details-grid">
          <div className="detail-card">
            <h3>Property Details</h3>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-icon">🏠</span>
                <span>{stay.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">👥</span>
                <span>{stay.capacity}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🛏️</span>
                <span>{stay.bedrooms} Bedrooms</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🚿</span>
                <span>{stay.bathrooms} Bathrooms</span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h3>Pricing</h3>
            <div className="pricing-info">
              <div className="price-display">
                <span className="price">₹{stay.price.toLocaleString()}</span>
                <span className="price-unit">per night</span>
              </div>
              <div className="price-note">
                *Additional charges may apply for extra guests
              </div>
            </div>
          </div>
        </div>

        <div className="stay-description">
          <h3>About this place</h3>
          <p>{stay.description}</p>
        </div>

        <div className="amenities-section">
          <h3>Amenities</h3>
          <div className="amenities-grid">
            {stay.amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                <span className="amenity-icon">✨</span>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="host-info">
          <h3>Your Host</h3>
          <div className="host-card">
            <div className="host-avatar">
              <span>🏠</span>
            </div>
            <div className="host-details">
              <div className="host-name">Relaxing Retreats</div>
              <div className="host-description">
                Professional hospitality team dedicated to creating memorable experiences
              </div>
            </div>
          </div>
        </div>

        <div className="policies-section">
          <h3>House Rules & Policies</h3>
          <div className="policies-grid">
            <div className="policy-item">
              <span className="policy-icon">⏰</span>
              <div>
                <strong>Check-in:</strong> 2:00 PM - 8:00 PM<br />
                <strong>Check-out:</strong> 11:00 AM
              </div>
            </div>
            <div className="policy-item">
              <span className="policy-icon">🚭</span>
              <div>No smoking inside the property</div>
            </div>
            <div className="policy-item">
              <span className="policy-icon">🎉</span>
              <div>Events and parties allowed with prior notice</div>
            </div>
            <div className="policy-item">
              <span className="policy-icon">❌</span>
              <div>Free cancellation up to 48 hours before check-in</div>
            </div>
          </div>
        </div>

        <motion.button 
          className="continue-booking-btn"
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue to Booking
        </motion.button>
      </div>
    </div>
  );
};

export default StayDetails;
