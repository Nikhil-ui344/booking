import { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = ({ customer, onCustomerChange, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!customer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!customer.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(customer.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    onCustomerChange({
      ...customer,
      [field]: value
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit();
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form">
      <div className="form-header">
        <h3 className="section-title">Contact Information</h3>
        <p className="section-subtitle">
          We'll use this information to confirm your booking and send updates
        </p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-grid">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
              value={customer.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
              value={customer.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="Enter your 10-digit phone number"
              value={customer.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {/* Special Requests Field */}
          <div className="form-group full-width">
            <label htmlFor="requests" className="form-label">
              Special Requests (Optional)
            </label>
            <textarea
              id="requests"
              className="form-textarea"
              placeholder="Any special requirements, dietary restrictions, accessibility needs, or other requests..."
              value={customer.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="contact-preferences">
          <h4>Contact Preferences</h4>
          <div className="preference-options">
            <div className="preference-item">
              <span className="preference-icon">📧</span>
              <div className="preference-info">
                <strong>Email Updates</strong>
                <span>Booking confirmations and updates via email</span>
              </div>
            </div>
            <div className="preference-item">
              <span className="preference-icon">📱</span>
              <div className="preference-info">
                <strong>SMS Notifications</strong>
                <span>Important alerts and reminders via SMS</span>
              </div>
            </div>
            <div className="preference-item">
              <span className="preference-icon">📞</span>
              <div className="preference-info">
                <strong>Phone Support</strong>
                <span>We may call to confirm details and arrangements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="booking-terms">
          <h4>Booking Terms & Conditions</h4>
          <div className="terms-list">
            <div className="term-item">
              <span className="term-icon">✅</span>
              <span>25% advance payment required to confirm booking</span>
            </div>
            <div className="term-item">
              <span className="term-icon">✅</span>
              <span>Free cancellation up to 48 hours before check-in</span>
            </div>
            <div className="term-item">
              <span className="term-icon">✅</span>
              <span>Balance payment can be made during check-in</span>
            </div>
            <div className="term-item">
              <span className="term-icon">✅</span>
              <span>All prices include taxes and basic amenities</span>
            </div>
          </div>
        </div>

        {/* Consent & Agreement */}
        <div className="consent-section">
          <div className="consent-item">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <span className="link">Terms & Conditions</span> and <span className="link">Privacy Policy</span>
            </label>
          </div>
          <div className="consent-item">
            <input type="checkbox" id="updates" />
            <label htmlFor="updates">
              I would like to receive updates about special offers and new properties
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="submit-booking-btn"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <div className="loading-content">
              <div className="spinner"></div>
              <span>Submitting Booking...</span>
            </div>
          ) : (
            <div className="button-content">
              <span>Confirm Booking</span>
              <span className="button-icon">🎉</span>
            </div>
          )}
        </motion.button>

        {/* Support Info */}
        <div className="support-info">
          <h4>Need Help?</h4>
          <div className="support-options">
            <div className="support-item">
              <span className="support-icon">📞</span>
              <span>Call us: +91 12345 67890</span>
            </div>
            <div className="support-item">
              <span className="support-icon">💬</span>
              <span>WhatsApp: +91 12345 67890</span>
            </div>
            <div className="support-item">
              <span className="support-icon">📧</span>
              <span>Email: bookings@relaxingretreats.com</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
