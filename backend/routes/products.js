import express from 'express';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const search = req.query.search;

  const includeUser = {
    model: User,
    as: 'user',
    attributes: ['id', 'name']
  };

  let products;
  if (search) {
    products = await Product.findAll({ include: includeUser });

    const lowerCaseSearch = search.toLowerCase();

    products = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(lowerCaseSearch);
      const keywordsMatch = product.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearch));
      return nameMatch || keywordsMatch;
    });
  } else {
    products = await Product.findAll({ include: includeUser });
  }

  res.json(products);
});

export default router;