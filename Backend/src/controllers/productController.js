import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
    console.log(products)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
      }
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }
    console.log(imageUrl)

    if (!name || !price || !description || !imageUrl) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    let imageUrl = req.body.imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      if (imageUrl) {
        product.imageUrl = imageUrl;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
      }

      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
