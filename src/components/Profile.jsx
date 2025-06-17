import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave, FaBox, 
  FaHistory, FaMapMarkerAlt, FaKey, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { useAuth0 } from "@auth0/auth0-react";
import { pageTransition } from './styles/pageTransition';
import './styles/Profile.css';

const Profile = () => {
  const { user: auth0User, isAuthenticated, loginWithRedirect } = useAuth0();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    // Only try to get user data from localStorage if user is authenticated
    if (isAuthenticated) {
      const savedUserInfo = localStorage.getItem('userInfo');
      if (savedUserInfo) {
        return JSON.parse(savedUserInfo);
      }
    }
    // Default user info
    return {
      name: '',
      email: '',
      dob: '',
      bio: '',
      avatar: '',
      address: ''
    };
  });

  const [recentOrders] = useState([
    { 
      orderId: 'JWL-2024-001', 
      date: '2024-02-15', 
      status: 'Delivered',
      items: 'Royal Gold Bands',
      price: '₹1,599.00'
    },
    { 
      orderId: 'JWL-2024-002', 
      date: '2024-02-10', 
      status: 'Shipped',
      items: 'Pearl Halo Pendant',
      price: '₹2,499.00'
    },
    { 
      orderId: 'JWL-2024-003', 
      date: '2024-02-05', 
      status: 'Processing',
      items: 'Emerald Grace Set',
      price: '₹3,299.00'
    },
  ]);

  const [recentlyViewed] = useState([
    { 
      productName: 'Royal Gold Bands', 
      image: '/images/p1.jpg',
      price: '₹1,599.00'
    },
    { 
      productName: 'Elegant Solitaire', 
      image: '/images/p2.jpg',
      price: '₹1,199.00'
    },
    { 
      productName: 'Twilight Drops', 
      image: '/images/p3.jpg',
      price: '₹1,999.00'
    },
  ]);
  
  const [wishlistItems] = useState([
    { 
      productName: 'Velvet Proposal', 
      image: '/images/p5.jpg',
      price: '₹2,499.00'
    },
    { 
      productName: 'Emerald Grace Set', 
      image: '/images/p7.jpg',
      price: '₹999.00'
    },
  ]);

  // Save to localStorage whenever userInfo changes and user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userInfo, isAuthenticated]);

  // Update userInfo when Auth0 user data changes
  useEffect(() => {
    if (auth0User && isAuthenticated) {
      setUserInfo(prev => ({
        ...prev,
        name: auth0User.name || prev.name,
        email: auth0User.email || prev.email,
        avatar: auth0User.picture || prev.avatar
      }));
    }
  }, [auth0User, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes to localStorage when clicking Save Changes
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    setIsEditing(prev => !prev);
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <motion.div 
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-prompt">
          <h2>Please Sign In</h2>
          <p>You need to sign in to view and edit your profile</p>
          <motion.button
            className="auth-button"
            onClick={() => loginWithRedirect()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="profile-container"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="profile-header">
        <motion.div 
          className="profile-avatar-section"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={process.env.PUBLIC_URL + userInfo.avatar} 
            alt="Profile" 
            className="profile-avatar" 
          />
          <button className="avatar-edit-button">
            <FaEdit />
          </button>
        </motion.div>
        <h1 className="profile-heading">Welcome, {userInfo.name.split(' ')[0]}</h1>
        
        <div className="profile-stats">
          <div className="stat-item">
            <FaShoppingBag className="stat-icon" />
            <div>
              <h4>Orders</h4>
              <p>{recentOrders.length}</p>
            </div>
          </div>
          <div className="stat-item">
            <FaHeart className="stat-icon" />
            <div>
              <h4>Wishlist</h4>
              <p>{wishlistItems.length}</p>
            </div>
          </div>
          <div className="stat-item">
            <FaHistory className="stat-icon" />
            <div>
              <h4>Viewed</h4>
              <p>{recentlyViewed.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <FaUser /> Personal Info
        </button>
        <button 
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <FaBox /> Orders
        </button>
        <button 
          className={`tab-button ${activeTab === 'wishlist' ? 'active' : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          <FaHeart /> Wishlist
        </button>
        <button 
          className={`tab-button ${activeTab === 'viewed' ? 'active' : ''}`}
          onClick={() => setActiveTab('viewed')}
        >
          <FaHistory /> Recently Viewed
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'personal' && (
          <motion.div 
            className="profile-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="profile-details">
              <div className="input-group">
                <FaUser className="input-icon" />
                <div className="input-field">
                  <strong>Name:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{userInfo.name}</p>
                  )}
                </div>
              </div>

              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <div className="input-field">
                  <strong>Email:</strong>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{userInfo.email}</p>
                  )}
                </div>
              </div>

              <div className="input-group">
                <FaCalendar className="input-icon" />
                <div className="input-field">
                  <strong>Date of Birth:</strong>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={userInfo.dob}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{userInfo.dob}</p>
                  )}
                </div>
              </div>
              
              <div className="input-group">
                <FaMapMarkerAlt className="input-icon" />
                <div className="input-field">
                  <strong>Address:</strong>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={userInfo.address}
                      onChange={handleInputChange}
                      className="profile-textarea"
                    />
                  ) : (
                    <p>{userInfo.address}</p>
                  )}
                </div>
              </div>

              <div className="bio-section">
                <strong>Bio:</strong>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={userInfo.bio}
                    onChange={handleInputChange}
                    className="profile-textarea"
                  />
                ) : (
                  <p>{userInfo.bio}</p>
                )}
              </div>

              <motion.button
                className="profile-button"
                onClick={handleEditToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isEditing ? (
                  <>
                    <FaSave /> Save Changes
                  </>
                ) : (
                  <>
                    <FaEdit /> Edit Profile
                  </>
                )}
              </motion.button>
              
              <motion.button
                className="profile-button password-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaKey /> Change Password
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div 
            className="profile-section orders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3><FaBox /> Recent Orders</h3>
            {recentOrders.length > 0 ? (
              <div className="orders-list">
                {recentOrders.map((order) => (
                  <motion.div 
                    key={order.orderId} 
                    className="order-item"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="order-header">
                      <span className="order-id">Order #{order.orderId}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <p><strong>Items:</strong> {order.items}</p>
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Total:</strong> {order.price}</p>
                    </div>
                    <button className="view-detail-button">View Details</button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="empty-message">You haven't placed any orders yet.</p>
            )}
          </motion.div>
        )}
        
        {activeTab === 'wishlist' && (
          <motion.div 
            className="profile-section wishlist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3><FaHeart /> My Wishlist</h3>
            {wishlistItems.length > 0 ? (
              <div className="products-grid">
                {wishlistItems.map((product, index) => (
                  <motion.div 
                    key={index} 
                    className="product-card"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
                    }}
                  >
                    <img 
                      src={process.env.PUBLIC_URL + product.image} 
                      alt={product.productName} 
                      className="product-image"
                    />
                    <h4>{product.productName}</h4>
                    <p className="product-price">{product.price}</p>
                    <div className="wishlist-actions">
                      <button className="add-to-cart-btn">Add to Cart</button>
                      <button className="remove-wishlist-btn">Remove</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="empty-message">Your wishlist is empty.</p>
            )}
          </motion.div>
        )}

        {activeTab === 'viewed' && (
          <motion.div 
            className="profile-section viewed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3><FaHistory /> Recently Viewed</h3>
            {recentlyViewed.length > 0 ? (
              <div className="products-grid">
                {recentlyViewed.map((product, index) => (
                  <motion.div 
                    key={index} 
                    className="product-card"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
                    }}
                  >
                    <img 
                      src={process.env.PUBLIC_URL + product.image} 
                      alt={product.productName} 
                      className="product-image"
                    />
                    <h4>{product.productName}</h4>
                    <p className="product-price">{product.price}</p>
                    <div className="viewed-actions">
                      <button className="add-to-cart-btn">Add to Cart</button>
                      <button className="add-to-wishlist-btn">❤</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="empty-message">You haven't viewed any products yet.</p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
