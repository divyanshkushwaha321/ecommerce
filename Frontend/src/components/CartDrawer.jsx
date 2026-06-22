import React, { useContext } from 'react';
import { X, Plus, Minus, Trash2, UploadCloud } from 'lucide-react';
import { CartContext } from '../context/CartContext.jsx';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQty, updateCartItemImage, cartTotal } = useContext(CartContext);

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={toggleCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="btn btn-secondary" onClick={toggleCart} style={{ padding: '0.5rem' }}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                  <img src={item.imageUrl?.startsWith('/') ? `http://localhost:5000${item.imageUrl}` : item.imageUrl} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">${item.price}</div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQty(item._id, item.qty - 1)}>
                        {item.qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                      </button>
                      <span style={{ margin: '0 0.5rem', fontSize: '0.9rem' }}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item._id, item.qty + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${cartTotal}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
