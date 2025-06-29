import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Stays from './Stays';
import './Destinations.css';

const Destinations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showStays, setShowStays] = useState(false);

  const destinations = [
    {
      id: 1,
      title: 'Coorg',
      subtitle: 'Coffee Capital of India',
      description: 'Experience the misty hills, coffee plantations, and scenic waterfalls of Karnataka\'s hill station.',
      image: 'coorg-bg', // CSS class for background
      stayCount: '25+ Stays Available'
    },
    {
      id: 2,
      title: 'Udupi',
      subtitle: 'Temple Town & Beach Paradise',
      description: 'Discover ancient temples, pristine beaches, and authentic South Indian cuisine.',
      image: 'udupi-bg', // CSS class for background
      stayCount: '18+ Stays Available'
    },
    {
      id: 3,
      title: 'Explore All',
      subtitle: 'Endless Adventures Await',
      description: 'Browse our complete collection of handpicked destinations across India.',
      image: 'explore-bg', // CSS class for background
      stayCount: '50+ Stays Available'
    }
  ];

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination.title);
    setShowStays(true);
  };

  const handleCloseStays = () => {
    setShowStays(false);
    setSelectedDestination(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="destinations" className="destinations section-padding">
      <div className="container">
        <motion.div
          className="destinations-header text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">
            Choose your perfect getaway from our carefully curated destinations
          </p>
        </motion.div>

        <motion.div
          className="destinations-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              className={`destination-card ${destination.image}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -15 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDestinationClick(destination)}
              style={{ cursor: 'pointer' }}
            >
              <div className="destination-overlay">
                <div className="destination-content">
                  <h3 className="destination-title">{destination.title}</h3>
                  <p className="destination-subtitle">{destination.subtitle}</p>
                  <p className="destination-description">{destination.description}</p>
                  <div className="destination-stats">
                    <span className="stay-count">{destination.stayCount}</span>
                  </div>
                  
                  <motion.button
                    className="btn btn-primary destination-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Stays
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stays Modal */}
      {showStays && (
        <Stays 
          selectedDestination={selectedDestination}
          onClose={handleCloseStays}
        />
      )}
    </section>
  );
};

export default Destinations;
