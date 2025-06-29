import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Sample gallery images with placeholder backgrounds
  const galleryImages = [
    {
      id: 1,
      title: 'Coorg Hills',
      category: 'Nature',
      bgClass: 'gallery-img-1'
    },
    {
      id: 2,
      title: 'Beach Paradise',
      category: 'Beach',
      bgClass: 'gallery-img-2'
    },
    {
      id: 3,
      title: 'Temple Architecture',
      category: 'Culture',
      bgClass: 'gallery-img-3'
    },
    {
      id: 4,
      title: 'Mountain Views',
      category: 'Adventure',
      bgClass: 'gallery-img-4'
    },
    {
      id: 5,
      title: 'Local Cuisine',
      category: 'Food',
      bgClass: 'gallery-img-5'
    },
    {
      id: 6,
      title: 'Traditional Dance',
      category: 'Culture',
      bgClass: 'gallery-img-6'
    },
    {
      id: 7,
      title: 'Sunset Views',
      category: 'Nature',
      bgClass: 'gallery-img-7'
    },
    {
      id: 8,
      title: 'Adventure Sports',
      category: 'Adventure',
      bgClass: 'gallery-img-8'
    }
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
    hidden: { opacity: 0, scale: 0.8, y: 30 },
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

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <section id="gallery" className="gallery section-padding">
      <div className="container">
        <motion.div
          className="gallery-header text-center"
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          ref={ref}
        >
          <h2 className="section-title">Travel Gallery</h2>
          <p className="section-subtitle">
            Explore stunning moments captured from our amazing destinations
          </p>
        </motion.div>

        <motion.div
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={`gallery-item ${image.bgClass}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="gallery-overlay">
                <div className="gallery-content">
                  <span className="gallery-category">{image.category}</span>
                  <h3 className="gallery-title">{image.title}</h3>
                  <div className="gallery-icon">🔍</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`lightbox-image ${selectedImage.bgClass}`}>
                <button
                  className="lightbox-close"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
                <div className="lightbox-info">
                  <span className="lightbox-category">{selectedImage.category}</span>
                  <h3 className="lightbox-title">{selectedImage.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
