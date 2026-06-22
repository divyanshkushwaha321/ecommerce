import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import { UploadCloud } from 'lucide-react';

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
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
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(`/api/products/${id}`, formData, config);
      navigate(`/product/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setUpdating(false);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>Loading...</div>;

  return (
    <div className="auth-container glass-panel animate-fade-in" style={{ maxWidth: '600px' }}>
      <h1 className="auth-title">Edit Product</h1>
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
          <label>Product Image (Optional)</label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])} 
              style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
            />
            <div className="input-field" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderStyle: 'dashed', cursor: 'pointer' }}>
              <UploadCloud size={20} color="var(--primary-color)" />
              <span style={{ color: 'var(--text-secondary)' }}>{image ? image.name : 'Click to upload new image'}</span>
            </div>
          </div>
          <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>Leave blank to keep the current image.</small>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={updating}>
          {updating ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
