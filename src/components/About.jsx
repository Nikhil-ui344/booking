import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <div className="about-content" ref={ref}>
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="about-image-placeholder">
              {/* Placeholder for about image */}
              <div className="image-overlay">
                <motion.div
                  className="floating-card"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="card-content">
                    <h3 className="card-title">Explore the World</h3>
                    <span className="card-text">Happy Travelers</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <motion.h2
              className="about-title"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Creating Unforgettable
              <span className="title-highlight"> Travel Experiences</span>
            </motion.h2>

            <motion.p
              className="about-description"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We specialize in crafting personalized journeys with authentic experiences, 
              breathtaking landscapes, and memorable celebrations for your special moments.
            </motion.p>

            <motion.div
              className="about-features"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="feature-item">
                <div className="feature-icon">🗺️</div>
                <div className="feature-content">
                  <h4>Expert Planning</h4>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">⭐</div>
                <div className="feature-content">
                  <h4>Premium Service</h4>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🌟</div>
                <div className="feature-content">
                  <h4>Unique Experiences</h4>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🎉</div>
                <div className="feature-content">
                  <h4>Special Events</h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="about-cta"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Plan Your Trip
              </motion.a>
              
              <motion.a
                href="#gallery"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Gallery
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
