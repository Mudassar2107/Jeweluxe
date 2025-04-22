import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from 'framer-motion';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    // Close modal if authentication state changes
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginWithRedirect();
    } else {
      // For signup, redirect to Auth0 signup experience
      loginWithRedirect({
        authorizationParams: {
          screen_hint: "signup"
        }
      });
    }
  };

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin
      }
    });
    onClose();
  };

  if (isAuthenticated && user) {
    return (
      <div style={styles.overlay}>
        <motion.div 
          style={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <h2 style={styles.title}>Welcome, {user.name || user.email}</h2>
          <div style={styles.profileInfo}>
            {user.picture && (
              <img src={user.picture} alt="Profile" style={styles.avatar} />
            )}
            <p style={styles.email}>{user.email}</p>
          </div>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Sign Out
          </button>
          <button onClick={onClose} style={styles.closeBtn}>X</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <motion.div 
        style={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <p style={styles.description}>
          {isLogin 
            ? "Sign in to access your account and enjoy exclusive benefits with Jeweluxe." 
            : "Create your account and join the Jeweluxe jewelry experience."}
        </p>
        
        <button onClick={handleAuth} style={styles.authButton}>
          Continue with Auth0
        </button>
        
        <p style={styles.switchText}>
          {isLogin ? "New to Jeweluxe?" : "Already have an account?"}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={styles.link}
          >
            {isLogin ? 'Create an account' : 'Sign In'}
          </span>
        </p>
        <button onClick={onClose} style={styles.closeBtn}>X</button>
      </motion.div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff', 
    padding: '2.5rem', 
    borderRadius: '12px', 
    position: 'relative', 
    width: '350px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontFamily: 'Playfair Display, serif',
  },
  description: {
    color: '#666',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  authButton: {
    backgroundColor: '#D4AF37', 
    color: '#fff', 
    border: 'none', 
    padding: '0.8rem 1rem',
    width: '100%', 
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    transition: 'background-color 0.3s ease',
  },
  logoutButton: {
    backgroundColor: '#d43737', 
    color: '#fff', 
    border: 'none', 
    padding: '0.8rem 1rem',
    width: '100%', 
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  },
  switchText: {
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: '#D4AF37', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
  closeBtn: {
    position: 'absolute', 
    top: '15px', 
    right: '15px', 
    background: 'none', 
    border: 'none', 
    fontWeight: 'bold', 
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#999',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #D4AF37',
    marginBottom: '1rem',
  },
  email: {
    color: '#666',
    fontSize: '0.9rem',
  }
};

export default AuthModal;