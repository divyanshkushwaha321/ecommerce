import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, PlusCircle, LogIn, UserPlus } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import { CartContext } from '../context/CartContext.jsx';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { toggleCart, cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="navbar glass-panel">
      <Link to="/" className="nav-brand"></Link>
      <div className="nav-links">
        <button onClick={toggleCart} className="btn btn-secondary" style={{ position: 'relative' }}>
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
        {user ? (
          <>
            <Link to="/add-product" className="nav-item">
              <PlusCircle size={20} /> Add Product
            </Link>
            <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Hi, {user.name}</span>
            <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-item">
              <LogIn size={20} /> Login
            </Link>
            <Link to="/register" className="nav-item">
              <UserPlus size={20} /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
