import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import './Celebrations.css';

const Celebrations = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedPackage, setSelectedPackage] = useState(null);

  const celebrationServices = [
    {
      id: 1,
      title: "Birthday Celebrations",
      icon: "🎂",
      description: "Make your special day unforgettable with personalized birthday setups",
      features: [
        "Custom cake arrangements",
        "Birthday decorations",
        "Surprise setup",
        "Photography assistance",
        "Special dining arrangements"
      ],
      image: "birthday-bg"
    },
    {
      id: 2,
      title: "Anniversary Packages",
      icon: "💕",
      description: "Romantic celebrations for your precious moments together",
      features: [
        "Romantic room decoration",
        "Couple's spa treatment",
        "Candlelight dinner",
        "Flower arrangements",
        "Personalized gifts"
      ],
      image: "anniversary-bg"
    },
    {
      id: 3,
      title: "Proposal Setup",
      icon: "💍",
      description: "Create the perfect moment for your proposal",
      features: [
        "Romantic venue setup",
        "Professional photography",
        "Surprise coordination",
        "Flower petals & lighting",
        "Celebration dinner"
      ],
      image: "proposal-bg"
    },
    {
      id: 4,
      title: "Family Gatherings",
      icon: "👨‍👩‍👧‍👦",
      description: "Perfect arrangements for family celebrations and reunions",
      features: [
        "Group activity coordination",
        "Family photo sessions",
        "Traditional decorations",
        "Multi-cuisine arrangements",
        "Kids entertainment"
      ],
      image: "family-bg"
    },
    {
      id: 5,
      title: "Corporate Events",
      icon: "🏢",
      description: "Professional event planning for business celebrations",
      features: [
        "Team building activities",
        "Conference arrangements",
        "Corporate branding",
        "Catering services",
        "Audio-visual setup"
      ],
      image: "corporate-bg"
    },
    {
      id: 6,
      title: "Custom Celebrations",
      icon: "🎉",
      description: "Tailored celebrations for any special occasion",
      features: [
        "Personalized themes",
        "Custom decorations",
        "Specialty cakes",
        "Entertainment arrangements",
        "Memory documentation"
      ],
      image: "custom-bg"
    }
  ];

  const additionalServices = [
    {
      icon: "🎈",
      title: "Decoration Services",
      description: "Professional decoration with balloons, flowers, and themed setups"
    },
    {
      icon: "🎁",
      title: "Gift Arrangements",
      description: "Curated gift selection and surprise delivery coordination"
    },
    {
      icon: "🍰",
      title: "Custom Cakes",
      description: "Fresh baked cakes with personalized designs and flavors"
    },
    {
      icon: "📸",
      title: "Photography",
      description: "Professional photography to capture your special moments"
    },
    {
      icon: "🎵",
      title: "Entertainment",
      description: "Live music, DJ services, and cultural performances"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const handlePackageClick = (celebrationPackage) => {
    setSelectedPackage(celebrationPackage);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };

  return (
    <section id="celebrations" className="celebrations section-padding">
      <div className="container">
        <motion.div
          className="celebrations-header text-center"
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          ref={ref}
        >
          <h2 className="section-title">Celebrate Special Moments</h2>
          <p className="section-subtitle">
            Make your stay extra special with our celebration services. From intimate anniversaries to grand family gatherings, we create unforgettable experiences.
          </p>
        </motion.div>

        <motion.div
          className="celebrations-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {celebrationServices.map((service) => (
            <motion.div
              key={service.id}
              className="celebration-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              onClick={() => handlePackageClick(service)}
            >
              <div className={`celebration-image ${service.image}`}>
                <div className="celebration-overlay">
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-price">{service.price}</div>
                </div>
              </div>

              <div className="celebration-content">
                <h3 className="celebration-title">{service.title}</h3>
                <p className="celebration-description">{service.description}</p>
                
                <div className="celebration-features">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="feature-tag">✓ {feature}</span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="feature-more">+{service.features.length - 3} more</span>
                  )}
                </div>

                <motion.button
                  className="celebration-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="additional-services"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="services-title">Additional Services We Provide</h3>
          <div className="services-grid">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                className="service-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="service-icon-large">{service.icon}</div>
                <h4 className="service-name">{service.title}</h4>
                <p className="service-desc">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="celebration-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="cta-content">
            <h3>Ready to Plan Your Celebration?</h3>
            <p>Contact us at least 48 hours in advance to arrange your special celebration</p>
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Plan My Celebration
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modal for package details */}
      {selectedPackage && (
        <motion.div
          className="celebration-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="celebration-modal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>{selectedPackage.title}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            
            <div className="modal-content">
              <div className="modal-icon">{selectedPackage.icon}</div>
              <p className="modal-description">{selectedPackage.description}</p>
              
              <div className="modal-features">
                <h4>What's Included:</h4>
                <ul>
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="modal-price">
                <span className="price-label">Price:</span>
                <span className="price-value">{selectedPackage.price}</span>
              </div>
              
              <div className="modal-actions">
                <button className="book-celebration-btn">Book This Package</button>
                <button className="customize-btn">Customize Package</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Celebrations;
