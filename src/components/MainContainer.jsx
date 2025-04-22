import React from 'react';
import Home from './Home';
import Products from './Products';
import About from './About';
import './styles/global.css';

const MainContainer = () => {
  return (
    <div className="main-container">
      <section id="home" className="section">
        <Home />
      </section>
      
      <section id="products" className="section">
        <Products />
      </section>
      
      <section id="about" className="section">
        <About />
      </section>
    </div>
  );
};

export default MainContainer;