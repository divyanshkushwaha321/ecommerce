import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddProduct from './pages/AddProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import { AuthContext } from './context/AuthContext.jsx';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <CartDrawer />
      <main className="container animate-fade-in">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
