const mongoose = require('mongoose');
const ProductSchema = require('./schemas/ProductSchema');

module.exports = Product = mongoose.model('product', ProductSchema);

