import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "How do I book a trip?",
      answer: "You can book a trip by browsing our destinations, selecting your preferred package, and clicking 'Book Now'. Fill out the booking form with your details and preferred dates. Our team will contact you within 24 hours to confirm your booking."
    },
    {
      question: "What is included in the celebration packages?",
      answer: "Our celebration packages include decorations, custom arrangements, photography assistance, and personalized setups. Specific inclusions vary by package type. Each package can be customized to your preferences and special requirements."
    },
    {
      question: "Can I customize my travel itinerary?",
      answer: "Absolutely! We specialize in creating personalized travel experiences. Contact our team to discuss your preferences, interests, and special requirements. We'll craft a custom itinerary that perfectly matches your needs."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer flexible cancellation policies. For trips, you can cancel up to 7 days before departure for a full refund. For celebrations, we require 48 hours notice. Special circumstances are handled on a case-by-case basis."
    },
    {
      question: "Do you provide 24/7 support during trips?",
      answer: "Yes! We provide round-the-clock support during your trip. Our team is available via phone, WhatsApp, or email to assist with any questions or emergencies that may arise during your journey."
    },
    {
      question: "Are group bookings available?",
      answer: "Yes, we offer special group packages for families, friends, and corporate teams. Group bookings come with discounted rates and can include additional services like group activities and dedicated coordinators."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-3 weeks in advance to ensure availability and better rates. For popular destinations during peak seasons, booking 4-6 weeks ahead is advisable. Last-minute bookings are also welcome based on availability."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, online bank transfers, UPI, and digital wallets. A small advance payment secures your booking, with the balance due before your trip."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="faq" className="faq section-padding">
      <div className="container">
        <motion.div
          className="faq-header text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
        >
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about our services
          </p>
        </motion.div>

        <motion.div
          className="faq-list"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              variants={itemVariants}
            >
              <motion.button
                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="question-text">{faq.question}</span>
                <motion.span
                  className="faq-icon"
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </motion.button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="faq-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3>Still have questions?</h3>
          <p>Our team is here to help you plan the perfect experience</p>
          <motion.a
            href="#contact"
            className="faq-contact-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
