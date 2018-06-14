const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');
const con = require('../../db');

router.get('/', checkAuth, ProductsController.products_get_all);

router.post("/", checkAuth, ProductsController.products_post);

router.get('/:productId', checkAuth, ProductsController.products_get);

router.patch('/:productId', checkAuth, ProductsController.products_patch);

router.delete('/:productId', checkAuth, ProductsController.products_delete);

module.exports = router;
