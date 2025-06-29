import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', url: '#', icon: '📘' },
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'YouTube', url: '#', icon: '📺' }
  ];

  const quickLinks = [
    { name: 'Home', url: '#home' },
    { name: 'Destinations', url: '#destinations' },
    { name: 'About Us', url: '#about' },
    { name: 'Gallery', url: '#gallery' },
    { name: 'Contact', url: '#contact' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    const email = e.target.email.value;
    console.log('Newsletter subscription:', email);
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-section footer-brand"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="footer-logo">Relaxing Retreats</h3>
            <p className="footer-description">
              Creating unforgettable travel experiences with personalized service and 
              expert local knowledge. Your adventure begins here.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={social.name}
                >
                  <span>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-section footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-nav">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a href={link.url} className="footer-link">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-section footer-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-title">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Sullia</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 9987654321</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>realaxngRetreatingbooking@gmail.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="footer-section footer-newsletter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-description">
              Subscribe to get exclusive travel deals and destination tips.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="newsletter-input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="newsletter-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; 2025 TravelBooking. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
