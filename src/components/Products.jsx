import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './styles/Products.css';

// ProductCard Component
const ProductCard = ({ product }) => {
  const { dispatch } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 800);
  };

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img 
          src={process.env.PUBLIC_URL + product.image} 
          alt={product.name} 
          onError={(e) => {
            e.target.src = process.env.PUBLIC_URL + '/images/p1.jpg'; // Fallback image
            e.target.alt = 'Product image not available';
          }}
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="quick-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className="quick-view">Quick View</button>
              <button className="add-to-wishlist">♥</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div 
        className="product-badge"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        New
      </motion.div>
      
      <h2 className="product-title">{product.name}</h2>
      <div className="rating">
        <span>★★★★</span><span className="rating-empty">★</span>
        <span className="review-count">(24)</span>
      </div>
      <p className="product-description">{product.description}</p>
      <div className="product-bottom">
        <span className="product-price">₹{product.price}</span>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="popup-message"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0] 
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              duration: 0.4,
              y: { duration: 0.3, repeat: 1 }
            }}
          >
            <div className="popup-content">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <span>Added to Cart!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Products data
const products = [
  {
    id: 1,
    name: "Royal Gold Bands",
    description: "Traditional gold rings with intricate craftsmanship, ideal for ceremonial occasions.",
    image: "/images/p1.jpg",
    price: "1599.00"
  },
  {
    id: 2,
    name: "Elegant Solitaire",
    description: "A classic diamond ring with a clean band, perfect for engagements.",
    image: "/images/p2.jpg",
    price: "1199.00"
  },
  {
    id: 3,
    name: "Twilight Drops",
    description: "Chic drop earrings featuring elegant stones, suitable for evening wear.",
    image: "/images/p3.jpg",
    price: "1999.00"
  },
  {
    id: 4,
    name: "Mystic Rose Ring",
    description: "A floral-inspired statement ring that adds drama to your look.",
    image: "/images/p4.jpg",
    price: "899.00"
  },
  {
    id: 5,
    name: "Velvet Proposal",
    description: "Romantic ring showcased in a velvet box, ideal for proposals.",
    image: "/images/p5.jpg",
    price: "2499.00"
  },
  {
    id: 6,
    name: "Golden Duo Bands",
    description: "Matching ring set in radiant gold, symbolizing unity.",
    image: "/images/p6.jpg",
    price: "3299.00"
  },
  {
    id: 7,
    name: "Emerald Grace Set",
    description: "Green gemstone necklace and earrings set, blending traditional elegance.",
    image: "/images/p7.jpg",
    price: "999.00"
  },
  {
    id: 8,
    name: "Minimalist Pendant",
    description: "A subtle and modern pendant perfect for casual wear.",
    image: "/images/p8.jpg",
    price: "2799.00"
  },
  {
    id: 9,
    name: "Floral Cluster Necklace",
    description: "A delicate arrangement of floral-inspired stones, perfect for evening gowns.",
    image: "/images/p9.jpg",
    price: "749.00"
  },
  {
    id: 10,
    name: "Crystal Charm Drops",
    description: "Elegant earrings with shimmering crystals for a graceful look.",
    image: "/images/p10.jpg",
    price: "1349.00"
  },
  {
    id: 11,
    name: "Pearl Halo Pendant",
    description: "A graceful pendant with a pearl centerpiece surrounded by gold accents.",
    image: "/images/p11.jpg",
    price: "1349.00"
  },
  {
    id: 12,
    name: "Bridal Diamond Set",
    description: "A complete necklace and earring set adorned with diamonds, ideal for weddings.",
    image: "/images/p12.jpg",
    price: "1349.00"
  },
  {
    id: 13,
    name: "Antique Bronze Drops",
    description: "Vintage-style earrings with a regal flair.",
    image: "/images/p13.jpg",
    price: "1349.00"
  },
  {
    id: 14,
    name: "Festive Maroon Drops",
    description: "Bold maroon and gold earrings perfect for traditional festivals.",
    image: "/images/p14.jpg",
    price: "1349.00"
  },
  {
    id: 15,
    name: "Classic Round Studs",
    description: "Stylish round earrings with a modern flair.",
    image: "/images/p15.jpg",
    price: "1349.00"
  },
  {
    id: 16,
    name: "Vintage Pearl Bracelet",
    description: "A bracelet combining pearls and gold elements for a classy retro touch.",
    image: "/images/p16.jpg",
    price: "1349.00"
  },
  {
    id: 17,
    name: "Feather Fantasy Brooch",
    description: "A bold, artistic feather brooch for fashion-forward statements.",
    image: "/images/p17.jpg",
    price: "1349.00"
  },
  {
    id: 18,
    name: "Temple Inspired Necklace",
    description: "A rich gold necklace with spiritual motifs.",
    image: "/images/p18.jpg",
    price: "1349.00"
  },
  {
    id: 19,
    name: "Colorful Gem Chain",
    description: "A thin chain with multicolored gems, playful yet elegant.",
    image: "/images/p19.jpg",
    price: "1349.00"
  },
  {
    id: 20,
    name: "Tribal Gold Collar",
    description: "Wide necklace with tribal designs, perfect for ethnic ensembles.",
    image: "/images/p20.jpg",
    price: "1349.00"
  },
  {
    id: 21,
    name: "Rainbow Crystal Statement",
    description: "A large statement necklace with vibrant colored stones.",
    image: "/images/p21.jpg",
    price: "1349.00"
  },
  {
    id: 22,
    name: "Turquoise Twist Choker",
    description: "Boho-style choker with turquoise beads and golden charm.",
    image: "/images/p22.jpg",
    price: "1349.00"
  },
  {
    id: 23,
    name: "Festive Pearl Cluster",
    description: "Necklace with clustered pearls and festive tones.",
    image: "/images/p23.jpg",
    price: "1349.00"
  },
  {
    id: 24,
    name: "Bangle Set Delight",
    description: "A vibrant collection of bangles in blue and gold hues.",
    image: "/images/p24.jpg",
    price: "1349.00"
  },
  {
    id: 25,
    name: "Link Chain Elegance",
    description: "Chunky gold link chain with a modern design.",
    image: "/images/p25.jpg",
    price: "1349.00"
  },
  {
    id: 26,
    name: "Leaf Whisper Brooch",
    description: "A minimalist leaf-shaped brooch in green and gold.",
    image: "/images/p26.jpg",
    price: "1349.00"
  },
  {
    id: 27,
    name: "Delicate Sapphire Studs",
    description: "Tiny stud earrings with sapphire and silver elements.",
    image: "/images/p27.jpg",
    price: "1349.00"
  },
  {
    id: 28,
    name: "Pearl Drop Choker",
    description: "Traditional gold choker with rows of dangling pearls.",
    image: "/images/p28.jpg",
    price: "1349.00"
  },
  {
    id: 29,
    name: "Regal Heritage Necklace",
    description: "Heavy traditional necklace with intricate gold work.",
    image: "/images/p29.jpg",
    price: "1349.00"
  },
  {
    id: 30,
    name: "Wedding Temple Set",
    description: "Complete traditional jewelry set for bridal wear.",
    image: "/images/p30.jpg",
    price: "1349.00"
  },
  {
    id: 31,
    name: "Rustic Thread Anklet",
    description: "Bohemian anklet with gold charm and red thread ties.",
    image: "/images/p31.jpg",
    price: "1349.00"
  }
];

// Products Component
const Products = () => {
  const [filterActive, setFilterActive] = useState(false);
  
  return (
    <div className="products-section">
      <motion.h1
        className="products-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Exquisite Collection
      </motion.h1>
      
      <motion.p 
        className="products-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discover timeless elegance and craftsmanship
      </motion.p>
      
      <motion.div 
        className="product-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button className={`filter-button ${filterActive ? 'active' : ''}`} onClick={() => setFilterActive(!filterActive)}>
          <span>Filter</span> <span className="filter-icon">▼</span>
        </button>
        <div className="sort-dropdown">
          <select>
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>
      </motion.div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <motion.button 
        className="load-more-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Load More Products
      </motion.button>
    </div>
  );
};

export default Products;
