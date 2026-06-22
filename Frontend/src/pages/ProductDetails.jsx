import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader, ShoppingCart, ArrowLeft, Edit } from 'lucide-react';
import { CartContext } from '../context/CartContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // If not logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProduct = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/products/${id}`, config);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    if (user) {
      fetchProduct();
    }
  }, [id, user, navigate]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}><Loader className="animate-spin" size={40} color="var(--primary-color)" /></div>;
  if (error) return <div className="badge" style={{ position: 'relative', display: 'block', margin: '2rem auto', maxWidth: '400px', textAlign: 'center' }}>{error}</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          <ArrowLeft size={18} /> Back
        </button>
        {user && product.user === user._id && (
          <button onClick={() => navigate(`/edit-product/${product._id}`)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit size={18} /> Edit Product
          </button>
        )}
      </div>

      <div className="glass-panel" style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>
        <div style={{ flex: '1 1 400px', minHeight: '400px' }}>
          <img 
            src={product.imageUrl?.startsWith('/') ? `http://localhost:5000${product.imageUrl}` : product.imageUrl} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div style={{ flex: '1 1 400px', padding: '3rem', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
            ${product.price}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1 }}>
            {product.description}
          </p>
          <button 
            className="btn btn-primary" 
            style={{ padding: '1rem', fontSize: '1.1rem' }}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={22} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
