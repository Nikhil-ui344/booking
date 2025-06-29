import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Gallery.css';

const Gallery = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Gallery locations with their photos
  const galleryLocations = [
    {
      id: 1,
      name: 'Coorg',
      bgClass: 'coorg-location',
      photos: [
        { id: 1, title: 'Kumara Parvatha Peak', src: '/src/assets/images/Kumara Parvatha Hill.jpeg' },
        { id: 2, title: 'Coffee Plantations', bgClass: 'coorg-coffee' },
        { id: 3, title: 'Misty Hills', bgClass: 'coorg-hills' },
        { id: 4, title: 'Abbey Falls', bgClass: 'coorg-falls' }
      ]
    },
    {
      id: 2,
      name: 'Udupi',
      bgClass: 'udupi-location',
      photos: [
        { id: 1, title: 'Udupi Temple', src: '/src/assets/images/udupi.jpeg' },
        { id: 2, title: 'Malpe Beach', bgClass: 'udupi-beach' },
        { id: 3, title: 'Krishna Temple', bgClass: 'udupi-temple' },
        { id: 4, title: 'Coastal Views', bgClass: 'udupi-coast' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="gallery" className="gallery section-padding">
      <div className="container">
        <motion.div
          className="gallery-header text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">
            Discover beautiful moments from our destinations
          </p>
        </motion.div>

        <motion.div
          className="gallery-locations"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {galleryLocations.map((location) => (
            <motion.div
              key={location.id}
              className={`location-card ${location.bgClass}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="location-overlay">
                <div className="location-content">
                  <h3 className="location-name">{location.name}</h3>
                  <span className="photo-count">{location.photos.length} Photos</span>
                  <div className="view-icon">�</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="gallery-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              className="gallery-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{selectedLocation.name} Gallery</h3>
                <button
                  className="modal-close"
                  onClick={() => setSelectedLocation(null)}
                >
                  ✕
                </button>
              </div>
              
              <div className="photos-grid">
                {selectedLocation.photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    className={`photo-item ${photo.bgClass || ''}`}
                    variants={photoVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {photo.src ? (
                      <img src={photo.src} alt={photo.title} />
                    ) : (
                      <div className="photo-placeholder" />
                    )}
                    <div className="photo-overlay">
                      <span className="photo-title">{photo.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
