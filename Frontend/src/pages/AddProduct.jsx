import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import { UploadCloud } from 'lucide-react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post('/api/products', formData, config);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container glass-panel animate-fade-in" style={{ maxWidth: '600px' }}>
      <h1 className="auth-title">Add New Product</h1>
      {error && <div className="badge" style={{ position: 'relative', display: 'block', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={submitHandler}>
        <div className="input-group">
          <label>Product Name</label>
          <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        
        <div className="input-group">
          <label>Price ($)</label>
          <input type="number" step="0.01" className="input-field" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        
        <div className="input-group">
          <label>Description</label>
          <textarea className="input-field" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        <div className="input-group">
          <label>Product Image</label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])} 
              required 
              style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
            />
            <div className="input-field" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderStyle: 'dashed', cursor: 'pointer' }}>
              <UploadCloud size={20} color="var(--primary-color)" />
              <span style={{ color: 'var(--text-secondary)' }}>{image ? image.name : 'Click to upload image'}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
