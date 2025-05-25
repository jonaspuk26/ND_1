const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: String,
    name: String,
    surname: String,
    email: String,
    items: [{
        productId: String,
        name: String,
        price: Number,
        quantity: Number
    }],
    orderAmount: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
