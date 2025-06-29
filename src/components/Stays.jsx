import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BookingModal from './BookingModal';
import './Stays.css';

const Stays = ({ selectedDestination, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedStay, setSelectedStay] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Sample stays data
  const staysData = [
    // Coorg Stays
    {
      id: 1,
      name: "Coffee Estate Villa",
      location: "Coorg",
      type: "Villa",
      price: 8500,
      rating: 4.8,
      reviews: 124,
      image: "coorg-villa",
      amenities: ["Coffee Plantation", "Mountain View", "Free WiFi", "Breakfast"],
      description: "Luxurious villa nestled in a working coffee plantation with panoramic mountain views and authentic Kodava hospitality.",
      capacity: "4 Guests",
      bedrooms: 2,
      bathrooms: 2
    },
    {
      id: 2,
      name: "Misty Hills Resort",
      location: "Coorg",
      type: "Resort",
      price: 12000,
      rating: 4.9,
      reviews: 89,
      image: "coorg-resort",
      amenities: ["Spa", "Pool", "Adventure Sports", "Restaurant"],
      description: "Premium resort offering world-class amenities amidst the misty hills of Coorg with adventure activities and spa treatments.",
      capacity: "6 Guests",
      bedrooms: 3,
      bathrooms: 3
    },
    {
      id: 3,
      name: "Bamboo Cottage Retreat",
      location: "Coorg",
      type: "Cottage",
      price: 4500,
      rating: 4.6,
      reviews: 156,
      image: "coorg-cottage",
      amenities: ["Eco-Friendly", "Nature Walk", "Bonfire", "Organic Food"],
      description: "Sustainable bamboo cottages perfect for nature lovers seeking tranquility and eco-friendly accommodation.",
      capacity: "2 Guests",
      bedrooms: 1,
      bathrooms: 1
    },
    // Udupi Stays
    {
      id: 4,
      name: "Temple Heritage Hotel",
      location: "Udupi",
      type: "Heritage Hotel",
      price: 6500,
      rating: 4.7,
      reviews: 98,
      image: "udupi-heritage",
      amenities: ["Temple Tours", "Traditional Cuisine", "Cultural Shows", "AC"],
      description: "Traditional heritage hotel near famous Udupi temples offering authentic South Indian hospitality and cuisine.",
      capacity: "4 Guests",
      bedrooms: 2,
      bathrooms: 2
    },
    {
      id: 5,
      name: "Beachfront Paradise Resort",
      location: "Udupi",
      type: "Beach Resort",
      price: 9500,
      rating: 4.8,
      reviews: 142,
      image: "udupi-beach",
      amenities: ["Beach Access", "Water Sports", "Ayurveda Center", "Beach Bar"],
      description: "Stunning beachfront resort with pristine beaches, water sports, and rejuvenating Ayurvedic treatments.",
      capacity: "5 Guests",
      bedrooms: 2,
      bathrooms: 2
    },
    {
      id: 6,
      name: "Coastal Homestay",
      location: "Udupi",
      type: "Homestay",
      price: 3500,
      rating: 4.5,
      reviews: 67,
      image: "udupi-homestay",
      amenities: ["Home Cooked Meals", "Local Guide", "Fishing", "Bicycle"],
      description: "Authentic coastal homestay experience with home-cooked meals and local cultural immersion.",
      capacity: "3 Guests",
      bedrooms: 1,
      bathrooms: 1
    },
    // Additional destinations
    {
      id: 7,
      name: "Goa Beach Villa",
      location: "Goa",
      type: "Villa",
      price: 15000,
      rating: 4.9,
      reviews: 203,
      image: "goa-villa",
      amenities: ["Private Beach", "Pool", "BBQ Area", "Party Deck"],
      description: "Exclusive beachfront villa with private beach access, infinity pool, and perfect for group celebrations.",
      capacity: "8 Guests",
      bedrooms: 4,
      bathrooms: 4
    },
    {
      id: 8,
      name: "Kerala Backwater Houseboat",
      location: "Kerala",
      type: "Houseboat",
      price: 7500,
      rating: 4.8,
      reviews: 156,
      image: "kerala-houseboat",
      amenities: ["Backwater Cruise", "Traditional Meals", "Fishing", "Sunset View"],
      description: "Traditional Kerala houseboat experience through serene backwaters with authentic cuisine and cultural activities.",
      capacity: "4 Guests",
      bedrooms: 2,
      bathrooms: 2
    }
  ];

  const handleBookNow = (stay) => {
    setSelectedStay(stay);
    setIsBookingModalOpen(true);
  };

  const handleBookingModalClose = () => {
    setIsBookingModalOpen(false);
    setSelectedStay(null);
  };

  // Filter stays based on selected destination
  const getFilteredStays = () => {
    let filtered = staysData;

    // Filter by destination
    if (selectedDestination && selectedDestination !== 'Explore All') {
      filtered = filtered.filter(stay => stay.location === selectedDestination);
    }

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(stay => stay.type.toLowerCase().includes(filter.toLowerCase()));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(stay => 
        stay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stay.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stay.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'budget':
          filtered = filtered.filter(stay => stay.price <= 5000);
          break;
        case 'mid':
          filtered = filtered.filter(stay => stay.price > 5000 && stay.price <= 10000);
          break;
        case 'luxury':
          filtered = filtered.filter(stay => stay.price > 10000);
          break;
      }
    }

    return filtered;
  };

  const filteredStays = getFilteredStays();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="stays-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="stays-modal"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="stays-header">
            <motion.h2
              className="stays-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {selectedDestination === 'Explore All' ? 'All Destinations' : `Stays in ${selectedDestination}`}
            </motion.h2>
            <motion.button
              className="close-button"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </div>

          {/* Filters */}
          <motion.div
            className="stays-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="filter-group">
              <input
                type="text"
                placeholder="Search stays..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="villa">Villa</option>
                <option value="resort">Resort</option>
                <option value="cottage">Cottage</option>
                <option value="homestay">Homestay</option>
                <option value="heritage">Heritage</option>
                <option value="houseboat">Houseboat</option>
              </select>
            </div>

            <div className="filter-group">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (Under ₹5,000)</option>
                <option value="mid">Mid-range (₹5,000 - ₹10,000)</option>
                <option value="luxury">Luxury (Above ₹10,000)</option>
              </select>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            className="stays-content"
            ref={ref}
          >
            <motion.div
              className="results-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Found {filteredStays.length} stays
            </motion.div>

            <motion.div
              className="stays-grid"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {filteredStays.map((stay) => (
                <motion.div
                  key={stay.id}
                  className="stay-card"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={`stay-image ${stay.image}`}>
                    <div className="stay-overlay">
                      <span className="stay-type">{stay.type}</span>
                      <span className="stay-location">📍 {stay.location}</span>
                    </div>
                  </div>

                  <div className="stay-details">
                    <div className="stay-header-info">
                      <h3 className="stay-name">{stay.name}</h3>
                      <div className="stay-rating">
                        <span className="rating-score">⭐ {stay.rating}</span>
                        <span className="rating-reviews">({stay.reviews} reviews)</span>
                      </div>
                    </div>

                    <p className="stay-description">{stay.description}</p>

                    <div className="stay-capacity">
                      <span>👥 {stay.capacity}</span>
                      <span>🛏️ {stay.bedrooms} Bedrooms</span>
                      <span>🚿 {stay.bathrooms} Bathrooms</span>
                    </div>

                    <div className="stay-amenities">
                      {stay.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity}</span>
                      ))}
                      {stay.amenities.length > 3 && (
                        <span className="amenity-more">+{stay.amenities.length - 3} more</span>
                      )}
                    </div>

                    <div className="stay-footer">
                      <div className="stay-price">
                        <span className="price-amount">₹{stay.price.toLocaleString()}</span>
                        <span className="price-period">/ night</span>
                      </div>
                      <motion.button
                        className="book-button"
                        onClick={() => handleBookNow(stay)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredStays.length === 0 && (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3>No stays found</h3>
                <p>Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Booking Modal */}
        <BookingModal
          stay={selectedStay}
          isOpen={isBookingModalOpen}
          onClose={handleBookingModalClose}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Stays;
