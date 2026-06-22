import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import { Loader } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('/api/products', config);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (user) {
      fetchProducts();
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <Loader className="animate-spin" size={40} color="var(--primary-color)" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Discover Products</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Explore our latest collection of premium items.</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
