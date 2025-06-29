import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Absolutely incredible experience! Perfect organization and magical trip to Coorg.",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Mumbai, India",
      rating: 5,
      text: "Professional service and attention to detail. Highly recommended!",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "Singapore",
      rating: 5,
      text: "Perfect family itinerary. Kids loved every moment and we discovered hidden gems.",
      avatar: "👩‍🏫"
    },
    {
      id: 4,
      name: "David Miller",
      location: "London, UK",
      rating: 5,
      text: "Exceptional value. Every destination was carefully selected and memorable.",
      avatar: "👨‍⚕️"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [inView, testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="testimonials" className="testimonials section-padding">
      <div className="container">
        <motion.div
          className="testimonials-header text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <h2 className="section-title">What Our Travelers Say</h2>
        </motion.div>

        <motion.div
          className="testimonials-slider"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="slider-container">
            <button className="slider-btn prev-btn" onClick={prevSlide}>
              ‹
            </button>
            
            <div className="testimonial-display">
              <motion.div
                key={currentSlide}
                className="testimonial-card active"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="testimonial-content">
                  <div className="rating">
                    {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  <blockquote className="testimonial-text">
                    "{testimonials[currentSlide].text}"
                  </blockquote>
                </div>
                
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span className="avatar-emoji">{testimonials[currentSlide].avatar}</span>
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[currentSlide].name}</h4>
                    <p className="author-location">{testimonials[currentSlide].location}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <button className="slider-btn next-btn" onClick={nextSlide}>
              ›
            </button>
          </div>

          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="testimonials-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.9</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
