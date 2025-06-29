import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Testimonials.css';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Absolutely incredible experience! The team organized everything perfectly, from accommodation to local guides. Our trip to Coorg was magical.",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Mumbai, India",
      rating: 5,
      text: "Professional service and attention to detail. They understood exactly what we wanted and delivered beyond expectations. Highly recommended!",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "Singapore",
      rating: 5,
      text: "The personalized itinerary was perfect for our family. Kids loved every moment, and we discovered hidden gems we never would have found ourselves.",
      avatar: "👩‍🏫"
    },
    {
      id: 4,
      name: "David Miller",
      location: "London, UK",
      rating: 5,
      text: "Exceptional value for money. Every destination was carefully selected, and the local experiences were authentic and memorable.",
      avatar: "👨‍⚕️"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
    <section id="testimonials" className="testimonials section-padding">
      <div className="container">
        <motion.div
          className="testimonials-header text-center"
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          ref={ref}
        >
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">
            Real experiences from real travelers who trusted us with their adventures
          </p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="testimonial-content">
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <blockquote className="testimonial-text">
                  "{testimonial.text}"
                </blockquote>
              </div>
              
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span className="avatar-emoji">{testimonial.avatar}</span>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-location">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="testimonials-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Destinations</span>
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
