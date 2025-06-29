import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import About from './components/About';
import Celebrations from './components/Celebrations';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingAnimation from './components/LoadingAnimation';
import ScrollToTop from './components/ScrollToTop';
import './styles.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smooth scroll polyfill for better browser support
    if (window.CSS && CSS.supports('scroll-behavior', 'smooth')) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <div className="page-loading-overlay">
        <LoadingAnimation type="spinner" message="Welcome to your journey..." />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Destinations />
      <About />
      <Celebrations />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
