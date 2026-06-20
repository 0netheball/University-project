import { Router } from 'express';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/my-products', async (req, res) => {
  const products = await Product.findAll({
    where: { userId: req.userId },
    order: [['createdAt', 'DESC']],
    include: { model: User, as: 'user', attributes: ['id', 'name'] }
  });
  res.json(products);
});

router.post('/products', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image is required' });

  const { name, price, quantity, keywords } = req.body;

  const product = await Product.create({
    image: `uploads/${req.file.filename}`,
    name,
    price: parseInt(price),
    quantity: quantity ? parseInt(quantity) : 1,
    rating: { stars: 0, count: 0 },
    keywords: keywords
      ? keywords.split(',').map(k => k.trim()).filter(Boolean)
      : [],
    userId: req.userId
  });

  res.status(201).json(product);
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });

  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.price) updates.price = parseInt(req.body.price);
  if (req.body.quantity) updates.quantity = parseInt(req.body.quantity);
  if (req.body.keywords) updates.keywords = req.body.keywords.split(',').map(k => k.trim()).filter(Boolean);
  if (req.file) updates.image = `uploads/${req.file.filename}`;

  await product.update(updates);
  res.json(product);
});

router.delete('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.userId !== req.userId) return res.status(403).json({ error: 'Forbidden' });

  await product.destroy();
  res.json({ message: 'Product deleted' });
});

export default router;
