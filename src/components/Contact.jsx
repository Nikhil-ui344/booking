import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <motion.div
          className="contact-header text-center"
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          ref={ref}
        >
          <h2 className="section-title">Plan Your Dream Trip</h2>
          <p className="section-subtitle">
            Ready to explore? Get in touch and let us create the perfect itinerary for you
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-form-section"
            variants={formVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="form-container">
              <h3 className="form-title">Send us a message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Destination</option>
                    <option value="coorg">Coorg</option>
                    <option value="udupi">Udupi</option>
                    <option value="goa">Goa</option>
                    <option value="kerala">Kerala</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Tell us about your dream trip..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="form-textarea"
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="submit-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Plan My Trip
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="contact-info-section"
            variants={infoVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="info-container">
              <h3 className="info-title">Get in Touch</h3>
              
              <div className="contact-methods">
                <motion.div 
                  className="contact-method"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="method-icon">📧</div>
                  <div className="method-content">
                    <h4>Email Us</h4>
                    <p>hello@relaxingretreats.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-method"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="method-icon">📞</div>
                  <div className="method-content">
                    <h4>Call Us</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-method"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="method-icon">💬</div>
                  <div className="method-content">
                    <h4>WhatsApp</h4>
                    <p>+91 98765 43210</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="contact-method"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="method-icon">📍</div>
                  <div className="method-content">
                    <h4>Visit Us</h4>
                    <p>Bangalore, Karnataka</p>
                  </div>
                </motion.div>
              </div>

              <div className="quick-booking">
                <h4>Quick Booking</h4>
                <p>Need immediate assistance? Our travel experts are available 24/7</p>
                <motion.button
                  className="quick-call-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
