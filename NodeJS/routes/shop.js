const express = require('express');
const router = express.Router();
const path = require('path');
const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productid', shopController.getProduct);

router.get('/categories/:categoryname', shopController.getProductsByCategoryName)

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

module.exports = [
    router
];