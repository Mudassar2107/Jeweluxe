import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/Home.css';
import { pageTransition } from './styles/pageTransition';
import Products from './Products';
import About from './About';

const media = [
  { type: 'image', src: `${process.env.PUBLIC_URL}/sample1.png` },
  { type: 'image', src: `${process.env.PUBLIC_URL}/sample2.png` },
  { type: 'video', src: `${process.env.PUBLIC_URL}/sample3.mp4` },
];

// Typing animation with blinking cursor and optional looping
const TypingText = ({ text, loop = true }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else if (loop) {
      const resetTimeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [index, text, loop]);

  return (
    <h2 className="home-heading">
      {displayedText}
      <span className="cursor">|</span>
    </h2>
  );
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const homeRef = useRef(null);
  const productsRef = useRef(null);
  const aboutRef = useRef(null);
  
  // Handle media carousel
  useEffect(() => {
    const duration = media[index].type === 'video' ? 8000 : 3000;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [index]);
  
  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Scroll to section functionality
  const scrollToSection = (sectionId) => {
    let ref;
    
    switch(sectionId) {
      case 'home':
        ref = homeRef;
        break;
      case 'products':
        ref = productsRef;
        break;
      case 'about':
        ref = aboutRef;
        break;
      default:
        ref = homeRef;
    }
    
    if (ref && ref.current) {
      const yOffset = -80; // Navbar height
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    
    setActiveSection(sectionId);
  };
  
  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop) {
        setActiveSection('about');
      } else if (productsRef.current && scrollPosition >= productsRef.current.offsetTop) {
        setActiveSection('products');
      } else {
        setActiveSection('home');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="full-page-container">
      {/* Navigation dots */}
      <div className="scroll-indicator">
        <button 
          className={`scroll-dot ${activeSection === 'home' ? 'active' : ''}`} 
          onClick={() => scrollToSection('home')}
          aria-label="Scroll to Home section"
        />
        <button 
          className={`scroll-dot ${activeSection === 'products' ? 'active' : ''}`} 
          onClick={() => scrollToSection('products')}
          aria-label="Scroll to Products section"
        />
        <button 
          className={`scroll-dot ${activeSection === 'about' ? 'active' : ''}`} 
          onClick={() => scrollToSection('about')}
          aria-label="Scroll to About section"
        />
      </div>
      
      {/* Home section */}
      <section 
        className="home-section" 
        ref={homeRef}
        id="home-section"
      >
        <motion.div
          className="home-container"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <TypingText text="Shine with The Finest Pieces of Jewelry" loop={true} />

          <div className="media-wrapper">
            <AnimatePresence mode="wait">
              {media[index].type === 'image' ? (
                <motion.img
                  key={media[index].src}
                  src={media[index].src}
                  alt="Jewelry"
                  className="media-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => {
                    console.error('Image loading error:', e);
                    console.log('Failed image source:', media[index].src);
                  }}
                />
              ) : (
                <motion.video
                  key={media[index].src}
                  src={media[index].src}
                  className="media-image"
                  autoPlay
                  muted
                  playsInline
                  controls
                  loop
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onError={(e) => {
                    console.error('Video loading error:', e);
                    console.log('Failed video source:', media[index].src);
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          
          <motion.button 
            className="scroll-down-button"
            onClick={() => scrollToSection('products')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore Our Collection
            <span className="scroll-arrow">↓</span>
          </motion.button>
        </motion.div>
      </section>

      {/* Products section */}
      <section 
        className="section-wrapper" 
        ref={productsRef}
        id="products-section"
      >
        <Products />
      </section>

      {/* About section */}
      <section 
        className="section-wrapper" 
        ref={aboutRef}
        id="about-section"
      >
        <About />
      </section>
    </div>
  );
};

export default Home;
