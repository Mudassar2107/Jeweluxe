import React from 'react';
import { motion } from 'framer-motion';
import './styles/About.css';

const About = () => {
  return (
    <div className="about-section">
      <div className="about-container">
        <motion.div className="about-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about-heading">About Jeweluxe</h2>
          <div className="about-divider"></div>
        </motion.div>

        <div className="about-content">
          <motion.div className="about-image-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src={process.env.PUBLIC_URL + '/images/p1.jpg'} 
              alt="Luxury Jewelry" 
              className="about-image" 
            />
          </motion.div>

          <div className="about-text-section">
            <motion.p className="about-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Welcome to Jeweluxe, where elegance meets artistry. Our journey began with a passion for creating exquisite jewelry that transcends time and trends.
            </motion.p>

            <motion.p className="about-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              At Jeweluxe, we believe that every piece of jewelry tells a unique story. Our master craftsmen combine traditional techniques with contemporary design to create pieces that are both timeless and modern.
            </motion.p>

            <motion.div className="about-features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="feature">
                <h3>Quality</h3>
                <p>Finest materials and craftsmanship</p>
              </div>
              <div className="feature">
                <h3>Design</h3>
                <p>Unique and timeless pieces</p>
              </div>
              <div className="feature">
                <h3>Service</h3>
                <p>Personalized experience</p>
              </div>
            </motion.div>

            <motion.p className="about-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Join us in our pursuit of excellence, where each piece is crafted to become a cherished part of your story.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;