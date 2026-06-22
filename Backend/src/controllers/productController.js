import Product from '../models/Product.js';


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
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
      imageUrl = `/public/images/${req.file.filename}`;
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
      imageUrl = `/public/images/${req.file.filename}`;
    }

    const product = await Product.findById(req.params.id);

    if (product) {
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
