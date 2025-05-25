const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create new order
router.post('/', async (req, res) => {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.json(saved);
});

// Get all orders
router.get('/', async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

module.exports = router;
