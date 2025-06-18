import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './styles/Navbar.css';

const Navbar = ({ onAuthClick, isAuthenticated, username }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user, logout } = useAuth0();

  const handleNavigation = (path) => {
    if (path === '/') {
      // Always navigate to home page first
      navigate(path);
      // If already on home page, scroll to top
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('/');
      }
    } else if (isHomePage && (path === '/products' || path === '/about')) {
      // If on home page, scroll to section instead of navigating
      const sectionId = path.substring(1) + '-section'; // Remove leading slash
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80; // Offset for navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveSection(path); // Update active section directly
      }
    } else {
      // Navigate to other pages
      navigate(path);
      setActiveSection(path);
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  // Detect active section on scroll when on home page
  useEffect(() => {
    if (!isHomePage) {
      // If not on homepage, active section is current path
      setActiveSection(location.pathname);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Get all section elements
      const homeSection = document.getElementById('home-section');
      const productsSection = document.getElementById('products-section');
      const aboutSection = document.getElementById('about-section');
      
      // Determine which section is currently in view
      if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection('/about');
      } else if (productsSection && scrollPosition >= productsSection.offsetTop) {
        setActiveSection('/products');
      } else if (homeSection) {
        setActiveSection('/');
      }
    };

    // Set initial active section
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage, location.pathname]);

  return (
    <nav className="nav">
      <div 
        className={`logo ${activeSection === '/' ? 'active' : ''}`} 
        onClick={() => handleNavigation('/')}
      >
        💍Jeweluxe
      </div>

      {/* Mobile menu button */}
      <button 
        className="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
        <button 
          className={`nav-link ${activeSection === '/' ? 'active' : ''}`}
          onClick={() => handleNavigation('/')}
        >
          Home
        </button>
        <button 
          className={`nav-link ${activeSection === '/products' ? 'active' : ''}`}
          onClick={() => handleNavigation('/products')}
        >
          Products
        </button>
        <button 
          className={`nav-link ${activeSection === '/about' ? 'active' : ''}`}
          onClick={() => handleNavigation('/about')}
        >
          About Us
        </button>
        <button 
          className={`nav-link ${activeSection === '/profile' ? 'active' : ''}`}
          onClick={() => handleNavigation('/profile')}
        >
          Profile
        </button>
        <button 
          className={`cart-button ${activeSection === '/cart' ? 'active' : ''}`}
          onClick={() => handleNavigation('/cart')}
        >
          <FaShoppingCart size={20} />
        </button>
        {isAuthenticated ? (
          <>
            <button className="auth-button" onClick={onAuthClick}>
              <div className="user-profile">
                {user?.picture ? (
                  <img src={user.picture} alt="Profile" className="user-avatar" />
                ) : (
                  <FaUserCircle size={18} />
                )}
                <span className="user-name">{user?.name?.split(' ')[0] || 'Profile'}</span>
              </div>
            </button>
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt size={16} />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <button className="auth-button" onClick={onAuthClick}>
            Sign In / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
