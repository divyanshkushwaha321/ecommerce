# 🛒 E-Commerce Fullstack Application

Welcome to the fullstack E-Commerce project! This application is a complete online store built using the **MERN** stack (MongoDB, Express, React, Node.js). 

It features a beautifully designed dark-mode user interface using "Glassmorphism" styling, secure user authentication, product management, and a fully functional shopping cart.

---

## 🌟 Key Features

1. **Secure Authentication**: Users can Register, Login, and safely access protected areas using JWT (JSON Web Tokens).
2. **Product Management**: Logged-in users can easily add new products to the store, complete with local image uploads using `multer`.
3. **Interactive Shopping Cart**: Add products to your cart, modify the quantity, and even **upload a custom image** for any item directly inside the cart drawer!
4. **Beautiful UI/UX**: The frontend was built with React (via Vite) and styled with pure, customized CSS to have a premium, modern, "glass" aesthetic with subtle animations.

---

## 🛠️ Technology Stack

* **Frontend**: React.js (Vite), React Router v6, Axios, Lucide React (for icons), Vanilla CSS.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB (with Mongoose).
* **Security & Auth**: bcrypt (password hashing), jsonwebtoken (JWT).
* **Image Handling**: Multer (Local disk storage).

---

## 📁 Folder Structure

The project is cleanly divided into two main folders:

```text
e-commerce/
├── Backend/                 # Node.js + Express API
│   ├── public/images/       # Where uploaded product images are saved
│   ├── src/
│   │   ├── config/          # Database connection & Multer setup
│   │   ├── controllers/     # Core logic (Product & User functions)
│   │   ├── middleware/      # Auth protection
│   │   ├── models/          # MongoDB Schemas (User, Product)
│   │   ├── routes/          # API endpoint routes
│   │   └── index.js         # Backend Express App setup
│   ├── index.js             # Server entry point
│   └── package.json         
│
└── Frontend/                # React Vite Application
    ├── src/
    │   ├── components/      # Reusable UI (Navbar, ProductCard, CartDrawer)
    │   ├── context/         # Global State (AuthContext, CartContext)
    │   ├── pages/           # Screens (Home, Login, Register, AddProduct)
    │   ├── App.jsx          # Main Router
    │   └── index.css        # Global Styles & Glassmorphism Design
    └── package.json
```

---

## 🚀 Step-by-Step Setup Guide

Follow these simple steps to run the project on your own computer.

### Step 1: Start the Backend (Server)

1. Open a terminal and navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```
2. Install the necessary Node modules (if you haven't already):
   ```bash
   npm install
   ```
3. Make sure your MongoDB server is running on your computer.
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *You should see a message saying the database is connected and the server is running on port 5000.*

### Step 2: Start the Frontend (User Interface)

1. Open a **new, separate terminal** and navigate to the `Frontend` folder:
   ```bash
   cd Frontend
   ```
2. Start the React development server:
   ```bash
   npm run dev
   ```
3. Your terminal will give you a local URL (usually `http://localhost:5173`). Ctrl+Click on that link to open the app in your browser!

---

## 🧪 How to Test the App

1. **Create an Account**: When the app opens, click on `Register` in the top right corner. Fill in your details.
2. **Add a Product**: Once logged in, click on `Add Product`. Fill out the name, price, description, and upload a thumbnail image from your computer. Click Publish.
3. **View Products**: Go back to the Home page. Your newly created product will appear in the grid! You can click on it to see the dedicated details page.
4. **Use the Cart**: Click the `Add to Cart` button. Open the Shopping Cart drawer by clicking the cart icon in the top right.
5. **Custom Cart Image**: Inside the cart, click `Attach Custom Image` to upload a custom graphic just for that cart item!

---

## 🔌 API Endpoints (For Postman Testing)

If you prefer testing with tools like Postman, here are the available endpoints running on `http://localhost:5000`:

**Users:**
* `POST /api/users/register` - Create a new user (Body: `name`, `email`, `password`)
* `POST /api/users/login` - Login and get JWT (Body: `email`, `password`)

**Products:**
* `GET /api/products` - Fetch all products
* `GET /api/products/:id` - Fetch a single product
* `POST /api/products` - Create a product (*Requires JWT Auth Token & form-data with `image` file*)
* `PUT /api/products/:id` - Update a product (*Requires JWT Auth Token*)
* `DELETE /api/products/:id` - Delete a product (*Requires JWT Auth Token*)


.env configurations

PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce


CLOUDINARY_CLOUD_NAME=dn4onkkwb
CLOUDINARY_API_KEY=133567655226553
CLOUDINARY_API_SECRET=AtWiWshMPVkgAlblB3HtjFBbc2c