import { motion } from 'framer-motion';
import './LoadingAnimation.css';

const LoadingAnimation = ({ type = 'page', message = 'Loading...' }) => {
  const containerVariants = {
    start: { opacity: 1 },
    end: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const dotVariants = {
    start: { y: "0%" },
    end: {
      y: ["0%", "-50%", "0%"],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const skeletonVariants = {
    start: { opacity: 0.6 },
    end: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (type === 'skeleton') {
    return (
      <div className="skeleton-container">
        <motion.div
          className="skeleton-header"
          variants={skeletonVariants}
          initial="start"
          animate="end"
        />
        <div className="skeleton-content">
          <motion.div
            className="skeleton-line long"
            variants={skeletonVariants}
            initial="start"
            animate="end"
          />
          <motion.div
            className="skeleton-line medium"
            variants={skeletonVariants}
            initial="start"
            animate="end"
          />
          <motion.div
            className="skeleton-line short"
            variants={skeletonVariants}
            initial="start"
            animate="end"
          />
        </div>
      </div>
    );
  }

  if (type === 'spinner') {
    return (
      <div className="spinner-container">
        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <p className="loading-message">{message}</p>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <motion.div
        className="loading-dots"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        <motion.div className="dot" variants={dotVariants} />
        <motion.div className="dot" variants={dotVariants} />
        <motion.div className="dot" variants={dotVariants} />
      </motion.div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingAnimation;
