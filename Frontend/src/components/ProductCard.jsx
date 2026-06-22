import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card glass-panel">
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="product-image-container">
          <img src={product.imageUrl?.startsWith('/') ? `http://localhost:5000${product.imageUrl}` : product.imageUrl} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-desc">{product.description}</div>
          <div className="product-price">${product.price}</div>
        </div>
      </Link>
      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(product)}
          style={{ width: '100%', marginTop: 'auto' }}
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
